import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Passage } from '../types';
import { storageService } from '../services/storageService';
import { useToast } from './Toast';

interface PassageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  passageToEdit?: Passage | null;
  onSuccess: () => void;
}

export const PassageFormModal: React.FC<PassageFormModalProps> = ({
  isOpen,
  onClose,
  passageToEdit,
  onSuccess,
}) => {
  const { showToast } = useToast();

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Pemahaman Tekstual');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      if (passageToEdit) {
        setId(passageToEdit.id);
        setTitle(passageToEdit.title);
        setContent(passageToEdit.content);
        setCategory(passageToEdit.category);
        setSource(passageToEdit.source || '');
        setStatus(passageToEdit.status);
      } else {
        const newId = `passage-${Date.now().toString().slice(-5)}`;
        setId(newId);
        setTitle('');
        setContent('');
        setCategory('Pemahaman Tekstual');
        setSource('');
        setStatus('published');
      }
    }
  }, [isOpen, passageToEdit]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!id.trim()) errs.id = 'ID Wacana wajib diisi.';
    if (!title.trim()) errs.title = 'Judul wacana/bacaan wajib diisi.';
    if (!content.trim()) errs.content = 'Isi wacana teks wajib diisi.';
    if (!category.trim()) errs.category = 'Kategori wacana wajib diisi.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Mohon lengkapi kolom yang wajib diisi', 'error');
      return;
    }

    const payload = {
      id: id.trim(),
      title: title.trim(),
      content: content.trim(),
      category: category.trim(),
      source: source.trim() || undefined,
      status,
    };

    if (passageToEdit) {
      storageService.updatePassage(passageToEdit.id, payload);
      showToast('Wacana bacaan berhasil diperbarui', 'success');
    } else {
      if (storageService.getPassageById(payload.id)) {
        setErrors((prev) => ({ ...prev, id: 'ID Wacana sudah digunakan. Gunakan ID lain.' }));
        showToast('ID Wacana sudah ada di sistem', 'error');
        return;
      }
      storageService.createPassage(payload);
      showToast('Wacana baru berhasil ditambahkan', 'success');
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {passageToEdit ? 'Edit Wacana Bacaan' : 'Tambah Wacana Baru'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Teks wacana untuk rujukan pemahaman membaca soal TKA
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ID Wacana <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={!!passageToEdit}
                placeholder="misal: passage-1"
                className={`w-full px-3.5 py-2 rounded-xl border ${
                  errors.id ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500`}
              />
              {errors.id && <p className="text-xs text-rose-600 mt-1">{errors.id}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori Wacana <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="misal: Pemahaman Tekstual"
                className={`w-full px-3.5 py-2 rounded-xl border ${
                  errors.category ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.category && <p className="text-xs text-rose-600 mt-1">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Wacana <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="misal: Ancaman Sampah Plastik terhadap Ekosistem Laut"
              className={`w-full px-3.5 py-2 rounded-xl border ${
                errors.title ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && <p className="text-xs text-rose-600 mt-1">{errors.title}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Isi Paragraf Teks Wacana <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-400">Gunakan baris baru (Enter) antar paragraf</span>
            </div>
            <textarea
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan atau tempel teks wacana di sini..."
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                errors.content ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              } text-slate-800 font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.content && <p className="text-xs text-rose-600 mt-1">{errors.content}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sumber / Penulis (Opsional)
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="misal: Modul TKA Bahasa Indonesia 2026"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Wacana
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="published">Published (Dapat Digunakan)</option>
                <option value="draft">Draft (Arsip)</option>
              </select>
            </div>
          </div>

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
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition shadow-sm"
            >
              {passageToEdit ? 'Simpan Perubahan' : 'Simpan Wacana'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
