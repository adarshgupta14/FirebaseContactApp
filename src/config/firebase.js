// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1G6f1WDlOI-bgqPPEHdgT1WXX2rrx3N8",
  authDomain: "vite-contact-e3951.firebaseapp.com",
  projectId: "vite-contact-e3951",
  storageBucket: "vite-contact-e3951.firebasestorage.app",
  messagingSenderId: "419893682953",
  appId: "1:419893682953:web:34d32f777a934dbbcce9d8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);