export type QuestionType = 'pg' | 'pgk_kategori' | 'pgk_mcma';

export interface QuestionMetadata {
  noSoal?: number | string;
  kompetensi: string;         // Contoh: "Pemahaman Tekstual", "Evaluasi dan Apresiasi"
  subKompetensi: string;      // Rincian sub kompetensi
  bentukSoal: string;         // Contoh: "Pilihan Ganda (PG)", "PGK Kategori", "PGK MCMA"
}

// Untuk PGK Kategori (Tabel pernyataan dengan pilihan Benar/Salah atau Tepat/Tidak Tepat)
export interface CategoryStatement {
  id: string; // misal 'A', 'B', 'C'
  statement: string;
  correctValue: string; // misal 'Tepat' | 'Tidak Tepat' atau 'Benar' | 'Salah'
}

export interface Question {
  id: string;
  type: QuestionType;
  metadata: QuestionMetadata;
  passageId?: string;
  stimulusText?: string;       // Teks wacana/stimulus langsung jika melekat pada soal
  question: string;
  
  // Tipe PG biasa (Single Choice A-E)
  options?: { [key: string]: string };
  correctAnswer?: 'A' | 'B' | 'C' | 'D' | 'E';
  
  // Tipe PGK MCMA (Pilihan ganda kompleks > 1 jawaban benar)
  mcmaOptions?: { [key: string]: string };
  mcmaCorrectAnswers?: string[]; // Contoh: ['B', 'C', 'E']
  
  // Tipe PGK Kategori (Tabel Benar/Salah atau Tepat/Tidak Tepat)
  categoryColumns?: string[];    // Contoh: ['Tepat', 'Tidak Tepat'] atau ['Benar', 'Salah']
  categoryStatements?: CategoryStatement[];
  
  explanation: string;
  category: string;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Passage {
  id: string;
  title: string;
  content: string;
  category: string;
  source?: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'teacher' | 'student';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface QuizAnswerRecord {
  questionId: string;
  type?: QuestionType;
  selectedAnswer?: string; // For PG, e.g. 'A'
  selectedMcma?: string[]; // For PGK MCMA, e.g. ['B', 'C', 'E']
  selectedCategory?: { [statementId: string]: string }; // For PGK Kategori
  correctAnswer?: string;
  isCorrect: boolean;
}

export interface QuizResult {
  id: string;
  date: string;
  studentUid?: string;
  studentEmail?: string;
  studentName: string;
  passageId?: string;
  passageTitle?: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  percentage: number;
  answers: QuizAnswerRecord[];
}

export type ViewMode = 'dashboard' | 'questions' | 'passages' | 'quiz' | 'results';
