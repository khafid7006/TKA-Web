import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import {
  auth,
  db,
  COLLECTIONS,
  signInWithGoogle,
  signOut,
  testConnection,
  handleFirestoreError,
  OperationType,
} from '../services/firebase';
import { storageService } from '../services/storageService';
import { Passage, Question, QuizResult } from '../types';

interface FirebaseContextValue {
  user: User | null;
  isAuthReady: boolean;
  isAdmin: boolean;
  isConnected: boolean;
  isSyncing: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  seedToCloud: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Check connection & listen to Auth state
  useEffect(() => {
    testConnection().then((connected) => {
      setIsConnected(connected);
    });

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthReady(true);
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore real-time updates for collections
  useEffect(() => {
    if (!isAuthReady) return;

    // Listen to passages
    const unsubPassages = onSnapshot(
      collection(db, COLLECTIONS.PASSAGES),
      (snapshot) => {
        if (!snapshot.empty) {
          const cloudPassages: Passage[] = [];
          snapshot.forEach((docSnap) => {
            cloudPassages.push(docSnap.data() as Passage);
          });
          if (cloudPassages.length > 0) {
            storageService.syncFromCloudPassages(cloudPassages);
          }
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, COLLECTIONS.PASSAGES);
      }
    );

    // Listen to questions
    const unsubQuestions = onSnapshot(
      collection(db, COLLECTIONS.QUESTIONS),
      (snapshot) => {
        if (!snapshot.empty) {
          const cloudQuestions: Question[] = [];
          snapshot.forEach((docSnap) => {
            cloudQuestions.push(docSnap.data() as Question);
          });
          if (cloudQuestions.length > 0) {
            storageService.syncFromCloudQuestions(cloudQuestions);
          }
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, COLLECTIONS.QUESTIONS);
      }
    );

    // Listen to quiz results
    const unsubResults = onSnapshot(
      collection(db, COLLECTIONS.RESULTS),
      (snapshot) => {
        if (!snapshot.empty) {
          const cloudResults: QuizResult[] = [];
          snapshot.forEach((docSnap) => {
            cloudResults.push(docSnap.data() as QuizResult);
          });
          if (cloudResults.length > 0) {
            storageService.syncFromCloudResults(cloudResults);
          }
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, COLLECTIONS.RESULTS);
      }
    );

    return () => {
      unsubPassages();
      unsubQuestions();
      unsubResults();
    };
  }, [isAuthReady]);

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Seed default data to Firestore if cloud collection is empty
  const seedToCloud = async () => {
    setIsSyncing(true);
    try {
      const passages = storageService.getPassages();
      const questions = storageService.getQuestions();

      // Check passages in cloud
      const passagesSnap = await getDocs(collection(db, COLLECTIONS.PASSAGES));
      if (passagesSnap.empty && passages.length > 0) {
        for (const p of passages) {
          await storageService.createPassage(p);
        }
      }

      // Check questions in cloud
      const questionsSnap = await getDocs(collection(db, COLLECTIONS.QUESTIONS));
      if (questionsSnap.empty && questions.length > 0) {
        for (const q of questions) {
          await storageService.createQuestion(q);
        }
      }
    } catch (e) {
      console.error('Error seeding initial data to Firestore:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  const isAdmin = Boolean(
    user && (user.email === 'khafidmaulana1306@gmail.com' || user.emailVerified)
  );

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isAuthReady,
        isAdmin,
        isConnected,
        isSyncing,
        login: handleLogin,
        logout: handleLogout,
        seedToCloud,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
