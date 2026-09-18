import React, { useState } from 'react';
import { ViewMode, Question, Passage } from './types';
import { Navbar } from './components/Navbar';
import { ToastProvider } from './components/Toast';
import { Dashboard } from './pages/Dashboard';
import { Questions } from './pages/Questions';
import { Passages } from './pages/Passages';
import { Quiz } from './pages/Quiz';
import { Results } from './pages/Results';
import { QuestionFormModal } from './components/QuestionFormModal';
import { PassageFormModal } from './components/PassageFormModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [quickCreateQuestionOpen, setQuickCreateQuestionOpen] = useState(false);
  const [quickCreatePassageOpen, setQuickCreatePassageOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
        {/* Navigation Bar */}
        <Navbar currentView={currentView} onNavigate={setCurrentView} />

        {/* Main Content Area */}
        {currentView === 'quiz' ? (
          // In Student Quiz mode, we render the full authentic purple canvas interface
          <main className="flex-1 w-full">
            <Quiz onNavigate={setCurrentView} />
          </main>
        ) : (
          // In Admin CMS modes (Dashboard, Bank Soal, Kelola Bacaan, Hasil Quiz)
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {currentView === 'dashboard' && (
              <Dashboard
                onNavigate={setCurrentView}
                onOpenCreateQuestion={() => setQuickCreateQuestionOpen(true)}
                onOpenCreatePassage={() => setQuickCreatePassageOpen(true)}
              />
            )}

            {currentView === 'questions' && (
              <Questions initialCreateOpen={false} />
            )}

            {currentView === 'passages' && (
              <Passages initialCreateOpen={false} />
            )}

            {currentView === 'results' && (
              <Results onNavigate={setCurrentView} />
            )}
          </main>
        )}

        {/* Global Quick Modals triggered from Dashboard */}
        <QuestionFormModal
          isOpen={quickCreateQuestionOpen}
          onClose={() => setQuickCreateQuestionOpen(false)}
          onSuccess={() => {}}
        />

        <PassageFormModal
          isOpen={quickCreatePassageOpen}
          onClose={() => setQuickCreatePassageOpen(false)}
          onSuccess={() => {}}
        />

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200/80 py-4 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              SOAL TKA SMA BAHASA INDONESIA 2026 — Sistem Pembelajaran & Manajemen Bank Soal
            </span>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Penyimpanan: LocalStorage</span>
              <span>•</span>
              <span>Pilihan Ganda A–E</span>
            </div>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
