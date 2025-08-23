// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxhzamSzAvlnQcy_TDMjo0cY9bwRRLnZo",
  authDomain: "sasha-tutor.firebaseapp.com",
  projectId: "sasha-tutor",
  storageBucket: "sasha-tutor.firebasestorage.app",
  messagingSenderId: "362836624519",
  appId: "1:362836624519:web:bd6214e073f2b8c34e6422",
  measurementId: "G-D6Y8450ZVK"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
// It's safe to check for window since this is a client-side file
if (typeof window !== 'undefined') {
  getAnalytics(app);
}


export { app, auth, db };
