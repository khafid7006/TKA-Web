import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Trash2,
  HelpCircle,
  CheckCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Question, Passage } from '../types';
import { storageService, STORAGE_EVENT_KEY } from '../services/storageService';
import { QuestionFormModal } from '../components/QuestionFormModal';
import { QuestionDetailModal } from '../components/QuestionDetailModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { useToast } from '../components/Toast';

interface QuestionsProps {
  initialCreateOpen?: boolean;
}

export const Questions: React.FC<QuestionsProps> = ({ initialCreateOpen = false }) => {
  const { showToast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [passages, setPassages] = useState<Passage[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBentuk, setSelectedBentuk] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPassage, setSelectedPassage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'number' | 'newest' | 'oldest'>('number');

  // Modals
  const [formOpen, setFormOpen] = useState(initialCreateOpen);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<Question | null>(null);

  const loadData = () => {
    setQuestions(storageService.getQuestions());
    setPassages(storageService.getPassages());
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = () => loadData();
    window.addEventListener(STORAGE_EVENT_KEY, handleStorageChange);
    return () => window.removeEventListener(STORAGE_EVENT_KEY, handleStorageChange);
  }, []);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => q.category && set.add(q.category));
    return Array.from(set);
  }, [questions]);

  // Filtered & Sorted questions
  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        // Search text
        const qSub = q.metadata?.subKompetensi || '';
        const matchesQuery =
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          qSub.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.id.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === 'all' || q.category === selectedCategory;

        // Bentuk Soal filter
        const qType = q.type || 'pg';
        const matchesBentuk =
          selectedBentuk === 'all' ||
          qType === selectedBentuk ||
          q.metadata?.bentukSoal?.toLowerCase().includes(selectedBentuk.toLowerCase());

        // Difficulty filter
        const matchesDifficulty =
          selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;

        // Status filter
        const matchesStatus =
          selectedStatus === 'all' || q.status === selectedStatus;

        // Passage filter
        const matchesPassage =
          selectedPassage === 'all' || q.passageId === selectedPassage;

        return (
          matchesQuery &&
          matchesCategory &&
          matchesBentuk &&
          matchesDifficulty &&
          matchesStatus &&
          matchesPassage
        );
      })
      .sort((a, b) => {
        if (sortBy === 'number') {
          const numA = Number(a.metadata?.noSoal) || 999;
          const numB = Number(b.metadata?.noSoal) || 999;
          return numA - numB;
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
  }, [
    questions,
    searchQuery,
    selectedCategory,
    selectedBentuk,
    selectedDifficulty,
    selectedStatus,
    selectedPassage,
    sortBy,
  ]);

  const handleDeleteConfirm = () => {
    if (!deletingQuestion) return;
    const success = storageService.deleteQuestion(deletingQuestion.id);
    if (success) {
      showToast('Soal berhasil dihapus dari bank soal', 'success');
    } else {
      showToast('Gagal menghapus soal', 'error');
    }
    setDeletingQuestion(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            30 SOAL MASTER TKA 2026
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Bank Soal TKA Bahasa Indonesia
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Koleksi butir soal master TKA SMA 2026 (Pilihan Ganda, PGK Kategori, dan PGK MCMA) dengan metadata kompetensi lengkap.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingQuestion(null);
            setFormOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Soal Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan, sub-kompetensi, ID..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Bentuk Soal Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedBentuk}
              onChange={(e) => setSelectedBentuk(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
            >
              <option value="all">Semua Bentuk Soal</option>
              <option value="pg">Pilihan Ganda (PG)</option>
              <option value="pgk_kategori">PGK Kategori</option>
              <option value="pgk_mcma">PGK MCMA</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Semua Kompetensi</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Semua Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="number">Urut No. Soal (1–30)</option>
              <option value="newest">Terbaru Dibuat</option>
              <option value="oldest">Terlama Dibuat</option>
            </select>
          </div>
        </div>

        {/* Optional Passage Filter Pill row */}
        {passages.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto text-xs pb-1">
            <span className="text-slate-400 shrink-0 font-medium">Filter Wacana:</span>
            <button
              onClick={() => setSelectedPassage('all')}
              className={`px-2.5 py-1 rounded-lg shrink-0 transition ${
                selectedPassage === 'all'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Wacana
            </button>
            {passages.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPassage(p.id)}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition flex items-center gap-1.5 ${
                  selectedPassage === p.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span className="truncate max-w-[160px]">{p.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Questions Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Tidak ada soal yang cocok</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian atau bersihkan filter di atas.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedBentuk('all');
                setSelectedDifficulty('all');
                setSelectedStatus('all');
                setSelectedPassage('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 text-xs text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3.5 w-16 text-center">No</th>
                  <th className="px-4 py-3.5">Pertanyaan & Sub-Kompetensi</th>
                  <th className="px-4 py-3.5">Kompetensi</th>
                  <th className="px-4 py-3.5">Bentuk Soal</th>
                  <th className="px-4 py-3.5 text-center">Kunci</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuestions.map((q, index) => {
                  const noLabel = q.metadata?.noSoal || index + 1;
                  const type = q.type || 'pg';

                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      {/* No Soal */}
                      <td className="px-4 py-4 text-center font-bold text-slate-700">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-extrabold text-xs">
                          {noLabel}
                        </span>
                      </td>

                      {/* Pertanyaan */}
                      <td className="px-4 py-4 max-w-md">
                        <div className="font-semibold text-slate-900 line-clamp-2 leading-snug">
                          {q.question}
                        </div>
                        {q.metadata?.subKompetensi && (
                          <p className="text-xs text-slate-500 line-clamp-1 mt-1 italic">
                            {q.metadata.subKompetensi}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                          <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                            {q.id}
                          </span>
                          {q.stimulusText && (
                            <span className="text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              Ada Teks Stimulus
                            </span>
                          )}
                          {q.passageId && (
                            <span className="flex items-center gap-1 text-blue-600 truncate max-w-[150px]">
                              <BookOpen className="w-3 h-3 shrink-0" />
                              {passages.find((p) => p.id === q.passageId)?.title || 'Wacana'}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Kompetensi */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">
                          {q.metadata?.kompetensi || q.category}
                        </span>
                      </td>

                      {/* Bentuk Soal */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-bold ${
                            type === 'pgk_kategori'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : type === 'pgk_mcma'
                              ? 'bg-purple-50 text-purple-800 border border-purple-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {q.metadata?.bentukSoal || (type === 'pgk_kategori' ? 'PGK Kategori' : type === 'pgk_mcma' ? 'PGK MCMA' : 'Pilihan Ganda')}
                        </span>
                      </td>

                      {/* Jawaban */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        {type === 'pg' && (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                            {q.correctAnswer || 'A'}
                          </span>
                        )}
                        {type === 'pgk_mcma' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-purple-800 font-extrabold text-xs">
                            {q.mcmaCorrectAnswers?.join(', ') || 'Multi'}
                          </span>
                        )}
                        {type === 'pgk_kategori' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-amber-100 text-amber-800 font-bold text-xs">
                            {q.categoryStatements?.length || 3} Pernyataan
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1 ${
                            q.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {q.status === 'published' && <CheckCircle className="w-3 h-3" />}
                          {q.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewingQuestion(q)}
                            title="Lihat Detail Soal"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingQuestion(q);
                              setFormOpen(true);
                            }}
                            title="Edit Soal"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingQuestion(q)}
                            title="Hapus Soal"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer / Summary */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Menampilkan <strong>{filteredQuestions.length}</strong> dari{' '}
            <strong>{questions.length}</strong> butir soal master
          </span>
          <span className="text-slate-400">
            TKA SMA Bahasa Indonesia • Standar Pusmendik/BPPP 2026
          </span>
        </div>
      </div>

      {/* Question Detail Modal */}
      <QuestionDetailModal
        isOpen={Boolean(viewingQuestion)}
        onClose={() => setViewingQuestion(null)}
        question={viewingQuestion}
        onEdit={(q) => {
          setViewingQuestion(null);
          setEditingQuestion(q);
          setFormOpen(true);
        }}
      />

      {/* Question Form Modal (Create / Edit) */}
      <QuestionFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingQuestion(null);
        }}
        questionToEdit={editingQuestion}
        onSuccess={() => loadData()}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingQuestion)}
        onCancel={() => setDeletingQuestion(null)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Butir Soal"
        message={`Apakah Anda yakin ingin menghapus soal "${deletingQuestion?.question.slice(0, 80)}..."? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus Soal"
        cancelLabel="Batal"
        isDanger={true}
      />
    </div>
  );
};
