import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = require('../firebaseConfig');

// const config = {
//   apiKey: 'AIzaSyDSo2DwnEL11bm_iYq3ajCOE8cDGgquzE4',

//   authDomain: 'dotlog-f5dc5.firebaseapp.com',

//   projectId: 'dotlog-f5dc5',

//   storageBucket: 'dotlog-f5dc5.appspot.com',

//   messagingSenderId: '572461654954',

//   appId: '1:572461654954:web:d51b11b6e3c082009581d3',
// };

const DOTLOG = initializeApp(firebaseConfig);

export const auth = getAuth(DOTLOG);

export const db = getFirestore(DOTLOG);

export const storage = getStorage(DOTLOG);

export default DOTLOG;
