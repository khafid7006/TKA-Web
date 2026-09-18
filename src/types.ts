export interface Question {
  id: string;
  passageId: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation?: string;
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
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
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
