import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  GraduationCap,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  Filter,
  ChevronRight,
  Sparkles,
  Send,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Question, Passage, QuizAnswerRecord, QuizResult, ViewMode, QuestionType } from '../types';
import { storageService, STORAGE_EVENT_KEY } from '../services/storageService';
import { useToast } from '../components/Toast';
import { useFirebase } from '../context/FirebaseContext';
import { QuestionMetadataTable } from '../components/QuestionMetadataTable';

interface QuizProps {
  onNavigate?: (view: ViewMode) => void;
}

// User responses across all 3 question types
interface QuizUserResponses {
  pg: { [qId: string]: string }; // 'A' | 'B' | ...
  mcma: { [qId: string]: string[] }; // ['B', 'C', 'E']
  kategori: { [qId: string]: { [statementId: string]: string } }; // { 'A': 'Tepat', 'B': 'Tidak Tepat' }
}

interface AnswerKeyData {
  type: QuestionType;
  pgCorrect?: string;
  mcmaCorrect?: string[];
  kategoriCorrect?: { [statementId: string]: string };
  explanation?: string;
}

export const Quiz: React.FC<QuizProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { user, userProfile, isTeacher, isStudent } = useFirebase();

  const [passages, setPassages] = useState<Passage[]>([]);
  const [rawQuestions, setRawQuestions] = useState<Question[]>([]);
  const [selectedPassageId, setSelectedPassageId] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [responses, setResponses] = useState<QuizUserResponses>({
    pg: {},
    mcma: {},
    kategori: {},
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resultSaved, setResultSaved] = useState<boolean>(false);
  const [savedResultId, setSavedResultId] = useState<string>('');

  // Mode for teachers: 'exam' (simulate student test) or 'instant' (immediate feedback)
  const [teacherMode, setTeacherMode] = useState<'exam' | 'instant'>('exam');

  // Answer keys stored securely in ref to prevent exam leak
  const answerKeysRef = useRef<{ [qId: string]: AnswerKeyData }>({});

  const loadData = () => {
    const p = storageService.getPassages().filter((x) => x.status === 'published');
    const q = storageService.getQuestions().filter((x) => x.status === 'published');
    setPassages(p);
    setRawQuestions(q);

    // Populate answer key reference
    const keyMap: { [qId: string]: AnswerKeyData } = {};
    q.forEach((item) => {
      const type = item.type || 'pg';
      const kCorrect: { [statementId: string]: string } = {};
      if (item.categoryStatements) {
        item.categoryStatements.forEach((s) => {
          kCorrect[s.id] = s.correctValue;
        });
      }

      keyMap[item.id] = {
        type,
        pgCorrect: item.correctAnswer,
        mcmaCorrect: item.mcmaCorrectAnswers,
        kategoriCorrect: kCorrect,
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

  // Filter raw questions by passage and question type
  const activeQuestions = useMemo(() => {
    return rawQuestions.filter((q) => {
      const matchesPassage =
        selectedPassageId === 'all' || q.passageId === selectedPassageId;
      const qType = q.type || 'pg';
      const matchesType =
        selectedTypeFilter === 'all' || qType === selectedTypeFilter;
      return matchesPassage && matchesType;
    });
  }, [rawQuestions, selectedPassageId, selectedTypeFilter]);

  // Passages to display (if any assigned)
  const displayedPassages = useMemo(() => {
    if (selectedPassageId === 'all') {
      const referencedIds = new Set(activeQuestions.map((q) => q.passageId).filter(Boolean));
      return passages.filter((p) => referencedIds.has(p.id));
    }
    return passages.filter((p) => p.id === selectedPassageId);
  }, [passages, selectedPassageId, activeQuestions]);

  // Questions sanitized for the student: hide answer keys if not submitted
  const displayQuestions = useMemo(() => {
    if (isTeacher && teacherMode === 'instant') return activeQuestions;
    if (isSubmitted) return activeQuestions;

    // Exam integrity: sanitize question payloads
    return activeQuestions.map((q) => ({
      ...q,
      correctAnswer: undefined,
      mcmaCorrectAnswers: undefined,
      categoryStatements: q.categoryStatements?.map((s) => ({
        ...s,
        correctValue: '', // hide during active exam
      })),
      explanation: '',
    }));
  }, [activeQuestions, isSubmitted, isTeacher, teacherMode]);

  const totalQuestions = activeQuestions.length;

  // Check how many questions have been answered
  const answeredCount = useMemo(() => {
    let count = 0;
    activeQuestions.forEach((q) => {
      const type = q.type || 'pg';
      if (type === 'pg') {
        if (responses.pg[q.id]) count += 1;
      } else if (type === 'pgk_mcma') {
        if (responses.mcma[q.id] && responses.mcma[q.id].length > 0) count += 1;
      } else if (type === 'pgk_kategori') {
        const statements = q.categoryStatements || [];
        const userStatementResponses = responses.kategori[q.id] || {};
        if (
          statements.length > 0 &&
          statements.every((s) => Boolean(userStatementResponses[s.id]))
        ) {
          count += 1;
        }
      }
    });
    return count;
  }, [activeQuestions, responses]);

  // Handle PG Single Choice selection
  const handleSelectPG = (questionId: string, optionKey: string) => {
    if (isSubmitted && (!isTeacher || teacherMode === 'exam')) return;
    setResponses((prev) => ({
      ...prev,
      pg: {
        ...prev.pg,
        [questionId]: optionKey,
      },
    }));
  };

  // Handle PGK MCMA toggle
  const handleToggleMCMA = (questionId: string, optionKey: string) => {
    if (isSubmitted && (!isTeacher || teacherMode === 'exam')) return;
    setResponses((prev) => {
      const current = prev.mcma[questionId] || [];
      const updated = current.includes(optionKey)
        ? current.filter((k) => k !== optionKey)
        : [...current, optionKey];
      return {
        ...prev,
        mcma: {
          ...prev.mcma,
          [questionId]: updated.sort(),
        },
      };
    });
  };

  // Handle PGK Kategori selection
  const handleSelectCategory = (questionId: string, statementId: string, columnVal: string) => {
    if (isSubmitted && (!isTeacher || teacherMode === 'exam')) return;
    setResponses((prev) => ({
      ...prev,
      kategori: {
        ...prev.kategori,
        [questionId]: {
          ...(prev.kategori[questionId] || {}),
          [statementId]: columnVal,
        },
      },
    }));
  };

  // Check if a single question is correct based on response and answer key
  const isQuestionCorrect = (q: Question): boolean => {
    const key = answerKeysRef.current[q.id];
    if (!key) return false;
    const type = q.type || 'pg';

    if (type === 'pg') {
      const chosen = responses.pg[q.id];
      return Boolean(chosen && key.pgCorrect && chosen.toUpperCase() === key.pgCorrect.toUpperCase());
    }

    if (type === 'pgk_mcma') {
      const chosenList = responses.mcma[q.id] || [];
      const targetList = key.mcmaCorrect || [];
      if (chosenList.length !== targetList.length) return false;
      const sortedChosen = [...chosenList].sort();
      const sortedTarget = [...targetList].sort();
      return sortedChosen.every((val, idx) => val === sortedTarget[idx]);
    }

    if (type === 'pgk_kategori') {
      const userStmts = responses.kategori[q.id] || {};
      const targetStmts = key.kategoriCorrect || {};
      const statements = q.categoryStatements || [];
      if (statements.length === 0) return false;

      return statements.every((s) => {
        const userChoice = userStmts[s.id];
        const correctChoice = targetStmts[s.id];
        return (
          userChoice &&
          correctChoice &&
          userChoice.trim().toLowerCase() === correctChoice.trim().toLowerCase()
        );
      });
    }

    return false;
  };

  // Calculate score upon submission or instant review
  const evaluation = useMemo(() => {
    if (!isSubmitted && !(isTeacher && teacherMode === 'instant')) {
      return { correctCount: 0, wrongCount: 0, percentage: 0 };
    }

    let correct = 0;
    activeQuestions.forEach((q) => {
      if (isQuestionCorrect(q)) {
        correct += 1;
      }
    });

    const wrong = totalQuestions - correct;
    const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    return {
      correctCount: correct,
      wrongCount: Math.max(0, wrong),
      percentage,
    };
  }, [isSubmitted, isTeacher, teacherMode, activeQuestions, responses, totalQuestions]);

  // Reset quiz
  const resetQuiz = () => {
    setResponses({
      pg: {},
      mcma: {},
      kategori: {},
    });
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
        `Perhatian: Terdapat ${unanswered} soal yang belum dijawab lengkap. Apakah Anda yakin ingin mengumpulkan kuis sekarang?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    saveQuizResultRecord();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Jawaban berhasil dikumpulkan! Nilai dan pembahasan ditampilkan.', 'success');
  };

  // Save result to Firestore and localStorage
  const saveQuizResultRecord = () => {
    const sName = userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'Siswa Mandiri';
    const sUid = user?.uid || '';
    const sEmail = user?.email || '';

    let correct = 0;
    const records: QuizAnswerRecord[] = activeQuestions.map((q) => {
      const type = q.type || 'pg';
      const keyInfo = answerKeysRef.current[q.id];
      const correctStatus = isQuestionCorrect(q);
      if (correctStatus) correct += 1;

      let chosenSummary = '';
      let correctSummary = '';

      if (type === 'pg') {
        chosenSummary = responses.pg[q.id] || '-';
        correctSummary = keyInfo?.pgCorrect || q.correctAnswer || '-';
      } else if (type === 'pgk_mcma') {
        chosenSummary = (responses.mcma[q.id] || []).join(', ') || '-';
        correctSummary = (keyInfo?.mcmaCorrect || q.mcmaCorrectAnswers || []).join(', ') || '-';
      } else if (type === 'pgk_kategori') {
        const userMap = responses.kategori[q.id] || {};
        chosenSummary = Object.entries(userMap)
          .map(([sid, val]) => `${sid}: ${val}`)
          .join(' | ') || '-';
        const correctMap = keyInfo?.kategoriCorrect || {};
        correctSummary = Object.entries(correctMap)
          .map(([sid, val]) => `${sid}: ${val}`)
          .join(' | ') || '-';
      }

      return {
        questionId: q.id,
        type,
        selectedAnswer: type === 'pg' ? responses.pg[q.id] : chosenSummary,
        selectedMcma: type === 'pgk_mcma' ? responses.mcma[q.id] : undefined,
        selectedCategory: type === 'pgk_kategori' ? responses.kategori[q.id] : undefined,
        correctAnswer: correctSummary,
        isCorrect: correctStatus,
      };
    });

    const wrong = Math.max(0, totalQuestions - correct);
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
      passageTitle: activePassage ? activePassage.title : 'Seluruh Soal Master TKA',
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
  const showEvaluation = isSubmitted || (isTeacher && teacherMode === 'instant');

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4 bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-slate-800 flex flex-col items-center">
      {/* Quiz Top Filter Bar */}
      <div className="w-full max-w-[960px] mb-4 flex flex-wrap items-center justify-between gap-3 bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/25 text-white text-xs sm:text-sm shadow-md">
        {/* Wacana & Bentuk Soal Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 font-bold">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter:</span>
          </div>

          <select
            value={selectedPassageId}
            onChange={(e) => {
              setSelectedPassageId(e.target.value);
              resetQuiz();
            }}
            className="bg-white/90 text-slate-800 font-semibold px-3 py-1.5 rounded-xl text-xs outline-hidden shadow-xs cursor-pointer"
          >
            <option value="all">Semua Wacana (30 Soal Master)</option>
            {passages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <select
            value={selectedTypeFilter}
            onChange={(e) => {
              setSelectedTypeFilter(e.target.value);
              resetQuiz();
            }}
            className="bg-white/90 text-slate-800 font-semibold px-3 py-1.5 rounded-xl text-xs outline-hidden shadow-xs cursor-pointer"
          >
            <option value="all">Semua Tipe Soal</option>
            <option value="pg">Pilihan Ganda (PG A–E)</option>
            <option value="pgk_kategori">PGK Kategori (Tabel)</option>
            <option value="pgk_mcma">PGK MCMA (Multi Jawaban)</option>
          </select>
        </div>

        {/* Status / Teacher toggle */}
        <div className="flex items-center gap-2">
          {isTeacher && (
            <div className="flex items-center bg-black/20 rounded-xl p-1 text-xs">
              <button
                onClick={() => setTeacherMode('exam')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  teacherMode === 'exam'
                    ? 'bg-white text-indigo-900 font-bold shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Mode Ujian Siswa
              </button>
              <button
                onClick={() => setTeacherMode('instant')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  teacherMode === 'instant'
                    ? 'bg-white text-indigo-900 font-bold shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Kunci Terbuka (Guru)
              </button>
            </div>
          )}

          <div className="bg-white/20 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>
              Dijawab: {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-[960px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-4 sm:p-8 space-y-6 sm:space-y-8">
        {/* Header Title */}
        <div className="text-center pb-5 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            STANDAR FORMAT MASTER TKA 2026
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Kuis Mandiri TKA SMA Bahasa Indonesia 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl mx-auto">
            Mencakup Pilihan Ganda (PG), Pilihan Ganda Kompleks Kategori (Tabel), dan PGK MCMA dengan
            tabel metadata kompetensi resmi.
          </p>
        </div>

        {/* Score & Evaluation Banner */}
        {showEvaluation && (
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center font-black text-2xl text-amber-400">
                  {evaluation.percentage}%
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Hasil Evaluasi: {studentDisplayName}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Benar: <strong className="text-emerald-400">{evaluation.correctCount}</strong> soal •
                    Salah/Kosong: <strong className="text-rose-400">{evaluation.wrongCount}</strong> soal • Total:{' '}
                    {totalQuestions} soal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 border border-white/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis</span>
                </button>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('results')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md"
                  >
                    <span>Lihat Rekap Nilai</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reading Passages Section if any referenced */}
        {displayedPassages.length > 0 && (
          <div className="space-y-4">
            {displayedPassages.map((p) => {
              const paragraphs = p.content.split('\n').filter((x) => x.trim().length > 0);
              return (
                <div
                  key={p.id}
                  className="bg-slate-50 border-l-[5px] border-indigo-600 p-4 sm:p-6 rounded-r-2xl text-justify text-xs sm:text-[0.95rem] leading-relaxed text-slate-700 shadow-2xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                    <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      Teks Wacana: {p.title}
                    </h3>
                    {p.source && (
                      <span className="text-[11px] text-slate-400 italic font-sans">{p.source}</span>
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

        {/* Empty State */}
        {activeQuestions.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 font-bold text-sm">Tidak ada soal yang sesuai dengan filter.</p>
            <p className="text-xs text-slate-400 mt-1">
              Coba ubah pilihan wacana atau tipe soal pada bilah filter di atas.
            </p>
          </div>
        )}

        {/* Questions Loop */}
        <div className="space-y-8">
          {displayQuestions.map((q, index) => {
            const type = q.type || 'pg';
            const qKey = answerKeysRef.current[q.id];
            const isCorrect = showEvaluation ? isQuestionCorrect(q) : false;

            return (
              <div
                key={q.id}
                id={`question-card-${q.id}`}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs transition-all hover:border-indigo-200"
              >
                {/* 1. Official Metadata Table Header */}
                <QuestionMetadataTable
                  metadata={q.metadata}
                  fallbackNumber={q.metadata?.noSoal || index + 1}
                />

                {/* 2. Stimulus Text Box if available */}
                {q.stimulusText && (
                  <div className="bg-slate-50/90 border border-slate-200 rounded-xl p-4 sm:p-5 mb-4 shadow-2xs">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      Kutipan Teks / Stimulus:
                    </span>
                    <p className="font-serif text-slate-700 text-xs sm:text-[0.93rem] leading-relaxed whitespace-pre-line text-justify">
                      {q.stimulusText}
                    </p>
                  </div>
                )}

                {/* 3. Question Prompt */}
                <div className="text-slate-900 font-bold text-sm sm:text-base leading-relaxed mb-4">
                  <span>{index + 1}. </span>
                  <span className="whitespace-pre-line">{q.question}</span>
                </div>

                {/* 4. Choice Options by Type */}
                {/* TYPE 1: PG (Pilihan Ganda Biasa A-E) */}
                {type === 'pg' && q.options && (
                  <div className="flex flex-col gap-2.5">
                    {Object.entries(q.options).map(([key, label]) => {
                      const isSelected = responses.pg[q.id] === key;
                      const trueCorrect = qKey?.pgCorrect || q.correctAnswer;
                      const isThisTheKey = trueCorrect?.toUpperCase() === key.toUpperCase();

                      let cardStyle =
                        'flex items-center p-3 sm:px-4 sm:py-3 bg-white border-2 rounded-xl transition-all duration-200 text-xs sm:text-sm select-none cursor-pointer';
                      let badgeStyle =
                        'inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-white mr-3 shrink-0 text-xs transition-colors';
                      let mark = '';

                      if (showEvaluation) {
                        cardStyle += ' cursor-default';
                        if (isThisTheKey) {
                          cardStyle += ' !bg-emerald-50 !border-emerald-500 !text-emerald-950 font-semibold';
                          badgeStyle += ' bg-emerald-600';
                          mark = '✓';
                        } else if (isSelected && !isThisTheKey) {
                          cardStyle += ' !bg-rose-50 !border-rose-400 !text-rose-950';
                          badgeStyle += ' bg-rose-600';
                          mark = '✗';
                        } else {
                          cardStyle += ' border-slate-200 opacity-60';
                          badgeStyle += ' bg-slate-400';
                        }
                      } else {
                        if (isSelected) {
                          cardStyle += ' border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs';
                          badgeStyle += ' bg-indigo-600 ring-2 ring-indigo-300';
                        } else {
                          cardStyle += ' border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700';
                          badgeStyle += ' bg-indigo-900';
                        }
                      }

                      return (
                        <div
                          key={key}
                          onClick={() => handleSelectPG(q.id, key)}
                          className={cardStyle}
                        >
                          <span className={badgeStyle}>{key}</span>
                          <span className="flex-1 leading-snug">{label}</span>
                          {mark && (
                            <span
                              className={`ml-auto font-black text-base sm:text-lg pl-2 ${
                                mark === '✓' ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {mark}
                            </span>
                          )}
                          {!showEvaluation && isSelected && (
                            <span className="ml-auto text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                              Dipilih
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* TYPE 2: PGK MCMA (Multiple Choice Multiple Answers) */}
                {type === 'pgk_mcma' && q.mcmaOptions && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg font-bold border border-purple-200/80 mb-3">
                      <span>Pilihan Ganda Kompleks: Jawaban benar dapat lebih dari satu.</span>
                      {showEvaluation && qKey?.mcmaCorrect && (
                        <span>Kunci: {qKey.mcmaCorrect.join(', ')}</span>
                      )}
                    </div>

                    {Object.entries(q.mcmaOptions).map(([key, label]) => {
                      const userChoices = responses.mcma[q.id] || [];
                      const isChecked = userChoices.includes(key);
                      const targetKeys = qKey?.mcmaCorrect || q.mcmaCorrectAnswers || [];
                      const isActualKey = targetKeys.includes(key);

                      let containerClass =
                        'flex items-center p-3 sm:px-4 sm:py-3 bg-white border-2 rounded-xl transition-all duration-200 text-xs sm:text-sm select-none cursor-pointer';
                      let boxClass =
                        'w-5 h-5 rounded-md border flex items-center justify-center mr-3 shrink-0 font-bold transition-colors';

                      if (showEvaluation) {
                        containerClass += ' cursor-default';
                        if (isActualKey) {
                          containerClass += ' !bg-emerald-50 !border-emerald-500 !text-emerald-950 font-semibold';
                          boxClass += ' bg-emerald-600 border-emerald-600 text-white';
                        } else if (isChecked && !isActualKey) {
                          containerClass += ' !bg-rose-50 !border-rose-400 !text-rose-950';
                          boxClass += ' bg-rose-600 border-rose-600 text-white';
                        } else {
                          containerClass += ' border-slate-200 opacity-60';
                          boxClass += ' border-slate-300 text-transparent';
                        }
                      } else {
                        if (isChecked) {
                          containerClass += ' border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs';
                          boxClass += ' bg-indigo-600 border-indigo-600 text-white';
                        } else {
                          containerClass += ' border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700';
                          boxClass += ' border-slate-300 text-transparent';
                        }
                      }

                      return (
                        <div
                          key={key}
                          onClick={() => handleToggleMCMA(q.id, key)}
                          className={containerClass}
                        >
                          <div className={boxClass}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="font-bold text-slate-900 mr-2">{key}.</span>
                          <span className="flex-1 leading-snug">{label}</span>
                          {showEvaluation && isActualKey && (
                            <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                              Kunci Benar
                            </span>
                          )}
                          {showEvaluation && isChecked && !isActualKey && (
                            <span className="ml-auto text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                              Keliru Dipilih
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* TYPE 3: PGK KATEGORI (Tabel Pernyataan Benar/Salah atau Tepat/Tidak Tepat) */}
                {type === 'pgk_kategori' && q.categoryStatements && (
                  <div className="space-y-2">
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                            <th className="py-2.5 px-3 w-10 text-center">No</th>
                            <th className="py-2.5 px-3">Pernyataan</th>
                            {(q.categoryColumns || ['Tepat', 'Tidak Tepat']).map((col) => (
                              <th key={col} className="py-2.5 px-3 text-center w-28 sm:w-32">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {q.categoryStatements.map((stmt, sIdx) => {
                            const userVal = responses.kategori[q.id]?.[stmt.id];
                            const correctVal =
                              qKey?.kategoriCorrect?.[stmt.id] || stmt.correctValue;

                            return (
                              <tr key={stmt.id || sIdx} className="hover:bg-slate-50/70 transition">
                                <td className="py-3 px-3 text-center font-bold text-slate-500">
                                  {stmt.id || sIdx + 1}
                                </td>
                                <td className="py-3 px-3 text-slate-800 leading-relaxed font-medium">
                                  {stmt.statement}
                                </td>
                                {(q.categoryColumns || ['Tepat', 'Tidak Tepat']).map((col) => {
                                  const isSelected =
                                    userVal && userVal.toLowerCase() === col.toLowerCase();
                                  const isTarget =
                                    showEvaluation &&
                                    correctVal &&
                                    correctVal.toLowerCase() === col.toLowerCase();

                                  let cellStyle =
                                    'py-3 px-3 text-center transition cursor-pointer select-none';
                                  if (showEvaluation) {
                                    if (isTarget) {
                                      cellStyle += ' bg-emerald-100/70 text-emerald-950 font-bold';
                                    } else if (isSelected && !isTarget) {
                                      cellStyle += ' bg-rose-100/70 text-rose-950 font-bold';
                                    }
                                  }

                                  return (
                                    <td
                                      key={col}
                                      onClick={() => handleSelectCategory(q.id, stmt.id, col)}
                                      className={cellStyle}
                                    >
                                      <div className="flex items-center justify-center gap-1.5">
                                        <input
                                          type="radio"
                                          name={`stmt-${q.id}-${stmt.id}`}
                                          checked={Boolean(isSelected)}
                                          onChange={() => handleSelectCategory(q.id, stmt.id, col)}
                                          disabled={isSubmitted && (!isTeacher || teacherMode === 'exam')}
                                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        />
                                        <span className="text-xs font-semibold">{col}</span>
                                        {showEvaluation && isTarget && (
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline ml-1" />
                                        )}
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 5. Post-Submission Feedback & Explanation Box */}
                {showEvaluation && (
                  <div className="mt-5 space-y-3">
                    {/* Status badge */}
                    <div
                      className={`p-3 rounded-xl flex items-center justify-between text-xs sm:text-sm font-bold ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Jawaban Anda Benar (Skor: 1)
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" /> Jawaban Anda Belum Tepat (Skor: 0)
                          </>
                        )}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80">
                        {q.metadata?.bentukSoal || type}
                      </span>
                    </div>

                    {/* Detailed Explanation */}
                    {(qKey?.explanation || q.explanation) && (
                      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        <span className="font-bold text-amber-900 block mb-1.5 flex items-center gap-1">
                          <Award className="w-4 h-4 text-amber-700" />
                          Pembahasan Lengkap:
                        </span>
                        <p className="whitespace-pre-line text-slate-700">
                          {qKey?.explanation || q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / Reset Action Buttons */}
        {activeQuestions.length > 0 && (
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              Progres Pengerjaan:{' '}
              <strong className="text-indigo-600 font-bold">
                {answeredCount} dari {totalQuestions} Soal
              </strong>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={resetQuiz}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>

              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                >
                  <Send className="w-4 h-4" />
                  <span>Kumpulkan Jawaban</span>
                </button>
              ) : (
                onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('results')}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                  >
                    <span>Buka Riwayat Hasil</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
