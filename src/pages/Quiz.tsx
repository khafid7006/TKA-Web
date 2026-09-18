import React, { useState, useEffect, useMemo } from 'react';
import {
  GraduationCap,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  Filter,
  Save,
  Share2,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react';
import { Question, Passage, QuizAnswerRecord, QuizResult, ViewMode } from '../types';
import { storageService, STORAGE_EVENT_KEY } from '../services/storageService';
import { useToast } from '../components/Toast';

interface QuizProps {
  onNavigate?: (view: ViewMode) => void;
}

interface UserAnswerState {
  [questionId: string]: {
    chosen: 'A' | 'B' | 'C' | 'D' | 'E';
    isCorrect: boolean;
  };
}

export const Quiz: React.FC<QuizProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const [passages, setPassages] = useState<Passage[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [selectedPassageId, setSelectedPassageId] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<UserAnswerState>({});
  const [studentName, setStudentName] = useState('');
  const [resultSaved, setResultSaved] = useState(false);

  const loadData = () => {
    const p = storageService.getPassages().filter((x) => x.status === 'published');
    const q = storageService.getQuestions().filter((x) => x.status === 'published');
    setPassages(p);
    setAllQuestions(q);
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = () => loadData();
    window.addEventListener(STORAGE_EVENT_KEY, handleStorageChange);
    return () => window.removeEventListener(STORAGE_EVENT_KEY, handleStorageChange);
  }, []);

  // Filter questions according to selected passage
  const activeQuestions = useMemo(() => {
    if (selectedPassageId === 'all') {
      return allQuestions;
    }
    return allQuestions.filter((q) => q.passageId === selectedPassageId);
  }, [allQuestions, selectedPassageId]);

  // Active passages to display
  const displayedPassages = useMemo(() => {
    if (selectedPassageId === 'all') {
      // Find unique passages referenced by active questions
      const referencedPassageIds = new Set(activeQuestions.map((q) => q.passageId).filter(Boolean));
      return passages.filter((p) => referencedPassageIds.has(p.id));
    }
    return passages.filter((p) => p.id === selectedPassageId);
  }, [passages, selectedPassageId, activeQuestions]);

  // Score calculation
  const totalQuestions = activeQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
  const wrongCount = answeredCount - correctCount;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isQuizComplete = totalQuestions > 0 && answeredCount === totalQuestions;

  const handleSelectOption = (question: Question, optionKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (userAnswers[question.id]) return; // already answered

    const isCorrect = optionKey === question.correctAnswer;
    setUserAnswers((prev) => ({
      ...prev,
      [question.id]: {
        chosen: optionKey,
        isCorrect,
      },
    }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setResultSaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Kuis di-reset. Selamat mencoba kembali!', 'info');
  };

  const handleSaveResult = () => {
    if (resultSaved) return;
    const name = studentName.trim() || 'Siswa Mandiri';

    const records: QuizAnswerRecord[] = activeQuestions.map((q) => {
      const ans = userAnswers[q.id];
      return {
        questionId: q.id,
        selectedAnswer: ans ? ans.chosen : 'A',
        correctAnswer: q.correctAnswer,
        isCorrect: ans ? ans.isCorrect : false,
      };
    });

    const activePassage = passages.find((p) => p.id === selectedPassageId);

    const resultPayload: QuizResult = {
      id: `result-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      studentName: name,
      passageId: selectedPassageId !== 'all' ? selectedPassageId : undefined,
      passageTitle: activePassage ? activePassage.title : 'Semua Wacana Campuran',
      totalQuestions,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      score: correctCount,
      percentage,
      answers: records,
    };

    storageService.saveQuizResult(resultPayload);
    setResultSaved(true);
    showToast(`Hasil kuis atas nama ${name} berhasil disimpan ke Riwayat!`, 'success');
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-slate-800 flex flex-col items-center">
      {/* Quiz Filter Bar (Wacana Selector) */}
      <div className="w-full max-w-[900px] mb-4 flex flex-wrap items-center justify-between gap-3 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/25 text-white text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="font-semibold">Pilih Wacana:</span>
          <select
            value={selectedPassageId}
            onChange={(e) => {
              setSelectedPassageId(e.target.value);
              setUserAnswers({});
              setResultSaved(false);
            }}
            className="bg-white text-slate-800 rounded-lg px-2.5 py-1 text-xs sm:text-sm font-semibold border-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="all">Semua Wacana ({allQuestions.length} Soal)</option>
            {passages.map((p) => {
              const count = allQuestions.filter((q) => q.passageId === p.id).length;
              return (
                <option key={p.id} value={p.id}>
                  {p.title} ({count} Soal)
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-2.5 py-1 rounded-lg font-mono font-bold">
            Soal Terjawab: {answeredCount}/{totalQuestions}
          </span>
          <button
            onClick={resetQuiz}
            className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Container - matching COBA.html visual styling */}
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header matching original COBA.html gradient and typography */}
        <header className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold tracking-wider text-white uppercase">
              SOAL TKA SMA BAHASA INDONESIA 2026
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-blue-100/90 font-medium">
              Kuis Interaktif — Pemahaman Tekstual
            </p>
          </div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
        </header>

        {/* Content Container */}
        <div className="p-5 sm:p-8 space-y-6">
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
              {onNavigate && (
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
            {activeQuestions.map((q, index) => {
              const answerState = userAnswers[q.id];
              const isAnswered = !!answerState;

              return (
                <div
                  key={q.id}
                  className="bg-[#fafbff] border border-[#e0e6f5] rounded-xl p-5 sm:p-6 transition-all shadow-2xs"
                >
                  {/* Question Title */}
                  <div className="text-[#1e3c72] font-semibold text-base sm:text-[1.05rem] leading-[1.6] mb-4">
                    <span>{index + 1}. </span>
                    <span>{q.question}</span>
                  </div>

                  {/* Options A-E */}
                  <div className="flex flex-col gap-2.5">
                    {(['A', 'B', 'C', 'D', 'E'] as const).map((key) => {
                      const isChosen = answerState?.chosen === key;
                      const isCorrectChoice = q.correctAnswer === key;

                      // Class resolution matching original COBA.html styles
                      let optionClass =
                        'flex items-center p-3 sm:px-4 sm:py-3 bg-white border-2 border-[#d6def0] rounded-xl cursor-pointer transition-all duration-200 text-[0.98rem] select-none';
                      let letterClass =
                        'inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white mr-3 sm:mr-3.5 shrink-0 transition-colors text-sm bg-[#2a5298]';
                      let mark = '';

                      if (isAnswered) {
                        optionClass += ' cursor-not-allowed opacity-95';

                        if (isCorrectChoice) {
                          // Correct answer turns green
                          optionClass += ' !bg-[#d4f8d4] !border-[#28a745] !text-[#155724] font-medium';
                          letterClass =
                            'inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white mr-3 sm:mr-3.5 shrink-0 text-sm !bg-[#28a745]';
                          mark = '✓';
                        } else if (isChosen && !isCorrectChoice) {
                          // Wrong answer turns red
                          optionClass += ' !bg-[#ffd6d6] !border-[#dc3545] !text-[#721c24]';
                          letterClass =
                            'inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white mr-3 sm:mr-3.5 shrink-0 text-sm !bg-[#dc3545]';
                          mark = '✗';
                        } else {
                          optionClass += ' opacity-60';
                        }
                      } else {
                        // Hover styling when active
                        optionClass +=
                          ' hover:border-[#2a5298] hover:bg-[#eef3ff] hover:translate-x-1';
                      }

                      return (
                        <div
                          key={key}
                          onClick={() => handleSelectOption(q, key)}
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
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation reveals automatically after answered if present */}
                  {isAnswered && q.explanation && (
                    <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm animate-in fade-in duration-200">
                      <span className="font-bold text-amber-800 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        Pembahasan Jawaban:
                      </span>
                      <p className="text-slate-800 leading-relaxed font-sans">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Score Box - matching original COBA.html score-box gradient and styling */}
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white text-center text-lg sm:text-xl font-bold tracking-wider shadow-md">
            Skor: <span>{correctCount}</span> / <span>{totalQuestions}</span>
            <span className="text-xs sm:text-sm text-blue-200 font-normal ml-3">
              ({percentage}%)
            </span>
          </div>

          {/* Reset / Retry Button matching COBA.html button */}
          <div className="flex justify-center">
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-[#ff6b6b] hover:bg-[#ee5252] text-white font-bold rounded-full text-base transition-all duration-200 shadow-[0_6px_15px_rgba(255,107,107,0.4)] hover:shadow-[0_8px_20px_rgba(255,107,107,0.5)] transform hover:-translate-y-0.5 cursor-pointer"
            >
              🔄 Coba Lagi
            </button>
          </div>

          {/* Quiz Completion Card */}
          {isQuizComplete && (
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-center shadow-xl border border-indigo-400/30 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-3 text-2xl shadow-lg">
                🎉
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Quiz Selesai!
              </h2>
              <p className="text-indigo-200 text-sm mt-1">
                Semua pertanyaan telah dijawab dengan lengkap
              </p>

              {/* Stats Summary Pill */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                  <span className="text-xs text-indigo-200 block">Total Soal</span>
                  <span className="text-xl font-bold">{totalQuestions}</span>
                </div>
                <div className="bg-emerald-500/20 p-3 rounded-xl backdrop-blur-xs border border-emerald-500/30">
                  <span className="text-xs text-emerald-300 block">Benar</span>
                  <span className="text-xl font-bold text-emerald-300">{correctCount}</span>
                </div>
                <div className="bg-rose-500/20 p-3 rounded-xl backdrop-blur-xs border border-rose-500/30">
                  <span className="text-xs text-rose-300 block">Salah</span>
                  <span className="text-xl font-bold text-rose-300">{wrongCount}</span>
                </div>
                <div className="bg-amber-400/20 p-3 rounded-xl backdrop-blur-xs border border-amber-400/30">
                  <span className="text-xs text-amber-300 block">Nilai Akhir</span>
                  <span className="text-xl font-bold text-amber-300">{percentage}%</span>
                </div>
              </div>

              {/* Student Name & Save to Result History */}
              <div className="mt-6 max-w-md mx-auto bg-white/10 p-4 rounded-xl border border-white/15">
                <label className="block text-xs font-semibold text-indigo-200 text-left mb-1">
                  Simpan Riwayat Nilai Siswa
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    disabled={resultSaved}
                    placeholder="Masukkan nama siswa..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-75"
                  />
                  <button
                    onClick={handleSaveResult}
                    disabled={resultSaved}
                    className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition ${
                      resultSaved
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                    }`}
                  >
                    {resultSaved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Tersimpan
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Simpan Hasil
                      </>
                    )}
                  </button>
                </div>

                {resultSaved && onNavigate && (
                  <button
                    onClick={() => onNavigate('results')}
                    className="mt-3 text-xs text-amber-300 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>Lihat Halaman Riwayat Hasil Quiz</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
