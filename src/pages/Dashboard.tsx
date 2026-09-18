import React, { useEffect, useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  FolderTree,
  Award,
  PlusCircle,
  PlayCircle,
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { ViewMode, Question } from '../types';
import { storageService, STORAGE_EVENT_KEY } from '../services/storageService';

interface DashboardProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCreateQuestion: () => void;
  onOpenCreatePassage: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  onOpenCreateQuestion,
  onOpenCreatePassage,
}) => {
  const [stats, setStats] = useState(storageService.getStats());

  const refreshStats = () => {
    setStats(storageService.getStats());
  };

  useEffect(() => {
    refreshStats();
    const handleStorageChange = () => refreshStats();
    window.addEventListener(STORAGE_EVENT_KEY, handleStorageChange);
    return () => window.removeEventListener(STORAGE_EVENT_KEY, handleStorageChange);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3c72] via-[#284f93] to-[#764ba2] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-amber-300 mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pusat Manajemen Soal TKA Bahasa Indonesia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang di Panel Pengelolaan Soal
          </h2>
          <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
            Kelola teks bacaan, buat dan perbarui bank soal pilihan ganda A–E, serta uji kuis pemahaman tekstual dengan sistem penilaian otomatis.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition transform hover:-translate-y-0.5 shadow-lg"
            >
              <PlayCircle className="w-4 h-4" />
              Mulai Kuis Siswa
            </button>
            <button
              onClick={onOpenCreateQuestion}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm border border-white/20 transition"
            >
              <PlusCircle className="w-4 h-4" />
              Tambah Soal Baru
            </button>
          </div>
        </div>

        {/* Decorative circle shapes */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute right-32 -top-12 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Total Soal */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">Total Soal</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              {stats.totalQuestions}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              ({stats.publishedQuestions} tayang)
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Tersedia dalam bank soal</p>
        </div>

        {/* Metric 2: Total Bacaan */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">Wacana / Bacaan</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              {stats.totalPassages}
            </span>
            <span className="text-xs text-slate-500">teks rujukan</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">1 wacana multi-soal</p>
        </div>

        {/* Metric 3: Total Kategori */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">Kategori Materi</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              {stats.totalCategories}
            </span>
            <span className="text-xs text-slate-500">rumpun</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Pemahaman & Literasi</p>
        </div>

        {/* Metric 4: Total Percobaan Quiz */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">Kuis Selesai</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              {stats.totalQuizzes}
            </span>
            <span className="text-xs text-emerald-600">tercatat</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Riwayat pengerjaan siswa</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Aksi Cepat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={onOpenCreateQuestion}
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 group-hover:text-blue-600 transition text-sm">
                Tambah Soal
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Input pertanyaan & opsi A–E</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('questions')}
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition text-sm">
                Kelola Soal
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Edit, filter & cari bank soal</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('passages')}
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-md transition text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 group-hover:text-purple-600 transition text-sm">
                Kelola Bacaan
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Input wacana referensi</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center group-hover:scale-105 transition">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 group-hover:text-amber-700 transition text-sm">
                Mulai Quiz
              </p>
              <p className="text-xs text-slate-600 mt-0.5">Mode simulasi interaktif</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recently Added Questions Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Soal Terbaru</h3>
            <p className="text-xs text-slate-500 mt-0.5">Daftar 5 soal yang terakhir ditambahkan ke sistem</p>
          </div>
          <button
            onClick={() => onNavigate('questions')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>Lihat Semua Soal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {stats.recentQuestions.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            Belum ada soal tersimpan. Silakan tambah soal baru.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {stats.recentQuestions.map((q: Question, idx: number) => (
              <div key={q.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 line-clamp-2">
                      {q.question}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium">
                        {q.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md font-medium capitalize ${
                          q.difficulty === 'mudah'
                            ? 'bg-emerald-50 text-emerald-700'
                            : q.difficulty === 'sedang'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      <span className="text-slate-400">
                        Kunci: <strong className="text-slate-700">{q.correctAnswer}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      q.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {q.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
