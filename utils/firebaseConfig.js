import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: "coworkingspaces-48082",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: "1:527506605554:web:f396b2e420a66275c4d76b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const provider = new GoogleAuthProvider();
// provider.addScope("https://www.googleapis.com/auth/calendar.events");
// provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
