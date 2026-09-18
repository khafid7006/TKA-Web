import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  initializeFirestore,
  doc,
  getDoc,
  getDocFromServer,
  collection,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Passage, Question, QuizResult, UserProfile, UserRole } from '../types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Initialize Firestore with configured firestoreDatabaseId and forced HTTP long-polling
// to prevent WebChannel / WebSocket transport failures in iframe and container sandbox environments.
export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
  },
  firebaseConfig.firestoreDatabaseId
);
export const auth = getAuth(app);

// Authentication helper
export const googleProvider = new GoogleAuthProvider();

export const formatAuthErrorMessage = (error: unknown): string => {
  const errCode = (error as { code?: string })?.code || '';
  const errStr = error instanceof Error ? error.message : String(error);

  if (
    errCode === 'auth/unauthorized-domain' ||
    errStr.includes('auth/unauthorized-domain') ||
    errStr.includes('unauthorized-domain')
  ) {
    return 'Domain aplikasi belum terdaftar di Firebase Authorized Domains. Harap daftarkan tka-web-three.vercel.app di Firebase Console.';
  }

  if (
    errCode === 'auth/user-not-found' ||
    errCode === 'auth/wrong-password' ||
    errCode === 'auth/invalid-credential' ||
    errStr.includes('user-not-found') ||
    errStr.includes('invalid-credential')
  ) {
    return 'Email atau kata sandi tidak sesuai.';
  }

  if (
    errCode === 'auth/email-already-in-use' ||
    errStr.includes('email-already-in-use')
  ) {
    return 'Email ini sudah terdaftar. Silakan pilih tab Masuk.';
  }

  if (
    errCode === 'auth/weak-password' ||
    errStr.includes('weak-password')
  ) {
    return 'Kata sandi terlalu lemah. Gunakan minimal 6 karakter.';
  }

  if (
    errCode === 'auth/invalid-email' ||
    errStr.includes('invalid-email')
  ) {
    return 'Format alamat email tidak valid.';
  }

  if (
    errCode === 'auth/popup-closed-by-user' ||
    errStr.includes('popup-closed-by-user')
  ) {
    return 'Jendela masuk Google ditutup sebelum proses selesai.';
  }

  if (
    errCode === 'auth/cancelled-popup-request' ||
    errStr.includes('cancelled-popup-request')
  ) {
    return 'Proses autentikasi popup dibatalkan.';
  }

  return error instanceof Error ? error.message : 'Terjadi kesalahan pada proses autentikasi.';
};

export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    const friendlyMessage = formatAuthErrorMessage(error);
    const enhancedError = new Error(friendlyMessage);
    (enhancedError as unknown as { code?: string }).code = (error as { code?: string })?.code;
    throw enhancedError;
  }
};

export const signInWithEmail = async (email: string, pass: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, pass);
  } catch (error) {
    console.error('Error signing in with email:', error);
    const friendlyMessage = formatAuthErrorMessage(error);
    const enhancedError = new Error(friendlyMessage);
    (enhancedError as unknown as { code?: string }).code = (error as { code?: string })?.code;
    throw enhancedError;
  }
};

export const registerWithEmail = async (
  name: string,
  email: string,
  pass: string,
  role: UserRole
) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      await updateProfile(cred.user, { displayName: name });
      const profile: UserProfile = {
        uid: cred.user.uid,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        createdAt: new Date().toISOString(),
      };
      await firestoreService.saveUserProfile(profile);
    }
    return cred;
  } catch (error) {
    console.error('Error registering with email:', error);
    const friendlyMessage = formatAuthErrorMessage(error);
    const enhancedError = new Error(friendlyMessage);
    (enhancedError as unknown as { code?: string }).code = (error as { code?: string })?.code;
    throw enhancedError;
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
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('unavailable') || error.message.includes('code=unavailable'))) {
      console.warn('Firebase connection: operating in offline-resilient mode.');
    }
    return false;
  }
}

// Collections in Firestore
export const COLLECTIONS = {
  PASSAGES: 'passages',
  QUESTIONS: 'questions',
  RESULTS: 'quiz_results',
  USERS: 'users',
};

// Cloud write helpers with proper error handling
export const firestoreService = {
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const path = `${COLLECTIONS.USERS}/${uid}`;
    try {
      const snap = await getDoc(doc(db, COLLECTIONS.USERS, uid));
      if (snap.exists()) {
        return snap.data() as UserProfile;
      }
      return null;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, path);
    }
  },

  async saveUserProfile(profile: UserProfile): Promise<void> {
    const path = `${COLLECTIONS.USERS}/${profile.uid}`;
    try {
      await setDoc(doc(db, COLLECTIONS.USERS, profile.uid), profile);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  },

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
