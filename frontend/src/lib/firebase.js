import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "bloggr-92f19.firebaseapp.com",
  projectId: "bloggr-92f19",
  storageBucket: "bloggr-92f19.firebasestorage.app",
  messagingSenderId: "793884088258",
  appId: "1:793884088258:web:59a90f26d97f75cdf0a85b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
