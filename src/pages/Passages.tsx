import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Plus,
  BookOpen,
  Eye,
  Edit2,
  Trash2,
  HelpCircle,
  Calendar,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Passage, Question } from '../types';
import { storageService, STORAGE_EVENT_KEY } from '../services/storageService';
import { PassageFormModal } from '../components/PassageFormModal';
import { PassageDetailModal } from '../components/PassageDetailModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { useToast } from '../components/Toast';

interface PassagesProps {
  initialCreateOpen?: boolean;
  onViewQuestion?: (question: Question) => void;
}

export const Passages: React.FC<PassagesProps> = ({
  initialCreateOpen = false,
  onViewQuestion,
}) => {
  const { showToast } = useToast();
  const [passages, setPassages] = useState<Passage[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals
  const [formOpen, setFormOpen] = useState(initialCreateOpen);
  const [editingPassage, setEditingPassage] = useState<Passage | null>(null);
  const [viewingPassage, setViewingPassage] = useState<Passage | null>(null);
  const [deletingPassage, setDeletingPassage] = useState<Passage | null>(null);

  const loadData = () => {
    setPassages(storageService.getPassages());
    setQuestions(storageService.getQuestions());
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = () => loadData();
    window.addEventListener(STORAGE_EVENT_KEY, handleStorageChange);
    return () => window.removeEventListener(STORAGE_EVENT_KEY, handleStorageChange);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    passages.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [passages]);

  const filteredPassages = useMemo(() => {
    return passages.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' || p.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [passages, searchQuery, selectedCategory, selectedStatus]);

  const handleDeleteConfirm = () => {
    if (!deletingPassage) return;
    const success = storageService.deletePassage(deletingPassage.id);
    if (success) {
      showToast('Wacana bacaan berhasil dihapus', 'success');
    } else {
      showToast('Gagal menghapus wacana', 'error');
    }
    setDeletingPassage(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-purple-600" />
            Kelola Wacana & Teks Bacaan
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Modul bacaan pemahaman tekstual TKA. Satu wacana dapat dihubungkan ke berbagai pertanyaan.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingPassage(null);
            setFormOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Wacana Baru</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul atau isi paragraf wacana..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="all">Semua Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Passages Grid Cards */}
      {filteredPassages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Tidak ada wacana ditemukan</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Coba bersihkan filter pencarian atau tambahkan wacana teks baru untuk soal TKA.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredPassages.map((passage) => {
            const linkedQuestionsCount = questions.filter((q) => q.passageId === passage.id).length;
            const previewText = passage.content.split('\n')[0] || passage.content;

            return (
              <div
                key={passage.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col p-5 group"
              >
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                        {passage.id}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {passage.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition line-clamp-1">
                      {passage.title}
                    </h3>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${
                      passage.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {passage.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Excerpt */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 font-serif leading-relaxed line-clamp-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100 italic">
                  "{previewText}..."
                </p>

                {/* Card Footer Info */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{linkedQuestionsCount} Soal Terhubung</span>
                  </div>

                  {passage.source && (
                    <span className="truncate max-w-[180px] text-slate-400">
                      {passage.source}
                    </span>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setViewingPassage(passage)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Wacana</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingPassage(passage);
                      setFormOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeletingPassage(passage)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Form Modal */}
      <PassageFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingPassage(null);
        }}
        passageToEdit={editingPassage}
        onSuccess={loadData}
      />

      {/* Detail Modal */}
      <PassageDetailModal
        isOpen={!!viewingPassage}
        onClose={() => setViewingPassage(null)}
        passage={viewingPassage}
        onEdit={(p) => {
          setViewingPassage(null);
          setEditingPassage(p);
          setFormOpen(true);
        }}
        onViewQuestion={onViewQuestion}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deletingPassage}
        title="Hapus Wacana Teks"
        message="Apakah Anda yakin ingin menghapus wacana bacaan ini? Soal yang terhubung dengan wacana ini akan tetap ada namun status tautan wacananya akan dikosongkan."
        confirmLabel="Hapus Wacana"
        cancelLabel="Batal"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingPassage(null)}
        isDanger={true}
      />
    </div>
  );
};
