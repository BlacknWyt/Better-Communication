// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoAKX8AJurWLD3hj0ys69A1X3OMNrplvY",
  authDomain: "better-communication-8cc70.firebaseapp.com",
  projectId: "better-communication-8cc70",
  storageBucket: "better-communication-8cc70.appspot.com",
  messagingSenderId: "851125703439",
  appId: "1:851125703439:web:8190285f43d405232ea47a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);