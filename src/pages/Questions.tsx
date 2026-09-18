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
  FileQuestion,
  BookOpen,
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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPassage, setSelectedPassage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

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
        const matchesQuery =
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.id.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === 'all' || q.category === selectedCategory;

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
          matchesDifficulty &&
          matchesStatus &&
          matchesPassage
        );
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
      });
  }, [
    questions,
    searchQuery,
    selectedCategory,
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
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Bank Soal TKA Bahasa Indonesia
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Kelola seluruh koleksi soal pilihan ganda A–E, kunci jawaban, dan status tayang
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
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan, kategori, atau ID..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Semua Tingkat</option>
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="sulit">Sulit</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
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
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
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

      {/* Questions Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FileQuestion className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Tidak ada soal yang ditemukan</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian atau bersihkan filter yang aktif.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
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
                  <th className="px-4 py-3.5 w-14 text-center">No</th>
                  <th className="px-4 py-3.5">Pertanyaan</th>
                  <th className="px-4 py-3.5">Kategori</th>
                  <th className="px-4 py-3.5">Tipe</th>
                  <th className="px-4 py-3.5 text-center">Jawaban</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right w-36">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuestions.map((q, index) => {
                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      {/* No */}
                      <td className="px-4 py-4 text-center font-semibold text-slate-500">
                        {index + 1}
                      </td>

                      {/* Pertanyaan */}
                      <td className="px-4 py-4 max-w-md">
                        <div className="font-medium text-slate-900 line-clamp-2">
                          {q.question}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                          <span className="font-mono">{q.id}</span>
                          <span>•</span>
                          <span className="capitalize">{q.difficulty}</span>
                          {q.passageId && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-blue-600 truncate max-w-[150px]">
                                <BookOpen className="w-3 h-3 shrink-0" />
                                {passages.find((p) => p.id === q.passageId)?.title || 'Wacana'}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Kategori */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                          {q.category}
                        </span>
                      </td>

                      {/* Tipe */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                        Pilihan Ganda A–E
                      </td>

                      {/* Jawaban */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                          {q.correctAnswer}
                        </span>
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
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Menampilkan <strong>{filteredQuestions.length}</strong> dari{' '}
            <strong>{questions.length}</strong> total soal
          </span>
          <span className="text-slate-400">
            Perubahan otomatis tersimpan ke basis data LocalStorage
          </span>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <QuestionFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingQuestion(null);
        }}
        questionToEdit={editingQuestion}
        onSuccess={loadData}
      />

      {/* View Detail Modal */}
      <QuestionDetailModal
        isOpen={!!viewingQuestion}
        onClose={() => setViewingQuestion(null)}
        question={viewingQuestion}
        onEdit={(q) => {
          setViewingQuestion(null);
          setEditingQuestion(q);
          setFormOpen(true);
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingQuestion}
        title="Hapus Soal"
        message="Apakah Anda yakin ingin menghapus soal ini? Tindakan ini akan menghapus soal secara permanen dari bank soal dan memperbarui statistik kuis."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingQuestion(null)}
        isDanger={true}
      />
    </div>
  );
};
