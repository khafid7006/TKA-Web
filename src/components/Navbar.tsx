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
} from 'lucide-react';
import { ViewMode } from '../types';
import { storageService } from '../services/storageService';
import { useToast } from './Toast';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showToast } = useToast();

  const navItems: { id: ViewMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'questions', label: 'Bank Soal', icon: HelpCircle },
    { id: 'passages', label: 'Kelola Bacaan', icon: BookOpen },
    { id: 'quiz', label: 'Kuis Siswa', icon: GraduationCap },
    { id: 'results', label: 'Hasil Quiz', icon: Award },
  ];

  const handleResetData = () => {
    if (window.confirm('Reset semua data ke soal & bacaan awal bawaan COBA.html?')) {
      storageService.resetToDefaultSeed();
      showToast('Data berhasil di-reset ke pengaturan awal', 'info');
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#1e3c72] via-[#244685] to-[#2a5298] text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform shadow-inner">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                TKA BAHASA INDONESIA
                <span className="text-xs bg-amber-400/90 text-slate-950 font-extrabold px-1.5 py-0.5 rounded-sm">
                  2026
                </span>
              </h1>
              <p className="text-xs text-blue-200 hidden sm:block">
                Sistem Manajemen Bank Soal & Kuis Pemahaman Tekstual
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const isQuiz = item.id === 'quiz';

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all ${
                    isActive
                      ? isQuiz
                        ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                        : 'bg-white text-[#1e3c72] shadow-md'
                      : isQuiz
                      ? 'bg-white/15 text-amber-200 hover:bg-white/25 border border-amber-300/30'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Quick reset button */}
            <button
              onClick={handleResetData}
              title="Reset data ke bawaan COBA.html"
              className="ml-2 p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </nav>

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
        <div className="md:hidden bg-[#162e58] border-t border-white/10 px-4 py-3 space-y-1">
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
          <div className="pt-2 border-t border-white/10 mt-2 flex justify-between items-center text-xs text-blue-200">
            <span>Basis Data: LocalStorage</span>
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
        </div>
      )}
    </header>
  );
};
