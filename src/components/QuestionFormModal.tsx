import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Question, Passage } from '../types';
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

  // Form State
  const [id, setId] = useState('');
  const [passageId, setPassageId] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [optE, setOptE] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [explanation, setExplanation] = useState('');
  const [category, setCategory] = useState('Pemahaman Tekstual');
  const [difficulty, setDifficulty] = useState<'mudah' | 'sedang' | 'sulit'>('sedang');
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setPassages(storageService.getPassages());
      setErrors({});

      if (questionToEdit) {
        setId(questionToEdit.id);
        setPassageId(questionToEdit.passageId || '');
        setQuestionText(questionToEdit.question);
        setOptA(questionToEdit.options.A);
        setOptB(questionToEdit.options.B);
        setOptC(questionToEdit.options.C);
        setOptD(questionToEdit.options.D);
        setOptE(questionToEdit.options.E);
        setCorrectAnswer(questionToEdit.correctAnswer);
        setExplanation(questionToEdit.explanation || '');
        setCategory(questionToEdit.category || 'Pemahaman Tekstual');
        setDifficulty(questionToEdit.difficulty);
        setStatus(questionToEdit.status);
      } else {
        // New question default
        const newId = `soal-${Date.now().toString().slice(-5)}`;
        setId(newId);
        const existingPassages = storageService.getPassages();
        setPassageId(existingPassages.length > 0 ? existingPassages[0].id : '');
        setQuestionText('');
        setOptA('');
        setOptB('');
        setOptC('');
        setOptD('');
        setOptE('');
        setCorrectAnswer('A');
        setExplanation('');
        setCategory('Pemahaman Tekstual');
        setDifficulty('sedang');
        setStatus('published');
      }
    }
  }, [isOpen, questionToEdit]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!id.trim()) errs.id = 'ID Soal wajib diisi.';
    if (!questionText.trim()) errs.questionText = 'Teks pertanyaan wajib diisi.';
    if (!optA.trim()) errs.optA = 'Pilihan A wajib diisi.';
    if (!optB.trim()) errs.optB = 'Pilihan B wajib diisi.';
    if (!optC.trim()) errs.optC = 'Pilihan C wajib diisi.';
    if (!optD.trim()) errs.optD = 'Pilihan D wajib diisi.';
    if (!optE.trim()) errs.optE = 'Pilihan E wajib diisi.';
    if (!['A', 'B', 'C', 'D', 'E'].includes(correctAnswer)) {
      errs.correctAnswer = 'Kunci jawaban harus berupa salah satu dari A–E.';
    }
    if (!category.trim()) errs.category = 'Kategori soal wajib diisi.';

    if (status === 'published') {
      if (!optA.trim() || !optB.trim() || !optC.trim() || !optD.trim() || !optE.trim()) {
        errs.status = 'Soal dengan status "Published" harus memiliki seluruh opsi A–E lengkap.';
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

    const payload = {
      id: id.trim(),
      passageId: passageId.trim(),
      question: questionText.trim(),
      options: {
        A: optA.trim(),
        B: optB.trim(),
        C: optC.trim(),
        D: optD.trim(),
        E: optE.trim(),
      },
      correctAnswer,
      explanation: explanation.trim(),
      category: category.trim(),
      difficulty,
      status,
    };

    if (questionToEdit) {
      storageService.updateQuestion(questionToEdit.id, payload);
      showToast('Soal berhasil diperbarui', 'success');
    } else {
      // Check ID conflict
      if (storageService.getQuestionById(payload.id)) {
        setErrors((prev) => ({ ...prev, id: 'ID Soal sudah digunakan. Gunakan ID lain.' }));
        showToast('ID Soal sudah ada di sistem', 'error');
        return;
      }
      storageService.createQuestion(payload);
      showToast('Soal baru berhasil disimpan ke bank soal', 'success');
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {questionToEdit ? 'Edit Soal' : 'Tambah Soal Baru'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Formulir pembuatan soal pilihan ganda A–E TKA Bahasa Indonesia
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
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ID Soal <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={!!questionToEdit}
                placeholder="misal: soal-1"
                className={`w-full px-3.5 py-2 rounded-xl border ${
                  errors.id ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500`}
              />
              {errors.id && <p className="text-xs text-rose-600 mt-1">{errors.id}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teks Bacaan Rujukan
              </label>
              <select
                value={passageId}
                onChange={(e) => setPassageId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Tanpa Bacaan Rujukan --</option>
                {passages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Teks Pertanyaan <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Tuliskan teks pertanyaan soal..."
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                errors.questionText ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              } text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.questionText && (
              <p className="text-xs text-rose-600 mt-1">{errors.questionText}</p>
            )}
          </div>

          {/* Options A-E */}
          <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Pilihan Jawaban (A–E) & Kunci Jawaban <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-500">Pilih radio button untuk menentukan kunci</span>
            </div>

            {[
              { key: 'A', val: optA, set: setOptA, err: errors.optA },
              { key: 'B', val: optB, set: setOptB, err: errors.optB },
              { key: 'C', val: optC, set: setOptC, err: errors.optC },
              { key: 'D', val: optD, set: setOptD, err: errors.optD },
              { key: 'E', val: optE, set: setOptE, err: errors.optE },
            ].map((opt) => (
              <div key={opt.key} className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={correctAnswer === opt.key}
                    onChange={() => setCorrectAnswer(opt.key as any)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      correctAnswer === opt.key
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.key}
                  </span>
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    value={opt.val}
                    onChange={(e) => opt.set(e.target.value)}
                    placeholder={`Teks pilihan ${opt.key}...`}
                    className={`w-full px-3 py-1.5 rounded-lg border ${
                      opt.err ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                    } bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {opt.err && <p className="text-xs text-rose-600 mt-0.5">{opt.err}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pembahasan / Penjelasan Jawaban (Opsional)
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Tuliskan pembahasan mengapa opsi tersebut adalah jawaban yang tepat..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Classification Row: Category, Difficulty, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="misal: Pemahaman Tekstual"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat Kesulitan
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              >
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sulit">Sulit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Publikasi
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="published">Published (Tayang)</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {errors.status && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.status}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-sm"
            >
              {questionToEdit ? 'Simpan Perubahan' : 'Simpan Soal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
