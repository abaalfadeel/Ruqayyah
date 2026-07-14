import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { getFirebaseDb } from './config.js';

const LOCAL_KEY = 'journey-best-memory:wishes';

function loadLocalWishes() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLocalWish(text) {
  const wishes = loadLocalWishes();
  const wish = { text, createdAt: new Date().toISOString() };
  wishes.push(wish);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(wishes));
  return wish;
}

export async function addWish(text) {
  const db = getFirebaseDb();
  if (!db) return saveLocalWish(text);
  try {
    await addDoc(collection(db, 'wishes'), { text, createdAt: serverTimestamp() });
    return { text, createdAt: new Date().toISOString() };
  } catch {
    // في حال فشل الاتصال بالخادم، احفظي الأمنية محليًا كي لا تُفقد
    return saveLocalWish(text);
  }
}

export async function getWishes() {
  const db = getFirebaseDb();
  if (!db) return loadLocalWishes();
  try {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return loadLocalWishes();
  }
}
