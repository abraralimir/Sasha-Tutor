
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  projectId: "sasha-e-learning",
  appId: "1:124651455087:web:582c0b9bb3ea15f31ec39a",
  storageBucket: "sasha-e-learning.firebasestorage.app",
  apiKey: "AIzaSyCDQdX6d-p_jJt90WInEdRHdAzuAtcUjWU",
  authDomain: "sasha-e-learning.firebaseapp.com",
  messagingSenderId: "124651455087",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
// It's safe to check for window since this is a client-side file
if (typeof window !== 'undefined') {
  try {
    getAnalytics(app);
  } catch (error) {
    console.error("Firebase Analytics could not be initialized.", error);
  }
}


export { app, auth, db };
