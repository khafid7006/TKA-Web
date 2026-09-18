import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Passage, Question, QuizResult } from '../types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Initialize Firestore with configured firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Authentication helper
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Error handling conforming strictly to FirestoreErrorInfo requirement
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection: client is currently offline.');
    }
    return false;
  }
}

// Collections in Firestore
export const COLLECTIONS = {
  PASSAGES: 'passages',
  QUESTIONS: 'questions',
  RESULTS: 'quiz_results',
};

// Cloud write helpers with proper error handling
export const firestoreService = {
  async savePassage(passage: Passage): Promise<void> {
    const path = `${COLLECTIONS.PASSAGES}/${passage.id}`;
    try {
      await setDoc(doc(db, COLLECTIONS.PASSAGES, passage.id), passage);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  },

  async deletePassage(id: string): Promise<void> {
    const path = `${COLLECTIONS.PASSAGES}/${id}`;
    try {
      await deleteDoc(doc(db, COLLECTIONS.PASSAGES, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  },

  async saveQuestion(question: Question): Promise<void> {
    const path = `${COLLECTIONS.QUESTIONS}/${question.id}`;
    try {
      await setDoc(doc(db, COLLECTIONS.QUESTIONS, question.id), question);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  },

  async deleteQuestion(id: string): Promise<void> {
    const path = `${COLLECTIONS.QUESTIONS}/${id}`;
    try {
      await deleteDoc(doc(db, COLLECTIONS.QUESTIONS, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  },

  async saveQuizResult(result: QuizResult): Promise<void> {
    const path = `${COLLECTIONS.RESULTS}/${result.id}`;
    try {
      await setDoc(doc(db, COLLECTIONS.RESULTS, result.id), result);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  },

  async deleteQuizResult(id: string): Promise<void> {
    const path = `${COLLECTIONS.RESULTS}/${id}`;
    try {
      await deleteDoc(doc(db, COLLECTIONS.RESULTS, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  },
};
