// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6m1nF7qmP5ZvVNMuNRvhf-h_hCc4ikM8",
    authDomain: "journalapp-9fb5c.firebaseapp.com",
    projectId: "journalapp-9fb5c",
    storageBucket: "journalapp-9fb5c.appspot.com",
    messagingSenderId: "198988922916",
    appId: "1:198988922916:web:e031978ef756174118d8b1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );//!Funcionalidades de autenticacion
export const FirebaseDB = getFirestore( FirebaseApp ); //!Config de mi BD