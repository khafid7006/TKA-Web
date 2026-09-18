import { SEED_PASSAGES, SEED_QUESTIONS } from '../data/seedData';
import { Passage, Question, QuizResult } from '../types';
import { firestoreService } from './firebase';

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

    // Sync seed passages and questions to Firestore
    SEED_PASSAGES.forEach((p) => firestoreService.savePassage(p).catch(() => {}));
    SEED_QUESTIONS.forEach((q) => firestoreService.saveQuestion(q).catch(() => {}));
  },

  // Cloud sync callbacks
  syncFromCloudPassages(cloudPassages: Passage[]) {
    safeSet(STORAGE_KEYS.PASSAGES, cloudPassages);
    notifyStorageChange();
  },

  syncFromCloudQuestions(cloudQuestions: Question[]) {
    safeSet(STORAGE_KEYS.QUESTIONS, cloudQuestions);
    notifyStorageChange();
  },

  syncFromCloudResults(cloudResults: QuizResult[]) {
    safeSet(STORAGE_KEYS.RESULTS, cloudResults);
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

    // Sync to Firestore
    firestoreService.savePassage(newPassage).catch((err) => {
      console.warn('Firestore write passage warning:', err);
    });

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

    // Sync to Firestore
    firestoreService.savePassage(updated).catch((err) => {
      console.warn('Firestore update passage warning:', err);
    });

    return updated;
  },

  deletePassage(id: string): boolean {
    const list = this.getPassages();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;

    safeSet(STORAGE_KEYS.PASSAGES, filtered);

    // Also unassign questions referencing this passage
    const questions = this.getQuestions();
    let questionsUpdated = false;
    const updatedQuestions = questions.map((q) => {
      if (q.passageId === id) {
        questionsUpdated = true;
        const modified = { ...q, passageId: '' };
        firestoreService.saveQuestion(modified).catch(() => {});
        return modified;
      }
      return q;
    });
    if (questionsUpdated) {
      safeSet(STORAGE_KEYS.QUESTIONS, updatedQuestions);
    }

    notifyStorageChange();

    // Delete in Firestore
    firestoreService.deletePassage(id).catch((err) => {
      console.warn('Firestore delete passage warning:', err);
    });

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

    // Sync to Firestore
    firestoreService.saveQuestion(newQuestion).catch((err) => {
      console.warn('Firestore write question warning:', err);
    });

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

    // Sync to Firestore
    firestoreService.saveQuestion(updated).catch((err) => {
      console.warn('Firestore update question warning:', err);
    });

    return updated;
  },

  deleteQuestion(id: string): boolean {
    const list = this.getQuestions();
    const filtered = list.filter((q) => q.id !== id);
    if (filtered.length === list.length) return false;

    safeSet(STORAGE_KEYS.QUESTIONS, filtered);
    notifyStorageChange();

    // Delete in Firestore
    firestoreService.deleteQuestion(id).catch((err) => {
      console.warn('Firestore delete question warning:', err);
    });

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

    // Sync to Firestore
    firestoreService.saveQuizResult(result).catch((err) => {
      console.warn('Firestore write quiz result warning:', err);
    });
  },

  deleteQuizResult(id: string): boolean {
    const list = this.getQuizResults();
    const filtered = list.filter((r) => r.id !== id);
    if (filtered.length === list.length) return false;

    safeSet(STORAGE_KEYS.RESULTS, filtered);
    notifyStorageChange();

    // Delete in Firestore
    firestoreService.deleteQuizResult(id).catch((err) => {
      console.warn('Firestore delete quiz result warning:', err);
    });

    return true;
  },

  clearQuizResults(): void {
    const results = this.getQuizResults();
    safeSet(STORAGE_KEYS.RESULTS, []);
    notifyStorageChange();

    // Delete all from Firestore
    results.forEach((r) => firestoreService.deleteQuizResult(r.id).catch(() => {}));
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
