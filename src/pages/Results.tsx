import React, { useState, useEffect } from 'react';
import {
  Award,
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  FileQuestion,
  RotateCcw,
  BookOpen,
  X,
  TrendingUp,
} from 'lucide-react';
import { QuizResult, ViewMode } from '../types';
import { storageService, STORAGE_EVENT_KEY } from '../services/storageService';
import { ConfirmModal } from '../components/ConfirmModal';
import { useToast } from '../components/Toast';

interface ResultsProps {
  onNavigate?: (view: ViewMode) => void;
}

export const Results: React.FC<ResultsProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [viewingResult, setViewingResult] = useState<QuizResult | null>(null);
  const [deletingResult, setDeletingResult] = useState<QuizResult | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);

  const loadData = () => {
    setResults(storageService.getQuizResults());
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = () => loadData();
    window.addEventListener(STORAGE_EVENT_KEY, handleStorageChange);
    return () => window.removeEventListener(STORAGE_EVENT_KEY, handleStorageChange);
  }, []);

  const handleDeleteOne = () => {
    if (!deletingResult) return;
    storageService.deleteQuizResult(deletingResult.id);
    showToast('Catatan hasil kuis berhasil dihapus', 'success');
    setDeletingResult(null);
  };

  const handleClearAll = () => {
    storageService.clearQuizResults();
    showToast('Seluruh riwayat hasil kuis berhasil dibersihkan', 'info');
    setIsClearingAll(false);
  };

  // Average calculations
  const totalAttempts = results.length;
  const averageScore =
    totalAttempts > 0
      ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / totalAttempts)
      : 0;
  const highestScore =
    totalAttempts > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5">
            <Award className="w-7 h-7 text-amber-500" />
            Riwayat Hasil & Evaluasi Quiz
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Rekapitulasi pengerjaan siswa, skor pemahaman teks, dan evaluasi jawaban
          </p>
        </div>

        {results.length > 0 && (
          <button
            onClick={() => setIsClearingAll(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Bersihkan Semua Riwayat</span>
          </button>
        )}
      </div>

      {/* Overview Analytics Bar */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Total Kuis Dikerjakan</span>
              <span className="text-2xl font-extrabold text-slate-800">{totalAttempts} kali</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Rata-rata Nilai</span>
              <span className="text-2xl font-extrabold text-emerald-600">{averageScore}%</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Nilai Tertinggi</span>
              <span className="text-2xl font-extrabold text-amber-600">{highestScore}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {results.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3">
              <FileQuestion className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Belum ada riwayat kuis tersimpan</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Selesaikan kuis interaktif di halaman "Kuis Siswa" dan klik "Simpan Hasil" untuk mencatat skor ke riwayat.
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('quiz')}
                className="mt-4 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow-md inline-flex items-center gap-2"
              >
                <span>Mulai Kerjakan Kuis Sekarang</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 text-xs text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3.5">ID & Waktu</th>
                  <th className="px-4 py-3.5">Nama Siswa</th>
                  <th className="px-4 py-3.5">Wacana Referensi</th>
                  <th className="px-4 py-3.5 text-center">Total Soal</th>
                  <th className="px-4 py-3.5 text-center">Benar / Salah</th>
                  <th className="px-4 py-3.5 text-center">Nilai (%)</th>
                  <th className="px-4 py-3.5 text-right w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition">
                    {/* ID & Date */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-mono text-xs font-bold text-slate-700">{r.id}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(r.date).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </div>
                    </td>

                    {/* Student Name */}
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                          {r.studentName ? r.studentName.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <span>{r.studentName}</span>
                      </div>
                    </td>

                    {/* Passage Title */}
                    <td className="px-4 py-4 max-w-xs truncate text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-purple-600 shrink-0" />
                        <span className="truncate">{r.passageTitle || 'Campuran Semua Wacana'}</span>
                      </span>
                    </td>

                    {/* Total Questions */}
                    <td className="px-4 py-4 text-center font-medium text-slate-700 whitespace-nowrap">
                      {r.totalQuestions} soal
                    </td>

                    {/* Correct / Wrong */}
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-xs">
                        <span className="text-emerald-700 font-bold">✓ {r.correctAnswers}</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-rose-600 font-bold">✗ {r.wrongAnswers}</span>
                      </span>
                    </td>

                    {/* Percentage */}
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                          r.percentage >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.percentage >= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {r.percentage}%
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingResult(r)}
                          title="Lihat Rincian Jawaban"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingResult(r)}
                          title="Hapus Rekaman Ini"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Result Modal */}
      {viewingResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {viewingResult.id}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">
                  Rincian Pengerjaan: {viewingResult.studentName}
                </h3>
              </div>
              <button
                onClick={() => setViewingResult(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm">
              {/* Summary Pill */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <span className="text-xs text-slate-400 block">Wacana</span>
                  <span className="font-semibold text-xs text-slate-700 truncate block">
                    {viewingResult.passageTitle || 'Campuran'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Jawaban Benar</span>
                  <span className="font-bold text-emerald-600">
                    {viewingResult.correctAnswers} dari {viewingResult.totalQuestions}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Jawaban Salah</span>
                  <span className="font-bold text-rose-600">{viewingResult.wrongAnswers}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Nilai Akhir</span>
                  <span className="font-extrabold text-blue-600 text-base">
                    {viewingResult.percentage}%
                  </span>
                </div>
              </div>

              {/* Answers Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Daftar Jawaban per Nomor Soal:
                </h4>
                {viewingResult.answers.map((ans, idx) => {
                  const questionObj = storageService.getQuestionById(ans.questionId);
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                        ans.isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/50 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold">
                          Nomor {idx + 1}: {questionObj ? questionObj.question : ans.questionId}
                        </span>
                        <span
                          className={`font-bold shrink-0 px-2 py-0.5 rounded-md ${
                            ans.isCorrect
                              ? 'bg-emerald-200 text-emerald-900'
                              : 'bg-rose-200 text-rose-900'
                          }`}
                        >
                          {ans.isCorrect ? 'BENAR' : 'SALAH'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs font-medium">
                        <span>
                          Jawaban Dipilih: <strong>Opsi {ans.selectedAnswer}</strong>
                        </span>
                        <span>
                          Kunci Jawaban: <strong>Opsi {ans.correctAnswer}</strong>
                        </span>
                      </div>
                      {questionObj && questionObj.explanation && (
                        <p className="mt-2 text-slate-600 border-t border-slate-200/50 pt-1.5 italic">
                          💡 Pembahasan: {questionObj.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setViewingResult(null)}
                className="px-4 py-2 text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium transition text-xs sm:text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Modal */}
      <ConfirmModal
        isOpen={!!deletingResult}
        title="Hapus Rekaman Hasil"
        message="Apakah Anda yakin ingin menghapus rekaman riwayat kuis ini?"
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={handleDeleteOne}
        onCancel={() => setDeletingResult(null)}
        isDanger={true}
      />

      {/* Clear All Modal */}
      <ConfirmModal
        isOpen={isClearingAll}
        title="Bersihkan Seluruh Riwayat"
        message="Apakah Anda yakin ingin menghapus semua catatan riwayat hasil kuis? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Bersihkan Semua"
        cancelLabel="Batal"
        onConfirm={handleClearAll}
        onCancel={() => setIsClearingAll(false)}
        isDanger={true}
      />
    </div>
  );
};
