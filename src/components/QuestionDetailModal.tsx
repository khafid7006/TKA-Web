import React from 'react';
import { X, CheckCircle2, Calendar, BookOpen, Tag, Award } from 'lucide-react';
import { Question } from '../types';
import { storageService } from '../services/storageService';

interface QuestionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
  onEdit: (question: Question) => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  isOpen,
  onClose,
  question,
  onEdit,
}) => {
  if (!isOpen || !question) return null;

  const passage = question.passageId
    ? storageService.getPassageById(question.passageId)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                {question.id}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  question.status === 'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {question.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 mt-1">Detail Soal</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* Linked Passage if any */}
          {passage && (
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-blue-950">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Wacana Rujukan: {passage.title}</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-3 italic">
                "{passage.content.slice(0, 200)}..."
              </p>
            </div>
          )}

          {/* Question text */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pertanyaan:
            </span>
            <p className="text-base font-semibold text-slate-900 mt-1 leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pilihan Jawaban (A–E):
            </span>
            <div className="space-y-2 mt-1">
              {(['A', 'B', 'C', 'D', 'E'] as const).map((key) => {
                const isCorrect = question.correctAnswer === key;
                return (
                  <div
                    key={key}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-sm transition ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium ring-1 ring-emerald-300'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {key}
                    </span>
                    <span className="flex-1">{question.options[key]}</span>
                    {isCorrect && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Kunci Jawaban
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {question.explanation && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Pembahasan:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Metadata Badges */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Kategori</span>
              <span className="text-slate-800 font-semibold">{question.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Kesulitan</span>
              <span className="text-slate-800 font-semibold capitalize">
                {question.difficulty}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Dibuat</span>
              <span className="text-slate-600">
                {new Date(question.createdAt).toLocaleDateString('id-ID')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Diperbarui</span>
              <span className="text-slate-600">
                {new Date(question.updatedAt).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/70 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 bg-slate-200/80 hover:bg-slate-300 rounded-xl font-medium transition text-xs sm:text-sm"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(question);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition text-xs sm:text-sm"
          >
            Edit Soal Ini
          </button>
        </div>
      </div>
    </div>
  );
};
