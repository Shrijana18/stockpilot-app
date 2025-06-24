import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbOl3CBCSI4GpjFZdne0FQtdz2jyyD7lk",
  authDomain: "stockpilot-app.firebaseapp.com",
  projectId: "stockpilot-app",
  storageBucket: "stockpilot-app.firebasestorage.app",
  messagingSenderId: "1077602705558",
  appId: "1:1077602705558:web:feef2057e3d9c00bf762b7",
  measurementId: "G-J2GPTB99LS"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
