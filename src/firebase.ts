import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// setPersistence(auth, browserSessionPersistence).catch((error) => {
// console.error('Failed to set auth persistence:', error);
// });

// 인증 상태 변경을 추적하는 함수
export const subscribeToAuthState = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback); // 로그인된 사용자 정보를 콜백으로 전달
};

export const db = getFirestore(app);
export const storage = getStorage(app);
