import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// عبّئي هذه القيم من إعدادات مشروعك على Firebase Console
// Project Settings → General → Your apps → SDK setup and configuration
// ثم ضعيها في ملف .env في جذر المشروع (انظري .env.example)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app = null;
let db = null;

export function getFirebaseDb() {
  if (!firebaseConfig.apiKey) {
    // لا يوجد إعداد Firebase بعد — سيتم استخدام التخزين المحلي كبديل تلقائي
    return null;
  }
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
}
