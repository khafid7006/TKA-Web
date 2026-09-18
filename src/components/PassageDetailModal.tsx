import React from 'react';
import { X, BookOpen, FileText, HelpCircle, ArrowRight } from 'lucide-react';
import { Passage, Question } from '../types';
import { storageService } from '../services/storageService';

interface PassageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  passage: Passage | null;
  onEdit: (passage: Passage) => void;
  onViewQuestion?: (question: Question) => void;
}

export const PassageDetailModal: React.FC<PassageDetailModalProps> = ({
  isOpen,
  onClose,
  passage,
  onEdit,
  onViewQuestion,
}) => {
  if (!isOpen || !passage) return null;

  const linkedQuestions = storageService.getQuestionsByPassageId(passage.id);
  const paragraphs = passage.content.split('\n').filter((p) => p.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-purple-50/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-200 text-purple-800">
                  {passage.id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-700 font-semibold">
                  {passage.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">{passage.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Reading Box styled faithful to COBA.html reading container */}
          <div className="bg-[#f7f9fc] border-l-[5px] border-[#2a5298] p-5 rounded-r-xl shadow-xs">
            <span className="text-xs font-bold text-[#1e3c72] uppercase tracking-wider block mb-2">
              Teks Wacana:
            </span>
            <div className="space-y-3 font-serif text-[0.98rem] leading-[1.75] text-slate-800 text-justify">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {passage.source && (
              <p className="mt-4 text-xs text-slate-500 font-sans italic border-t border-slate-200/60 pt-2">
                Sumber: {passage.source}
              </p>
            )}
          </div>

          {/* Linked Questions Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Soal yang Terhubung dengan Wacana Ini ({linkedQuestions.length})</span>
              </h4>
              <span className="text-xs text-slate-400">Hubungan 1 wacana → banyak soal</span>
            </div>

            {linkedQuestions.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                Belum ada soal yang dihubungkan ke wacana ini. Anda dapat memilih wacana ini saat membuat atau mengedit soal.
              </p>
            ) : (
              <div className="space-y-2">
                {linkedQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="font-medium text-slate-800 truncate">{q.question}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        Kunci: {q.correctAnswer}
                      </span>
                      {onViewQuestion && (
                        <button
                          onClick={() => {
                            onClose();
                            onViewQuestion(q);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                        >
                          Lihat <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Dibuat: {new Date(passage.createdAt).toLocaleString('id-ID')}</span>
            <span>Diperbarui: {new Date(passage.updatedAt).toLocaleString('id-ID')}</span>
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
              onEdit(passage);
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition text-xs sm:text-sm"
          >
            Edit Wacana Ini
          </button>
        </div>
      </div>
    </div>
  );
};
