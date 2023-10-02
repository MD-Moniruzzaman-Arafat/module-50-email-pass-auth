import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQBgAdx4mgcpm09E56kKRQv1IdBFxbYio",
    authDomain: "module-50-email-pass-auth.firebaseapp.com",
    projectId: "module-50-email-pass-auth",
    storageBucket: "module-50-email-pass-auth.appspot.com",
    messagingSenderId: "642137198725",
    appId: "1:642137198725:web:48c1008f1d12102febd9ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)