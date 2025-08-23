// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
