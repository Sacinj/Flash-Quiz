
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmzpbQsZ5Ac9ktMQGhFMx7EqhDEfvvFrU",
  authDomain: "flash-quiz-a0610.firebaseapp.com",
  projectId: "flash-quiz-a0610",
  storageBucket: "flash-quiz-a0610.appspot.com",
  messagingSenderId: "958820173228",
  appId: "1:958820173228:web:dd920302d78fa2b3116609",
  measurementId: "G-0LLMHCJZZ4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);