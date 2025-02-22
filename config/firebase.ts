// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJPnunZk4lmOQcy13H--iLkUHtxvAh9ag",
    authDomain: "dodo-auth-e885b.firebaseapp.com",
    projectId: "dodo-auth-e885b",
    storageBucket: "dodo-auth-e885b.firebasestorage.app",
    messagingSenderId: "605927369275",
    appId: "1:605927369275:web:409a614a7aadf9bcf38a1e",
    measurementId: "G-MNX93693DC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
