import React, { useState } from 'react';
import {
  GraduationCap,
  School,
  User as UserIcon,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useToast } from '../components/Toast';
import { formatAuthErrorMessage } from '../services/firebase';
import { UserRole } from '../types';

export const LandingPage: React.FC = () => {
  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useFirebase();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setErrorMessage('Harap masukkan nama lengkap Anda.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal terdiri dari 6 karakter.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email.trim(), password);
        showToast('Berhasil masuk! Selamat datang.', 'success');
      } else {
        await registerWithEmail(name.trim(), email.trim(), password, role);
        showToast(`Pendaftaran berhasil sebagai ${role === 'teacher' ? 'Guru' : 'Siswa'}!`, 'success');
      }
    } catch (err: unknown) {
      console.error('Auth error:', err);
      const msg = formatAuthErrorMessage(err);
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await loginWithGoogle();
      showToast('Berhasil masuk dengan Google!', 'success');
    } catch (err: unknown) {
      console.error('Google login error:', err);
      const msg = formatAuthErrorMessage(err);
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#244685] to-[#2a5298] text-white flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Top Banner / Hero Header */}
      <div className="max-w-4xl mx-auto w-full text-center pt-4 pb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mb-4 text-amber-300">
          <GraduationCap className="w-9 h-9" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase">
          SOAL TKA SMA BAHASA INDONESIA 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-blue-100/90 max-w-xl mx-auto font-medium">
          Sistem Pembelajaran, Bank Soal Terstandar, & Simulasi Kuis Pemahaman Teks
        </p>

        {/* Feature Highlights Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-blue-200">
          <span className="bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/15">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            Teks Wacana Kontekstual
          </span>
          <span className="bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Pilihan Ganda 5 Opsi (A–E)
          </span>
          <span className="bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/15">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            Evaluasi Nilai & Pembahasan
          </span>
        </div>
      </div>

      {/* Auth Card Container */}
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden text-slate-800 border border-white/20 my-auto">
        {/* Tab Toggle: Masuk vs Daftar */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`py-2.5 text-sm font-bold rounded-2xl transition-all duration-200 ${
              mode === 'login'
                ? 'bg-white text-[#1e3c72] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage('');
            }}
            className={`py-2.5 text-sm font-bold rounded-2xl transition-all duration-200 ${
              mode === 'register'
                ? 'bg-white text-[#1e3c72] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Daftar Akun
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div className="text-center mb-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              {mode === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {mode === 'login'
                ? 'Gunakan email dan kata sandi yang telah terdaftar'
                : 'Pilih peran Anda untuk mendapatkan hak akses yang sesuai'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <div className="space-y-1.5 flex-1">
                <p className="font-semibold leading-relaxed">{errorMessage}</p>

                {/* Guide for Authorized Domains */}
                {errorMessage.includes('Authorized Domains') && (
                  <div className="mt-2 p-2.5 bg-white/95 border border-rose-200/80 rounded-xl text-[11px] text-slate-700 leading-relaxed shadow-sm">
                    <span className="font-bold text-rose-700 block mb-1">
                      Panduan Authorized Domains (Project: tka-5a95c):
                    </span>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
                      <li>Buka project <strong>tka-5a95c</strong> di Firebase Console.</li>
                      <li>Masuk ke menu <strong>Build &rarr; Authentication</strong>.</li>
                      <li>Pilih tab <strong>Settings</strong> &rarr; klik <strong>Authorized domains</strong>.</li>
                      <li>Klik tombol <strong>Add domain</strong>.</li>
                      <li>Ketik <code>tka-web-three.vercel.app</code> lalu klik <strong>Save</strong>.</li>
                    </ol>
                  </div>
                )}

                {/* Guide for Disabled Providers */}
                {errorMessage.includes('Provider login') && (
                  <div className="mt-2 p-2.5 bg-white/95 border border-amber-200/80 rounded-xl text-[11px] text-slate-700 leading-relaxed shadow-sm">
                    <span className="font-bold text-amber-800 block mb-1">
                      Panduan Mengaktifkan Provider (Project: tka-5a95c):
                    </span>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
                      <li>Buka project <strong>tka-5a95c</strong> di Firebase Console.</li>
                      <li>Masuk ke menu <strong>Build &rarr; Authentication</strong>.</li>
                      <li>Pilih tab <strong>Sign-in method</strong>.</li>
                      <li>Aktifkan penyedia <strong>Email/Password</strong> dan <strong>Google</strong>.</li>
                      <li>Simpan perubahan lalu coba masuk kembali.</li>
                    </ol>
                  </div>
                )}

                {/* Guide for API Key Setup */}
                {errorMessage.includes('API Key') && (
                  <div className="mt-2 p-2.5 bg-white/95 border border-blue-200/80 rounded-xl text-[11px] text-slate-700 leading-relaxed shadow-sm">
                    <span className="font-bold text-blue-800 block mb-1">
                      Pengisian Kredensial Web App Firebase (Project: tka-5a95c):
                    </span>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
                      <li>Buka project <strong>tka-5a95c</strong> di Firebase Console &rarr; <strong>Project settings</strong>.</li>
                      <li>Pada bagian <em>Your apps</em>, salin <code>apiKey</code>, <code>appId</code>, dan <code>messagingSenderId</code>.</li>
                      <li>Tempel nilai tersebut ke dalam file <code>firebase-applet-config.json</code> atau environment variable Vercel.</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Registration Extra Fields: Name & Role */}
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Role Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pilih Peran Akun
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                      role === 'student'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-400/50'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <GraduationCap className={`w-4 h-4 ${role === 'student' ? 'text-blue-600' : 'text-slate-400'}`} />
                      {role === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <span className="font-bold text-xs">Siswa</span>
                    <span className="text-[11px] text-slate-500 leading-tight">
                      Kerjakan kuis & lihat nilai
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                      role === 'teacher'
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-400/50'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <School className={`w-4 h-4 ${role === 'teacher' ? 'text-indigo-600' : 'text-slate-400'}`} />
                      {role === 'teacher' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                    </div>
                    <span className="font-bold text-xs">Guru</span>
                    <span className="text-[11px] text-slate-500 leading-tight">
                      Kelola bank soal & wacana
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sekolah.sch.id"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#1e3c72] to-[#2a5298] hover:from-[#17305c] hover:to-[#22437c] text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Masuk ke Sistem' : 'Daftar Sekarang'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Secondary Divider */}
          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative px-3 bg-white text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              atau
            </span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 transition flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Masuk Cepat dengan Akun Google</span>
          </button>
        </form>
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-blue-200/80 mt-6 max-w-lg mx-auto">
        <span>SOAL TKA SMA BAHASA INDONESIA 2026 • Kurikulum Terstandar Nasional</span>
      </div>
    </div>
  );
};
