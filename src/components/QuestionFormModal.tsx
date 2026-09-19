import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Question, Passage, QuestionType, CategoryStatement } from '../types';
import { storageService } from '../services/storageService';
import { useToast } from './Toast';

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionToEdit?: Question | null;
  onSuccess: () => void;
}

export const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  isOpen,
  onClose,
  questionToEdit,
  onSuccess,
}) => {
  const { showToast } = useToast();
  const [passages, setPassages] = useState<Passage[]>([]);

  // Core Form State
  const [id, setId] = useState('');
  const [type, setType] = useState<QuestionType>('pg');
  const [passageId, setPassageId] = useState('');
  const [stimulusText, setStimulusText] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [category, setCategory] = useState('Pemahaman Tekstual');
  const [difficulty, setDifficulty] = useState<'mudah' | 'sedang' | 'sulit'>('sedang');
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  // Metadata State
  const [noSoal, setNoSoal] = useState<string>('1');
  const [kompetensi, setKompetensi] = useState<string>('Pemahaman Tekstual');
  const [subKompetensi, setSubKompetensi] = useState<string>('Mengidentifikasi ide pokok dan informasi tersurat');
  const [bentukSoal, setBentukSoal] = useState<string>('Pilihan Ganda (PG)');

  // Type 1: PG (A–E)
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [optE, setOptE] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  // Type 2: PGK MCMA
  const [mcmaA, setMcmaA] = useState('');
  const [mcmaB, setMcmaB] = useState('');
  const [mcmaC, setMcmaC] = useState('');
  const [mcmaD, setMcmaD] = useState('');
  const [mcmaE, setMcmaE] = useState('');
  const [mcmaCorrect, setMcmaCorrect] = useState<string[]>(['B', 'C']);

  // Type 3: PGK Kategori
  const [categoryStatements, setCategoryStatements] = useState<CategoryStatement[]>([
    { id: 'A', statement: 'Pernyataan pertama...', correctValue: 'Tepat' },
    { id: 'B', statement: 'Pernyataan kedua...', correctValue: 'Tidak Tepat' },
    { id: 'C', statement: 'Pernyataan ketiga...', correctValue: 'Tepat' },
  ]);
  const [categoryCols, setCategoryCols] = useState<string>('Tepat, Tidak Tepat');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setPassages(storageService.getPassages());
      setErrors({});

      if (questionToEdit) {
        setId(questionToEdit.id);
        const qType = questionToEdit.type || 'pg';
        setType(qType);
        setPassageId(questionToEdit.passageId || '');
        setStimulusText(questionToEdit.stimulusText || '');
        setQuestionText(questionToEdit.question);
        setExplanation(questionToEdit.explanation || '');
        setCategory(questionToEdit.category || 'Pemahaman Tekstual');
        setDifficulty(questionToEdit.difficulty);
        setStatus(questionToEdit.status);

        // Metadata
        setNoSoal(String(questionToEdit.metadata?.noSoal || '1'));
        setKompetensi(questionToEdit.metadata?.kompetensi || questionToEdit.category || 'Pemahaman Tekstual');
        setSubKompetensi(questionToEdit.metadata?.subKompetensi || '');
        setBentukSoal(questionToEdit.metadata?.bentukSoal || (qType === 'pgk_kategori' ? 'PGK Kategori' : qType === 'pgk_mcma' ? 'PGK MCMA' : 'Pilihan Ganda (PG)'));

        // PG options
        if (questionToEdit.options) {
          setOptA(questionToEdit.options.A || '');
          setOptB(questionToEdit.options.B || '');
          setOptC(questionToEdit.options.C || '');
          setOptD(questionToEdit.options.D || '');
          setOptE(questionToEdit.options.E || '');
          setCorrectAnswer((questionToEdit.correctAnswer as any) || 'A');
        }

        // MCMA
        if (questionToEdit.mcmaOptions) {
          setMcmaA(questionToEdit.mcmaOptions.A || '');
          setMcmaB(questionToEdit.mcmaOptions.B || '');
          setMcmaC(questionToEdit.mcmaOptions.C || '');
          setMcmaD(questionToEdit.mcmaOptions.D || '');
          setMcmaE(questionToEdit.mcmaOptions.E || '');
        }
        setMcmaCorrect(questionToEdit.mcmaCorrectAnswers || ['A']);

        // Kategori
        if (questionToEdit.categoryStatements) {
          setCategoryStatements(questionToEdit.categoryStatements);
        }
        if (questionToEdit.categoryColumns) {
          setCategoryCols(questionToEdit.categoryColumns.join(', '));
        }
      } else {
        // New question defaults
        const total = storageService.getQuestions().length;
        const newNo = total + 1;
        const newId = `soal-${newNo.toString().padStart(2, '0')}`;
        setId(newId);
        setType('pg');
        setPassageId('');
        setStimulusText('');
        setQuestionText('');
        setExplanation('');
        setCategory('Pemahaman Tekstual');
        setDifficulty('sedang');
        setStatus('published');

        setNoSoal(String(newNo));
        setKompetensi('Pemahaman Tekstual');
        setSubKompetensi('Mengidentifikasi gagasan utama dan perincian isi teks');
        setBentukSoal('Pilihan Ganda (PG)');

        setOptA('');
        setOptB('');
        setOptC('');
        setOptD('');
        setOptE('');
        setCorrectAnswer('A');

        setMcmaA('');
        setMcmaB('');
        setMcmaC('');
        setMcmaD('');
        setMcmaE('');
        setMcmaCorrect(['B', 'C']);

        setCategoryStatements([
          { id: 'A', statement: 'Pernyataan contoh A...', correctValue: 'Tepat' },
          { id: 'B', statement: 'Pernyataan contoh B...', correctValue: 'Tidak Tepat' },
          { id: 'C', statement: 'Pernyataan contoh C...', correctValue: 'Tepat' },
        ]);
        setCategoryCols('Tepat, Tidak Tepat');
      }
    }
  }, [isOpen, questionToEdit]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!id.trim()) errs.id = 'ID Soal wajib diisi.';
    if (!questionText.trim()) errs.questionText = 'Teks pertanyaan wajib diisi.';
    if (!category.trim()) errs.category = 'Kategori soal wajib diisi.';

    if (type === 'pg') {
      if (!optA.trim()) errs.optA = 'Pilihan A wajib diisi.';
      if (!optB.trim()) errs.optB = 'Pilihan B wajib diisi.';
      if (!optC.trim()) errs.optC = 'Pilihan C wajib diisi.';
      if (!optD.trim()) errs.optD = 'Pilihan D wajib diisi.';
      if (!optE.trim()) errs.optE = 'Pilihan E wajib diisi.';
    } else if (type === 'pgk_mcma') {
      if (mcmaCorrect.length === 0) {
        errs.mcmaCorrect = 'Pilih minimal satu kunci jawaban untuk PGK MCMA.';
      }
    } else if (type === 'pgk_kategori') {
      if (categoryStatements.length === 0) {
        errs.categoryStatements = 'Minimal harus ada 1 baris pernyataan untuk PGK Kategori.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Mohon lengkapi semua kolom yang wajib diisi', 'error');
      return;
    }

    const colsArray = categoryCols
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const payload: Partial<Question> = {
      id: id.trim(),
      type,
      passageId: passageId.trim() || undefined,
      stimulusText: stimulusText.trim() || undefined,
      question: questionText.trim(),
      explanation: explanation.trim(),
      category: category.trim(),
      difficulty,
      status,
      metadata: {
        noSoal: Number(noSoal) || noSoal,
        kompetensi: kompetensi.trim(),
        subKompetensi: subKompetensi.trim(),
        bentukSoal: bentukSoal.trim(),
      },
    };

    if (type === 'pg') {
      payload.options = {
        A: optA.trim(),
        B: optB.trim(),
        C: optC.trim(),
        D: optD.trim(),
        E: optE.trim(),
      };
      payload.correctAnswer = correctAnswer;
    } else if (type === 'pgk_mcma') {
      payload.mcmaOptions = {
        A: mcmaA.trim(),
        B: mcmaB.trim(),
        C: mcmaC.trim(),
        D: mcmaD.trim(),
        E: mcmaE.trim(),
      };
      payload.mcmaCorrectAnswers = mcmaCorrect;
    } else if (type === 'pgk_kategori') {
      payload.categoryColumns = colsArray.length > 0 ? colsArray : ['Tepat', 'Tidak Tepat'];
      payload.categoryStatements = categoryStatements;
    }

    if (questionToEdit) {
      storageService.updateQuestion(questionToEdit.id, payload as any);
      showToast('Soal berhasil diperbarui', 'success');
    } else {
      if (storageService.getQuestionById(payload.id!)) {
        setErrors((prev) => ({ ...prev, id: 'ID Soal sudah digunakan. Gunakan ID lain.' }));
        showToast('ID Soal sudah ada di sistem', 'error');
        return;
      }
      storageService.createQuestion(payload as any);
      showToast('Soal baru berhasil disimpan ke bank soal', 'success');
    }

    onSuccess();
    onClose();
  };

  const handleToggleMcmaKey = (key: string) => {
    setMcmaCorrect((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key].sort()
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {questionToEdit ? 'Edit Butir Soal Master' : 'Tambah Butir Soal Master'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Format TKA SMA Bahasa Indonesia 2026 (PG, PGK Kategori, & PGK MCMA)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm flex-1">
          {/* Metadata Section */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Tabel Metadata & Kompetensi Soal
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">No. Soal</label>
                <input
                  type="text"
                  value={noSoal}
                  onChange={(e) => setNoSoal(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white text-xs"
                  placeholder="1..30"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Kompetensi
                </label>
                <select
                  value={kompetensi}
                  onChange={(e) => {
                    setKompetensi(e.target.value);
                    setCategory(e.target.value);
                  }}
                  className="w-full px-3 py-2 border rounded-xl bg-white text-xs"
                >
                  <option value="Pemahaman Tekstual">Pemahaman Tekstual</option>
                  <option value="Evaluasi dan Apresiasi">Evaluasi dan Apresiasi</option>
                  <option value="Penalaran Analitis">Penalaran Analitis</option>
                </select>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Sub-Kompetensi / Rincian
                </label>
                <input
                  type="text"
                  value={subKompetensi}
                  onChange={(e) => setSubKompetensi(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white text-xs"
                  placeholder="Contoh: Mengidentifikasi ide pokok dan informasi tersurat"
                />
              </div>
            </div>
          </div>

          {/* Type Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipe / Bentuk Soal *
              </label>
              <select
                value={type}
                onChange={(e) => {
                  const val = e.target.value as QuestionType;
                  setType(val);
                  if (val === 'pg') setBentukSoal('Pilihan Ganda (PG)');
                  if (val === 'pgk_kategori') setBentukSoal('PGK Kategori');
                  if (val === 'pgk_mcma') setBentukSoal('PGK MCMA');
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-xs font-semibold"
              >
                <option value="pg">Pilihan Ganda (PG A–E)</option>
                <option value="pgk_kategori">PGK Kategori (Tabel Pernyataan)</option>
                <option value="pgk_mcma">PGK MCMA (Multi Jawaban)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ID Soal *</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className={`w-full px-3 py-2 border rounded-xl text-xs ${
                  errors.id ? 'border-red-500 bg-red-50' : 'border-slate-300'
                }`}
                placeholder="soal-01"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Wacana Terkait</label>
              <select
                value={passageId}
                onChange={(e) => setPassageId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-xs"
              >
                <option value="">-- Tanpa Wacana Terikat --</option>
                {passages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stimulus Text (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Teks Stimulus / Kutipan (Opsional jika berdiri sendiri)
            </label>
            <textarea
              rows={3}
              value={stimulusText}
              onChange={(e) => setStimulusText(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-serif leading-relaxed"
              placeholder="Masukkan kutipan teks/cerpen/wacana singkat yang menjadi stimulus pertanyaan ini..."
            />
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Teks Pertanyaan *
            </label>
            <textarea
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className={`w-full px-3 py-2 border rounded-xl text-xs font-medium ${
                errors.questionText ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
              placeholder="Tuliskan butir pertanyaan di sini..."
            />
          </div>

          {/* TYPE 1: PG Inputs */}
          {type === 'pg' && (
            <div className="space-y-3 bg-blue-50/40 p-4 rounded-xl border border-blue-100">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                Pilihan Jawaban A–E:
              </span>
              {(['A', 'B', 'C', 'D', 'E'] as const).map((key) => {
                const val =
                  key === 'A' ? optA : key === 'B' ? optB : key === 'C' ? optC : key === 'D' ? optD : optE;
                const setter =
                  key === 'A'
                    ? setOptA
                    : key === 'B'
                    ? setOptB
                    : key === 'C'
                    ? setOptC
                    : key === 'D'
                    ? setOptD
                    : setOptE;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                      {key}
                    </span>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={`Opsi ${key}...`}
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                    />
                  </div>
                );
              })}

              <div className="pt-2">
                <label className="block text-xs font-semibold text-blue-950 mb-1">
                  Kunci Jawaban Benar:
                </label>
                <div className="flex gap-2">
                  {(['A', 'B', 'C', 'D', 'E'] as const).map((k) => (
                    <button
                      type="button"
                      key={k}
                      onClick={() => setCorrectAnswer(k)}
                      className={`w-8 h-8 rounded-lg font-bold text-xs transition ${
                        correctAnswer === k
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TYPE 2: PGK MCMA Inputs */}
          {type === 'pgk_mcma' && (
            <div className="space-y-3 bg-purple-50/40 p-4 rounded-xl border border-purple-100">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                Pilihan Jawaban MCMA (Pilihan Ganda Kompleks):
              </span>
              <p className="text-[11px] text-purple-700 mb-2">
                Centang kotak di sebelah kiri untuk menandai opsi yang menjadi kunci jawaban benar.
              </p>
              {(['A', 'B', 'C', 'D', 'E'] as const).map((key) => {
                const val =
                  key === 'A'
                    ? mcmaA
                    : key === 'B'
                    ? mcmaB
                    : key === 'C'
                    ? mcmaC
                    : key === 'D'
                    ? mcmaD
                    : mcmaE;
                const setter =
                  key === 'A'
                    ? setMcmaA
                    : key === 'B'
                    ? setMcmaB
                    : key === 'C'
                    ? setMcmaC
                    : key === 'D'
                    ? setMcmaD
                    : setMcmaE;
                const isKey = mcmaCorrect.includes(key);

                return (
                  <div key={key} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMcmaKey(key)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 transition ${
                        isKey ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {key}
                    </button>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={`Opsi ${key}...`}
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                    />
                    <span className="text-[11px] text-slate-500 font-medium">
                      {isKey ? '✓ Kunci' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* TYPE 3: PGK Kategori Inputs */}
          {type === 'pgk_kategori' && (
            <div className="space-y-3 bg-amber-50/40 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Tabel Pernyataan & Kunci Nilai:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const nextId = String.fromCharCode(65 + categoryStatements.length);
                    setCategoryStatements([
                      ...categoryStatements,
                      { id: nextId, statement: '', correctValue: 'Tepat' },
                    ]);
                  }}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Baris
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Kolom Kategori (pisahkan dengan koma):
                </label>
                <input
                  type="text"
                  value={categoryCols}
                  onChange={(e) => setCategoryCols(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                  placeholder="Tepat, Tidak Tepat"
                />
              </div>

              <div className="space-y-2 pt-2">
                {categoryStatements.map((stmt, idx) => (
                  <div key={stmt.id || idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                    <span className="font-bold text-xs w-6 text-center">{stmt.id || idx + 1}</span>
                    <input
                      type="text"
                      value={stmt.statement}
                      onChange={(e) => {
                        const copy = [...categoryStatements];
                        copy[idx].statement = e.target.value;
                        setCategoryStatements(copy);
                      }}
                      placeholder={`Pernyataan ${stmt.id}...`}
                      className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded"
                    />
                    <select
                      value={stmt.correctValue}
                      onChange={(e) => {
                        const copy = [...categoryStatements];
                        copy[idx].correctValue = e.target.value;
                        setCategoryStatements(copy);
                      }}
                      className="px-2 py-1 text-xs border border-slate-300 rounded font-semibold bg-slate-50"
                    >
                      {categoryCols.split(',').map((c) => {
                        const trimmed = c.trim();
                        return (
                          <option key={trimmed} value={trimmed}>
                            Kunci: {trimmed}
                          </option>
                        );
                      })}
                    </select>
                    {categoryStatements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setCategoryStatements(categoryStatements.filter((_, i) => i !== idx));
                        }}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanation */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pembahasan Lengkap (Ditampilkan setelah siswa mengumpulkan kuis)
            </label>
            <textarea
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs leading-relaxed"
              placeholder="Jelaskan alasan kunci jawaban benar dan analisis pilihan jawaban lainnya..."
            />
          </div>

          {/* Difficulty & Status */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tingkat Kesulitan</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-xs"
              >
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sulit">Sulit</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status Publikasi</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-xs font-semibold"
              >
                <option value="published">Published (Siap Dikerjakan)</option>
                <option value="draft">Draft (Disimpan Sementara)</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/70 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 bg-slate-200/80 hover:bg-slate-300 rounded-xl font-medium transition text-xs sm:text-sm"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition text-xs sm:text-sm shadow-md"
          >
            {questionToEdit ? 'Simpan Perubahan' : 'Tambah ke Bank Soal'}
          </button>
        </div>
      </div>
    </div>
  );
};
