import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import {
  auth,
  db,
  COLLECTIONS,
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  signOut,
  testConnection,
  handleFirestoreError,
  OperationType,
  firestoreService,
} from '../services/firebase';
import { storageService } from '../services/storageService';
import { Passage, Question, QuizResult, UserProfile, UserRole } from '../types';

interface FirebaseContextValue {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthReady: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isConnected: boolean;
  isSyncing: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, pass: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  seedToCloud: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Helper to load or create profile
  const syncProfile = async (firebaseUser: User) => {
    try {
      const profile = await firestoreService.getUserProfile(firebaseUser.uid);
      if (profile) {
        setUserProfile(profile);
      } else {
        const isOwnerEmail = firebaseUser.email === 'khafidmaulana1306@gmail.com';
        const defaultRole: UserRole = isOwnerEmail ? 'teacher' : 'student';
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || (firebaseUser.email?.split('@')[0] || 'Pengguna'),
          email: firebaseUser.email || '',
          role: defaultRole,
          createdAt: new Date().toISOString(),
        };
        await firestoreService.saveUserProfile(newProfile);
        setUserProfile(newProfile);
      }
    } catch (err) {
      console.warn('Profile fetch warning (using local fallback):', err);
      const isOwnerEmail = firebaseUser.email === 'khafidmaulana1306@gmail.com';
      setUserProfile({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'Pengguna',
        email: firebaseUser.email || '',
        role: isOwnerEmail ? 'teacher' : 'student',
        createdAt: new Date().toISOString(),
      });
    }
  };

  // Check connection & listen to Auth state
  useEffect(() => {
    testConnection().then((connected) => {
      setIsConnected(connected);
    });

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await syncProfile(firebaseUser);
      } else {
        setUserProfile(null);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore real-time updates for collections when authenticated
  useEffect(() => {
    if (!isAuthReady || !user) return;

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
        console.warn('Firestore passages listener notice:', error.message);
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
        console.warn('Firestore questions listener notice:', error.message);
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
        console.warn('Firestore quiz results listener notice:', error.message);
      }
    );

    return () => {
      unsubPassages();
      unsubQuestions();
      unsubResults();
    };
  }, [isAuthReady, user]);

  const handleLoginGoogle = async () => {
    const cred = await signInWithGoogle();
    if (cred.user) {
      await syncProfile(cred.user);
    }
  };

  const handleLoginEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmail(email, pass);
    if (cred.user) {
      await syncProfile(cred.user);
    }
  };

  const handleRegisterEmail = async (name: string, email: string, pass: string, role: UserRole) => {
    const cred = await registerWithEmail(name, email, pass, role);
    if (cred.user) {
      setUserProfile({
        uid: cred.user.uid,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setUserProfile(null);
  };

  const refreshUserProfile = async () => {
    if (user) {
      await syncProfile(user);
    }
  };

  // Seed default data to Firestore if cloud collection is empty (Teacher only)
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

  // Compute roles
  const isTeacher = Boolean(
    (user && user.email === 'khafidmaulana1306@gmail.com') ||
    userProfile?.role === 'teacher'
  );

  const isStudent = Boolean(user && !isTeacher);
  const isAdmin = isTeacher;

  return (
    <FirebaseContext.Provider
      value={{
        user,
        userProfile,
        isAuthReady,
        isAdmin,
        isTeacher,
        isStudent,
        isConnected,
        isSyncing,
        loginWithGoogle: handleLoginGoogle,
        loginWithEmail: handleLoginEmail,
        registerWithEmail: handleRegisterEmail,
        logout: handleLogout,
        seedToCloud,
        refreshUserProfile,
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
