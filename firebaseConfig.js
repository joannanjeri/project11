import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6TT0aTuIZKXbPn_AjRvSNM52yJEZWLSI",
    authDomain: "project11-18138.firebaseapp.com",
    projectId: "project11-18138",
    storageBucket: "project11-18138.appspot.com",
    messagingSenderId: "443521100146",
    appId: "1:443521100146:web:b352f32687194a032b55eb",
    measurementId: "G-X9PE1ZW44J"
  };


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword };