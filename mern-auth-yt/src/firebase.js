// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'mern-auth-app1-80228.firebaseapp.com',
  projectId: 'mern-auth-app1-80228',
  storageBucket: 'mern-auth-app1-80228.appspot.com',
  messagingSenderId: '627317187549',
  appId: '1:627317187549:web:558b06002d4846cb71cc34',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
