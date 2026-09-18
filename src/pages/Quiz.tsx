import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  GraduationCap,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  Filter,
  Save,
  ChevronRight,
  Sparkles,
  Send,
  AlertTriangle,
  HelpCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Question, Passage, QuizAnswerRecord, QuizResult, ViewMode } from '../types';
import { storageService, STORAGE_EVENT_KEY } from '../services/storageService';
import { useToast } from '../components/Toast';
import { useFirebase } from '../context/FirebaseContext';

interface QuizProps {
  onNavigate?: (view: ViewMode) => void;
}

// User selected answers: questionId -> chosen option ('A' | 'B' | 'C' | 'D' | 'E')
interface UserChoices {
  [questionId: string]: 'A' | 'B' | 'C' | 'D' | 'E';
}

export const Quiz: React.FC<QuizProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { user, userProfile, isTeacher, isStudent } = useFirebase();

  const [passages, setPassages] = useState<Passage[]>([]);
  const [rawQuestions, setRawQuestions] = useState<Question[]>([]);
  const [selectedPassageId, setSelectedPassageId] = useState<string>('all');
  const [userChoices, setUserChoices] = useState<UserChoices>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resultSaved, setResultSaved] = useState<boolean>(false);
  const [savedResultId, setSavedResultId] = useState<string>('');

  // Mode for teachers: 'exam' (simulate student test) or 'instant' (immediate feedback)
  const [teacherMode, setTeacherMode] = useState<'exam' | 'instant'>('exam');

  // Answer key stored securely in a ref so student view doesn't expose it in rendered question objects
  const answerKeysRef = useRef<{
    [qId: string]: { correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E'; explanation?: string };
  }>({});

  const loadData = () => {
    const p = storageService.getPassages().filter((x) => x.status === 'published');
    const q = storageService.getQuestions().filter((x) => x.status === 'published');
    setPassages(p);
    setRawQuestions(q);

    // Populate answer key reference
    const keyMap: {
      [qId: string]: { correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E'; explanation?: string };
    } = {};
    q.forEach((item) => {
      keyMap[item.id] = {
        correctAnswer: item.correctAnswer,
        explanation: item.explanation,
      };
    });
    answerKeysRef.current = keyMap;
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = () => loadData();
    window.addEventListener(STORAGE_EVENT_KEY, handleStorageChange);
    return () => window.removeEventListener(STORAGE_EVENT_KEY, handleStorageChange);
  }, []);

  // Filter raw questions by passage
  const activeQuestions = useMemo(() => {
    if (selectedPassageId === 'all') {
      return rawQuestions;
    }
    return rawQuestions.filter((q) => q.passageId === selectedPassageId);
  }, [rawQuestions, selectedPassageId]);

  // Passages to display
  const displayedPassages = useMemo(() => {
    if (selectedPassageId === 'all') {
      const referencedIds = new Set(activeQuestions.map((q) => q.passageId).filter(Boolean));
      return passages.filter((p) => referencedIds.has(p.id));
    }
    return passages.filter((p) => p.id === selectedPassageId);
  }, [passages, selectedPassageId, activeQuestions]);

  // Questions sanitized for the student: hide correctAnswer and explanation if not submitted
  const displayQuestions = useMemo(() => {
    // If teacher in instant mode, reveal immediately
    if (isTeacher && teacherMode === 'instant') {
      return activeQuestions;
    }

    // If submitted, show full questions with answer keys
    if (isSubmitted) {
      return activeQuestions;
    }

    // Exam integrity: sanitize questions so answers/explanations aren't in props/DOM
    return activeQuestions.map((q) => ({
      ...q,
      correctAnswer: '' as any, // hidden during exam
      explanation: undefined, // hidden during exam
    }));
  }, [activeQuestions, isSubmitted, isTeacher, teacherMode]);

  const totalQuestions = activeQuestions.length;
  const answeredCount = Object.keys(userChoices).length;

  // Option selection handler
  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    // If already submitted in exam mode, prevent modifying
    if (isSubmitted && (!isTeacher || teacherMode === 'exam')) return;

    setUserChoices((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  // Calculate score upon submission or instant review
  const evaluation = useMemo(() => {
    if (!isSubmitted && !(isTeacher && teacherMode === 'instant')) {
      return { correctCount: 0, wrongCount: 0, percentage: 0 };
    }

    let correct = 0;
    activeQuestions.forEach((q) => {
      const chosen = userChoices[q.id];
      const keyInfo = answerKeysRef.current[q.id];
      if (chosen && keyInfo && chosen === keyInfo.correctAnswer) {
        correct += 1;
      }
    });

    const wrong = answeredCount - correct;
    const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    return {
      correctCount: correct,
      wrongCount: Math.max(0, wrong),
      percentage,
    };
  }, [isSubmitted, isTeacher, teacherMode, activeQuestions, userChoices, totalQuestions, answeredCount]);

  // Reset quiz
  const resetQuiz = () => {
    setUserChoices({});
    setIsSubmitted(false);
    setResultSaved(false);
    setSavedResultId('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Kuis di-reset. Selamat mencoba kembali!', 'info');
  };

  // Submit and finalize exam
  const handleSubmitQuiz = () => {
    if (totalQuestions === 0) return;

    if (answeredCount < totalQuestions) {
      const unanswered = totalQuestions - answeredCount;
      const confirmSubmit = window.confirm(
        `Perhatian: Terdapat ${unanswered} soal yang belum dijawab. Apakah Anda yakin ingin mengumpulkan kuis sekarang?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);

    // Automatically save student result
    saveQuizResultRecord();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Jawaban berhasil dikumpulkan! Evaluasi nilai telah ditampilkan.', 'success');
  };

  // Save result to Firestore and localStorage
  const saveQuizResultRecord = () => {
    const sName = userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'Siswa Mandiri';
    const sUid = user?.uid || '';
    const sEmail = user?.email || '';

    let correct = 0;
    const records: QuizAnswerRecord[] = activeQuestions.map((q) => {
      const chosen = userChoices[q.id] || 'A';
      const keyInfo = answerKeysRef.current[q.id];
      const actualCorrect = keyInfo?.correctAnswer || q.correctAnswer;
      const isCorrect = chosen === actualCorrect;
      if (isCorrect) correct += 1;

      return {
        questionId: q.id,
        selectedAnswer: chosen,
        correctAnswer: actualCorrect,
        isCorrect,
      };
    });

    const wrong = Math.max(0, answeredCount - correct);
    const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
    const activePassage = passages.find((p) => p.id === selectedPassageId);
    const newId = `result-${Date.now().toString().slice(-6)}`;

    const resultPayload: QuizResult = {
      id: newId,
      date: new Date().toISOString(),
      studentUid: sUid,
      studentEmail: sEmail,
      studentName: sName,
      passageId: selectedPassageId !== 'all' ? selectedPassageId : undefined,
      passageTitle: activePassage ? activePassage.title : 'Semua Wacana Campuran',
      totalQuestions,
      correctAnswers: correct,
      wrongAnswers: wrong,
      score: correct,
      percentage,
      answers: records,
    };

    storageService.saveQuizResult(resultPayload);
    setResultSaved(true);
    setSavedResultId(newId);
  };

  const studentDisplayName = userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'Siswa';

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-slate-800 flex flex-col items-center">
      {/* Quiz Top Toolbar */}
      <div className="w-full max-w-[900px] mb-4 flex flex-wrap items-center justify-between gap-3 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/25 text-white text-xs sm:text-sm">
        {/* Wacana Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="font-semibold">Wacana:</span>
          <select
            value={selectedPassageId}
            disabled={isSubmitted}
            onChange={(e) => {
              setSelectedPassageId(e.target.value);
              setUserChoices({});
              setIsSubmitted(false);
              setResultSaved(false);
            }}
            className="bg-white text-slate-800 rounded-lg px-2.5 py-1 text-xs sm:text-sm font-semibold border-none focus:ring-2 focus:ring-amber-400 disabled:opacity-70"
          >
            <option value="all">Semua Wacana ({rawQuestions.length} Soal)</option>
            {passages.map((p) => {
              const count = rawQuestions.filter((q) => q.passageId === p.id).length;
              return (
                <option key={p.id} value={p.id}>
                  {p.title} ({count} Soal)
                </option>
              );
            })}
          </select>
        </div>

        {/* Progress & Reset / Mode Controls */}
        <div className="flex items-center gap-2">
          {isTeacher && (
            <div className="flex items-center bg-white/20 rounded-lg p-0.5 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setTeacherMode('exam')}
                className={`px-2 py-0.5 rounded-md transition ${teacherMode === 'exam' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-white'}`}
              >
                Simulasi Ujian
              </button>
              <button
                type="button"
                onClick={() => setTeacherMode('instant')}
                className={`px-2 py-0.5 rounded-md transition ${teacherMode === 'instant' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-white'}`}
              >
                Mode Kunci
              </button>
            </div>
          )}

          <span className="bg-white/20 px-2.5 py-1 rounded-lg font-mono font-bold">
            {isSubmitted ? 'Selesai' : `Terjawab: ${answeredCount}/${totalQuestions}`}
          </span>

          <button
            onClick={resetQuiz}
            title="Reset Pilihan Kuis"
            className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium flex items-center gap-1 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in duration-300">
        {/* Header matching original COBA.html */}
        <header className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold tracking-wider text-white uppercase">
              SOAL TKA SMA BAHASA INDONESIA 2026
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-blue-100/90 font-medium flex items-center justify-center gap-2">
              <span>Kuis Interaktif — Pemahaman Tekstual</span>
              <span className="text-blue-300">•</span>
              <span className="text-amber-300 font-bold">Peserta: {studentDisplayName}</span>
            </p>
          </div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
        </header>

        {/* Content Container */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Post-Submission Result Celebration Banner */}
          {isSubmitted && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-center shadow-xl border border-indigo-400/30 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-3 text-2xl shadow-lg">
                🏆
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Hasil Ujian Anda: {evaluation.percentage}%
              </h2>
              <p className="text-indigo-200 text-sm mt-1">
                Kuis telah dikumpulkan dan otomatis tersimpan ke riwayat nilai {studentDisplayName}.
              </p>

              {/* Stats Summary Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                  <span className="text-xs text-indigo-200 block">Total Soal</span>
                  <span className="text-xl font-bold">{totalQuestions}</span>
                </div>
                <div className="bg-emerald-500/20 p-3 rounded-xl backdrop-blur-xs border border-emerald-500/30">
                  <span className="text-xs text-emerald-300 block">Benar</span>
                  <span className="text-xl font-bold text-emerald-300">{evaluation.correctCount}</span>
                </div>
                <div className="bg-rose-500/20 p-3 rounded-xl backdrop-blur-xs border border-rose-500/30">
                  <span className="text-xs text-rose-300 block">Salah</span>
                  <span className="text-xl font-bold text-rose-300">{evaluation.wrongCount}</span>
                </div>
                <div className="bg-amber-400/20 p-3 rounded-xl backdrop-blur-xs border border-amber-400/30">
                  <span className="text-xs text-amber-300 block">Skor Akhir</span>
                  <span className="text-xl font-bold text-amber-300">
                    {evaluation.correctCount}/{totalQuestions}
                  </span>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('results')}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md"
                  >
                    <Award className="w-4 h-4" />
                    <span>Lihat Riwayat Nilai Saya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 border border-white/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Kerjakan Ulang Kuis</span>
                </button>
              </div>

              <div className="mt-4 text-xs text-indigo-300">
                <span>Silakan gulir ke bawah untuk meninjau kunci jawaban dan pembahasan tiap butir soal.</span>
              </div>
            </div>
          )}

          {/* Reading Passage(s) Section */}
          {displayedPassages.length > 0 && (
            <div className="space-y-4">
              {displayedPassages.map((p) => {
                const paragraphs = p.content.split('\n').filter((x) => x.trim().length > 0);
                return (
                  <div
                    key={p.id}
                    className="bg-[#f7f9fc] border-l-[5px] border-[#2a5298] p-5 sm:p-6 rounded-r-xl text-justify text-[0.98rem] leading-[1.75] text-[#444] shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/70 pb-2 mb-3">
                      <h3 className="text-xs font-bold text-[#1e3c72] uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Teks Bacaan: {p.title}
                      </h3>
                      {p.source && (
                        <span className="text-[11px] text-slate-500 italic">
                          {p.source}
                        </span>
                      )}
                    </div>
                    <div className="space-y-3 font-serif">
                      {paragraphs.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty questions fallback */}
          {activeQuestions.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium text-sm">
                Belum ada soal dengan status "Published" untuk wacana ini.
              </p>
              {isTeacher && onNavigate && (
                <button
                  onClick={() => onNavigate('questions')}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                >
                  Buka Bank Soal
                </button>
              )}
            </div>
          )}

          {/* Questions Section */}
          <div className="space-y-6">
            {displayQuestions.map((q, index) => {
              const chosenOption = userChoices[q.id];
              const isAnswered = Boolean(chosenOption);

              // Key info is only accessible when submitted or teacher instant mode
              const showEvaluation = isSubmitted || (isTeacher && teacherMode === 'instant');
              const keyInfo = showEvaluation ? answerKeysRef.current[q.id] : undefined;
              const trueCorrect = keyInfo?.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="bg-[#fafbff] border border-[#e0e6f5] rounded-xl p-5 sm:p-6 transition-all shadow-2xs"
                >
                  {/* Question Number & Text */}
                  <div className="text-[#1e3c72] font-semibold text-base sm:text-[1.05rem] leading-[1.6] mb-4">
                    <span>{index + 1}. </span>
                    <span>{q.question}</span>
                  </div>

                  {/* Options A-E */}
                  <div className="flex flex-col gap-2.5">
                    {(['A', 'B', 'C', 'D', 'E'] as const).map((key) => {
                      const isSelectedByUser = chosenOption === key;

                      // Standard classes
                      let optionClass =
                        'flex items-center p-3 sm:px-4 sm:py-3 bg-white border-2 rounded-xl transition-all duration-200 text-[0.98rem] select-none cursor-pointer';
                      let letterClass =
                        'inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white mr-3 sm:mr-3.5 shrink-0 transition-colors text-sm';
                      let mark = '';

                      if (showEvaluation) {
                        // POST-SUBMISSION: Reveal correct answers (green) and incorrect selections (red)
                        const isThisTheCorrectAnswer = trueCorrect === key;
                        optionClass += ' cursor-default';

                        if (isThisTheCorrectAnswer) {
                          optionClass += ' !bg-[#d4f8d4] !border-[#28a745] !text-[#155724] font-medium';
                          letterClass += ' bg-[#28a745]';
                          mark = '✓';
                        } else if (isSelectedByUser && !isThisTheCorrectAnswer) {
                          optionClass += ' !bg-[#ffd6d6] !border-[#dc3545] !text-[#721c24]';
                          letterClass += ' bg-[#dc3545]';
                          mark = '✗';
                        } else {
                          optionClass += ' border-[#d6def0] opacity-60';
                          letterClass += ' bg-[#2a5298] opacity-70';
                        }
                      } else {
                        // DURING ACTIVE EXAM: Pure neutral active selection (NO green/red leak!)
                        if (isSelectedByUser) {
                          optionClass += ' border-[#2a5298] bg-[#eef3ff] text-[#1e3c72] font-semibold shadow-xs';
                          letterClass += ' bg-[#1e3c72] ring-2 ring-blue-400';
                        } else {
                          optionClass +=
                            ' border-[#d6def0] text-slate-700 hover:border-[#2a5298] hover:bg-[#f3f7ff] hover:translate-x-1';
                          letterClass += ' bg-[#2a5298]';
                        }
                      }

                      return (
                        <div
                          key={key}
                          onClick={() => handleSelectOption(q.id, key)}
                          className={optionClass}
                        >
                          <span className={letterClass}>{key}</span>
                          <span className="flex-1 leading-snug">{q.options[key]}</span>
                          {mark && (
                            <span
                              className={`ml-auto font-bold text-lg sm:text-xl pl-2 shrink-0 ${
                                mark === '✓' ? 'text-[#28a745]' : 'text-[#dc3545]'
                              }`}
                            >
                              {mark}
                            </span>
                          )}
                          {!showEvaluation && isSelectedByUser && (
                            <span className="ml-auto text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                              Dipilih
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation: ONLY revealed AFTER submission or in teacher instant mode */}
                  {showEvaluation && keyInfo?.explanation && (
                    <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm animate-in fade-in duration-200">
                      <span className="font-bold text-amber-800 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        Pembahasan Jawaban:
                      </span>
                      <p className="text-slate-800 leading-relaxed font-sans">{keyInfo.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Exam Bottom Action Area */}
          {!isSubmitted && (
            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-slate-500">
                <span className="font-bold text-slate-800">{answeredCount}</span> dari{' '}
                <span className="font-bold text-slate-800">{totalQuestions}</span> soal telah Anda jawab.
              </div>

              <button
                onClick={handleSubmitQuiz}
                disabled={totalQuestions === 0}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-xl text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Kumpulkan Jawaban & Selesai</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
