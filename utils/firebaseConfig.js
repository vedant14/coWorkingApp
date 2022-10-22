import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with the growthSchool's app Firebase project configuration

const firebaseConfig = {
  apiKey: "AIzaSyCo28094N8ggedzimmzraPxEQ7glTu0rNI",
  authDomain: "growthschool-35828.firebaseapp.com",
  projectId: "growthschool-35828",
  storageBucket: "growthschool-35828.appspot.com",
  messagingSenderId: "937223931217",
  appId: "1:937223931217:web:eb9de093db41cbe3c07f70",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const provider = new GoogleAuthProvider();
// provider.addScope("https://www.googleapis.com/auth/calendar.events");
// provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
