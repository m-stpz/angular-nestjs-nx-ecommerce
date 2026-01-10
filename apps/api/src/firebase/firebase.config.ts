// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'crud-nestjs-a7393.firebaseapp.com',
  projectId: 'crud-nestjs-a7393',
  storageBucket: 'crud-nestjs-a7393.firebasestorage.app',
  messagingSenderId: '699129785862',
  appId: '1:699129785862:web:1df52d3d180c6d76655d87',
  measurementId: 'G-S7ZM2TDGG3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
