import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';

const hostname = window.location.hostname;

const DOTLOG = hostname === "localhost" ? initializeApp({
    apiKey: "demo-key",
    authDomain: "demo-auth",
    projectId: "demo-project",
    storageBucket: "default-bucket"
}) : initializeApp(firebaseConfig); 

export const auth = getAuth(DOTLOG);

export const db = getFirestore(DOTLOG);

export const storage = getStorage(DOTLOG);

if(hostname === "localhost"){
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, 'localhost', 8188)
    connectStorageEmulator(storage, 'localhost', 9199)
}