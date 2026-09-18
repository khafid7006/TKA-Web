import { SEED_PASSAGES, SEED_QUESTIONS } from '../data/seedData';
import { Passage, Question, QuizResult } from '../types';

const STORAGE_KEYS = {
  PASSAGES: 'tka_passages',
  QUESTIONS: 'tka_questions',
  RESULTS: 'tka_quiz_results',
  INITIALIZED: 'tka_initialized_v1',
};

// Event dispatched on storage mutation
export const STORAGE_EVENT_KEY = 'tka_storage_change';

function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT_KEY));
  }
}

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
    return false;
  }
}

export const storageService = {
  init(): void {
    if (typeof window === 'undefined') return;
    try {
      const isInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
      const passages = safeGet<Passage[]>(STORAGE_KEYS.PASSAGES, []);
      const questions = safeGet<Question[]>(STORAGE_KEYS.QUESTIONS, []);

      // If never initialized or empty, populate with seed data
      if (!isInit || passages.length === 0 || questions.length === 0) {
        if (passages.length === 0) safeSet(STORAGE_KEYS.PASSAGES, SEED_PASSAGES);
        if (questions.length === 0) safeSet(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
        safeSet(STORAGE_KEYS.INITIALIZED, 'true');
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or disabled, using fallback seed data.', e);
    }
  },

  resetToDefaultSeed(): void {
    safeSet(STORAGE_KEYS.PASSAGES, SEED_PASSAGES);
    safeSet(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    safeSet(STORAGE_KEYS.RESULTS, []);
    safeSet(STORAGE_KEYS.INITIALIZED, 'true');
    notifyStorageChange();
  },

  // PASSAGES
  getPassages(): Passage[] {
    this.init();
    const list = safeGet<Passage[]>(STORAGE_KEYS.PASSAGES, SEED_PASSAGES);
    return Array.isArray(list) ? list : SEED_PASSAGES;
  },

  getPassageById(id: string): Passage | undefined {
    return this.getPassages().find((p) => p.id === id);
  },

  createPassage(data: Omit<Passage, 'createdAt' | 'updatedAt'>): Passage {
    const list = this.getPassages();
    const now = new Date().toISOString();
    const newPassage: Passage = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newPassage);
    safeSet(STORAGE_KEYS.PASSAGES, list);
    notifyStorageChange();
    return newPassage;
  },

  updatePassage(id: string, updates: Partial<Passage>): Passage | null {
    const list = this.getPassages();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated: Passage = {
      ...list[index],
      ...updates,
      id: list[index].id, // preserve immutable ID
      updatedAt: new Date().toISOString(),
    };
    list[index] = updated;
    safeSet(STORAGE_KEYS.PASSAGES, list);
    notifyStorageChange();
    return updated;
  },

  deletePassage(id: string): boolean {
    const list = this.getPassages();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;

    safeSet(STORAGE_KEYS.PASSAGES, filtered);

    // Also unassign or keep questions safe when passage is deleted
    const questions = this.getQuestions();
    let questionsUpdated = false;
    const updatedQuestions = questions.map((q) => {
      if (q.passageId === id) {
        questionsUpdated = true;
        return { ...q, passageId: '' };
      }
      return q;
    });
    if (questionsUpdated) {
      safeSet(STORAGE_KEYS.QUESTIONS, updatedQuestions);
    }

    notifyStorageChange();
    return true;
  },

  // QUESTIONS
  getQuestions(): Question[] {
    this.init();
    const list = safeGet<Question[]>(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    return Array.isArray(list) ? list : SEED_QUESTIONS;
  },

  getQuestionById(id: string): Question | undefined {
    return this.getQuestions().find((q) => q.id === id);
  },

  getQuestionsByPassageId(passageId: string): Question[] {
    return this.getQuestions().filter((q) => q.passageId === passageId);
  },

  createQuestion(data: Omit<Question, 'createdAt' | 'updatedAt'>): Question {
    const list = this.getQuestions();
    const now = new Date().toISOString();
    const newQuestion: Question = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newQuestion);
    safeSet(STORAGE_KEYS.QUESTIONS, list);
    notifyStorageChange();
    return newQuestion;
  },

  updateQuestion(id: string, updates: Partial<Question>): Question | null {
    const list = this.getQuestions();
    const index = list.findIndex((q) => q.id === id);
    if (index === -1) return null;

    const updated: Question = {
      ...list[index],
      ...updates,
      id: list[index].id, // preserve immutable ID
      updatedAt: new Date().toISOString(),
    };
    list[index] = updated;
    safeSet(STORAGE_KEYS.QUESTIONS, list);
    notifyStorageChange();
    return updated;
  },

  deleteQuestion(id: string): boolean {
    const list = this.getQuestions();
    const filtered = list.filter((q) => q.id !== id);
    if (filtered.length === list.length) return false;

    safeSet(STORAGE_KEYS.QUESTIONS, filtered);
    notifyStorageChange();
    return true;
  },

  // QUIZ RESULTS
  getQuizResults(): QuizResult[] {
    this.init();
    const list = safeGet<QuizResult[]>(STORAGE_KEYS.RESULTS, []);
    return Array.isArray(list) ? list : [];
  },

  saveQuizResult(result: QuizResult): void {
    const list = this.getQuizResults();
    list.unshift(result);
    safeSet(STORAGE_KEYS.RESULTS, list);
    notifyStorageChange();
  },

  deleteQuizResult(id: string): boolean {
    const list = this.getQuizResults();
    const filtered = list.filter((r) => r.id !== id);
    if (filtered.length === list.length) return false;

    safeSet(STORAGE_KEYS.RESULTS, filtered);
    notifyStorageChange();
    return true;
  },

  clearQuizResults(): void {
    safeSet(STORAGE_KEYS.RESULTS, []);
    notifyStorageChange();
  },

  // ANALYTICS & STATS
  getStats() {
    const questions = this.getQuestions();
    const passages = this.getPassages();
    const results = this.getQuizResults();

    const categorySet = new Set<string>();
    questions.forEach((q) => q.category && categorySet.add(q.category));
    passages.forEach((p) => p.category && categorySet.add(p.category));

    const publishedQuestions = questions.filter((q) => q.status === 'published');
    const draftQuestions = questions.filter((q) => q.status === 'draft');

    return {
      totalQuestions: questions.length,
      publishedQuestions: publishedQuestions.length,
      draftQuestions: draftQuestions.length,
      totalPassages: passages.length,
      totalCategories: categorySet.size,
      totalQuizzes: results.length,
      recentQuestions: questions.slice(0, 5),
      recentResults: results.slice(0, 5),
    };
  },
};
