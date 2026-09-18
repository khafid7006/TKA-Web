import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { ToastProvider } from './components/Toast';
import { FirebaseProvider, useFirebase } from './context/FirebaseContext';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Questions } from './pages/Questions';
import { Passages } from './pages/Passages';
import { Quiz } from './pages/Quiz';
import { Results } from './pages/Results';
import { QuestionFormModal } from './components/QuestionFormModal';
import { PassageFormModal } from './components/PassageFormModal';
import { GraduationCap, School } from 'lucide-react';

function MainApp() {
  const { user, isAuthReady, isTeacher, isStudent } = useFirebase();
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [quickCreateQuestionOpen, setQuickCreateQuestionOpen] = useState(false);
  const [quickCreatePassageOpen, setQuickCreatePassageOpen] = useState(false);

  // Automatic routing based on role when auth state is resolved
  useEffect(() => {
    if (!user) return;

    if (isStudent) {
      // Students must be redirected to Quiz if attempting to view teacher-only views
      if (currentView !== 'quiz' && currentView !== 'results') {
        setCurrentView('quiz');
      }
    }
  }, [user, isStudent, currentView]);

  // Handle navigation with strict role enforcement
  const handleNavigate = (view: ViewMode) => {
    if (isStudent && view !== 'quiz' && view !== 'results') {
      setCurrentView('quiz');
      return;
    }
    setCurrentView(view);
  };

  // Loading state while auth is determining session
  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#244685] to-[#2a5298] flex items-center justify-center text-white p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
            <GraduationCap className="w-8 h-8 text-amber-300" />
          </div>
          <div className="w-6 h-6 border-2 border-white/30 border-t-amber-300 rounded-full animate-spin mt-2" />
          <p className="text-xs text-blue-200 font-semibold tracking-wider uppercase mt-1">
            Memuat Sistem TKA SMA 2026...
          </p>
        </div>
      </div>
    );
  }

  // Unauthenticated users see the landing & authentication page
  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      {/* Navigation Bar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      {currentView === 'quiz' ? (
        <main className="flex-1 w-full">
          <Quiz onNavigate={handleNavigate} />
        </main>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {/* Teacher-only views with safety guard */}
          {currentView === 'dashboard' && isTeacher && (
            <Dashboard
              onNavigate={handleNavigate}
              onOpenCreateQuestion={() => setQuickCreateQuestionOpen(true)}
              onOpenCreatePassage={() => setQuickCreatePassageOpen(true)}
            />
          )}

          {currentView === 'questions' && isTeacher && (
            <Questions initialCreateOpen={false} />
          )}

          {currentView === 'passages' && isTeacher && (
            <Passages initialCreateOpen={false} />
          )}

          {/* Results view (accessible by both, with role filtering inside) */}
          {currentView === 'results' && (
            <Results onNavigate={handleNavigate} />
          )}
        </main>
      )}

      {/* Global Quick Modals triggered from Dashboard (Teacher only) */}
      {isTeacher && (
        <>
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
        </>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            SOAL TKA SMA BAHASA INDONESIA 2026 — Sistem Pembelajaran & Manajemen Bank Soal
          </span>
          <div className="flex items-center gap-2.5 text-slate-400 text-[11px]">
            {isTeacher ? (
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <School className="w-3 h-3" /> Mode Guru (Akses Penuh)
              </span>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <GraduationCap className="w-3 h-3" /> Mode Siswa (Peserta Kuis)
              </span>
            )}
            <span>•</span>
            <span className="text-blue-600 font-medium">Cloud: Firebase Firestore</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <ToastProvider>
        <MainApp />
      </ToastProvider>
    </FirebaseProvider>
  );
}
