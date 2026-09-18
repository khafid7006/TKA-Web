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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c3664] via-[#244b8d] to-[#6a4299] text-white p-7 sm:p-9 shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300 mb-4 border border-white/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pusat Manajemen Soal TKA Bahasa Indonesia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Selamat Datang di Panel Pengelolaan Soal
          </h2>
          <p className="mt-3 text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
            Kelola teks bacaan, buat dan perbarui bank soal pilihan ganda A–E, serta uji kuis pemahaman tekstual dengan sistem penilaian otomatis.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Mulai Kuis Siswa</span>
            </button>
            <button
              onClick={onOpenCreateQuestion}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm border border-white/25 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Soal Baru</span>
            </button>
          </div>
        </div>

        {/* Decorative ambient elements */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/5 pointer-events-none blur-xl" />
        <div className="absolute right-24 -top-10 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Total Soal */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Soal</span>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60 group-hover:scale-105 transition-transform duration-200">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              {stats.totalQuestions}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/50">
              {stats.publishedQuestions} tayang
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">Tersedia dalam bank soal aktif</p>
        </div>

        {/* Metric 2: Total Bacaan */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Wacana / Bacaan</span>
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100/60 group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              {stats.totalPassages}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/50">
              teks rujukan
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">1 wacana multi-soal</p>
        </div>

        {/* Metric 3: Total Kategori */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori Materi</span>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/60 group-hover:scale-105 transition-transform duration-200">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              {stats.totalCategories}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/50">
              rumpun
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">Pemahaman & Literasi</p>
        </div>

        {/* Metric 4: Total Percobaan Quiz */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kuis Selesai</span>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60 group-hover:scale-105 transition-transform duration-200">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              {stats.totalQuizzes}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/50">
              tercatat
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">Riwayat pengerjaan siswa</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Aksi Cepat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <button
            onClick={onOpenCreateQuestion}
            className="h-full flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-200 shadow-xs">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">
                Tambah Soal
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-snug line-clamp-1">Input pertanyaan & opsi A–E</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('questions')}
            className="h-full flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/60 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105 transition-all duration-200 shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm">
                Kelola Soal
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-snug line-clamp-1">Edit, filter & cari bank soal</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('passages')}
            className="h-full flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100/60 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-105 transition-all duration-200 shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors text-sm">
                Kelola Bacaan
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-snug line-clamp-1">Input wacana referensi</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            className="h-full flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 to-orange-50/80 border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-200 shadow-xs">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors text-sm">
                Mulai Quiz
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-snug line-clamp-1">Mode simulasi interaktif</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recently Added Questions Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Soal Terbaru</h3>
            <p className="text-xs text-slate-500 mt-0.5">Daftar 5 soal yang terakhir ditambahkan ke sistem</p>
          </div>
          <button
            onClick={() => onNavigate('questions')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition group"
          >
            <span>Lihat Semua Soal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {stats.recentQuestions.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            Belum ada soal tersimpan. Silakan tambah soal baru.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {stats.recentQuestions.map((q: Question, idx: number) => (
              <div key={q.id} className="py-4 sm:py-4.5 flex items-start justify-between gap-4 hover:bg-slate-50/60 -mx-3 px-3 rounded-xl transition-colors">
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-200/70 shadow-xs">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-relaxed">
                      {q.question}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold">
                        {q.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-semibold capitalize border ${
                          q.difficulty === 'mudah'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                            : q.difficulty === 'sedang'
                            ? 'bg-amber-50 text-amber-700 border-amber-200/70'
                            : 'bg-rose-50 text-rose-700 border-rose-200/70'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60 font-medium">
                        Kunci: <strong className="text-slate-800">{q.correctAnswer}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 pt-0.5">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold border ${
                      q.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {q.status === 'published' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
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
