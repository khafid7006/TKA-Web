import React, { useState } from 'react';
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Award,
  Menu,
  X,
  RotateCcw,
  Cloud,
  LogOut,
  User as UserIcon,
  School,
  Sparkles,
} from 'lucide-react';
import { ViewMode } from '../types';
import { storageService } from '../services/storageService';
import { useToast } from './Toast';
import { useFirebase } from '../context/FirebaseContext';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showToast } = useToast();
  const { user, userProfile, isTeacher, isStudent, logout } = useFirebase();

  // Role-based navigation items
  const navItems: { id: ViewMode; label: string; icon: React.FC<{ className?: string }> }[] = isTeacher
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'questions', label: 'Bank Soal', icon: HelpCircle },
        { id: 'passages', label: 'Kelola Bacaan', icon: BookOpen },
        { id: 'quiz', label: 'Pratinjau Kuis', icon: GraduationCap },
        { id: 'results', label: 'Hasil Quiz Siswa', icon: Award },
      ]
    : [
        { id: 'quiz', label: 'Mulai Quiz', icon: GraduationCap },
        { id: 'results', label: 'Riwayat Nilai Saya', icon: Award },
      ];

  const handleResetData = () => {
    if (!isTeacher) return;
    if (window.confirm('Reset semua data ke soal & bacaan awal bawaan COBA.html?')) {
      storageService.resetToDefaultSeed();
      showToast('Data berhasil di-reset ke pengaturan awal', 'info');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Berhasil keluar dari akun', 'info');
    } catch (e) {
      showToast('Gagal keluar', 'error');
    }
  };

  const displayName = userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'Pengguna';

  return (
    <header className="bg-gradient-to-r from-[#1e3c72] via-[#244685] to-[#2a5298] text-white shadow-md sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand (Kiri) */}
          <div
            onClick={() => onNavigate(isTeacher ? 'dashboard' : 'quiz')}
            className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-105 group-hover:bg-white/15 transition-all shadow-inner">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>TKA BAHASA INDONESIA</span>
                <span className="text-[11px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md shadow-xs">
                  2026
                </span>
              </h1>
              <div className="flex items-center gap-2 text-xs text-blue-200/90 hidden sm:flex mt-0.5">
                <span>{isTeacher ? 'Portal Guru & Pembuat Soal' : 'Simulasi Ujian Siswa'}</span>
                <span className="text-blue-300/60">•</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  <Cloud className="w-3 h-3 text-emerald-400" />
                  <span>Cloud Sync</span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Tengah) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const isPrimary = item.id === 'quiz';

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? isPrimary && isStudent
                        ? 'bg-amber-400 text-slate-950 shadow-md font-bold ring-2 ring-amber-300/60'
                        : 'bg-white text-[#1e3c72] shadow-sm font-bold border border-white/80'
                      : isPrimary && isStudent
                      ? 'bg-amber-400/20 text-amber-200 hover:bg-amber-400/30 border border-amber-300/40'
                      : 'text-blue-100/90 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile & Aksi (Kanan) */}
          <div className="hidden md:flex items-center gap-3">
            {/* User Profile Card */}
            <div className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 py-1.5 px-3.5 rounded-xl text-xs border border-white/15 transition backdrop-blur-sm shadow-inner">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-7 h-7 rounded-lg ring-1 ring-white/30 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-blue-400/20 flex items-center justify-center text-blue-200 border border-white/20">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
              <div className="flex flex-col text-left leading-tight">
                <span className="max-w-[130px] truncate font-bold text-white text-xs">
                  {displayName}
                </span>
                <span className="mt-0.5">
                  {isTeacher ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/25 text-amber-300 font-extrabold text-[10px] tracking-wider border border-amber-300/30">
                      <School className="w-2.5 h-2.5" /> GURU
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-400/25 text-emerald-300 font-extrabold text-[10px] tracking-wider border border-emerald-300/30">
                      <GraduationCap className="w-2.5 h-2.5" /> SISWA
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Pemisah Vertikal Tipis */}
            <div className="h-7 w-[1px] bg-white/20" aria-hidden="true" />

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              {/* Reset button only for teachers */}
              {isTeacher && (
                <button
                  onClick={handleResetData}
                  title="Reset data ke bawaan COBA.html"
                  className="p-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition border border-transparent hover:border-white/10"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              {/* Logout button */}
              <button
                onClick={handleLogout}
                title="Keluar dari Akun"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-blue-200 hover:text-rose-200 hover:bg-rose-500/20 transition text-xs font-semibold border border-transparent hover:border-rose-400/30"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Keluar</span>
              </button>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('quiz')}
              className="px-2.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Quiz</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#162e58] border-t border-white/10 px-4 py-3 space-y-2">
          {/* User info */}
          <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-7 h-7 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-400/30 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-blue-200" />
                </div>
              )}
              <div>
                <div className="font-bold text-white text-xs">{displayName}</div>
                <div className="text-[11px]">
                  {isTeacher ? (
                    <span className="text-amber-300 font-bold">Guru / Pembuat Soal</span>
                  ) : (
                    <span className="text-emerald-300 font-bold">Siswa / Peserta Kuis</span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs flex items-center gap-1 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-white text-[#1e3c72]'
                      : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {isTeacher && (
            <div className="pt-2 border-t border-white/10 mt-2 flex justify-between items-center text-xs text-blue-200">
              <span className="flex items-center gap-1 text-emerald-300">
                <Cloud className="w-3.5 h-3.5" />
                Firestore Aktif
              </span>
              <button
                onClick={() => {
                  handleResetData();
                  setMobileMenuOpen(false);
                }}
                className="text-amber-300 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Bawaan
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
