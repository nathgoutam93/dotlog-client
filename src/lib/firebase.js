import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';

const DOTLOG = initializeApp(firebaseConfig);

export const auth = getAuth(DOTLOG);

export const db = getFirestore(DOTLOG);

export const storage = getStorage(DOTLOG);

export default DOTLOG;
