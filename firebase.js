// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "artic-designs.firebaseapp.com",
  projectId: "artic-designs",
  storageBucket: "artic-designs.firebasestorage.app",
  messagingSenderId: "976766857998",
  appId: "1:976766857998:web:84ee1bde357c1555f29d5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
