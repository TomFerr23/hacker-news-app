// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCNMBlGDAaLCHaZ5j9P4yiubyWn-c9_tI",
  authDomain: "black-lotus-b248a.firebaseapp.com",
  projectId: "black-lotus-b248a",
  storageBucket: "black-lotus-b248a.appspot.com",
  messagingSenderId: "151073626757",
  appId: "1:151073626757:web:452a2e190db63d1a5c67ec",
  measurementId: "G-LVCDLCFXB5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);
const logOut = () => signOut(auth);

export { auth, firestore, signInWithGoogle, logOut };
