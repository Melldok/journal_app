
// This is the configuration file for Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAun4qiskC23j04m46F0i-sclaMykUx0W4",
  authDomain: "journal-app-5e4f6.firebaseapp.com",
  projectId: "journal-app-5e4f6",
  storageBucket: "journal-app-5e4f6.appspot.com",
  messagingSenderId: "216808070977",
  appId: "1:216808070977:web:c8583de86358b03b1f8bc0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );