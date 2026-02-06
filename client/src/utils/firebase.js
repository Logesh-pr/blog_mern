// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkfbk9SUWC5ySgi-A0lHHr8IDYS7Op2k8",
  authDomain: "blog-c708d.firebaseapp.com",
  projectId: "blog-c708d",
  storageBucket: "blog-c708d.firebasestorage.app",
  messagingSenderId: "800960174676",
  appId: "1:800960174676:web:28eda5145de6dd69cfabc1",
  measurementId: "G-8T1HRHLBYK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
