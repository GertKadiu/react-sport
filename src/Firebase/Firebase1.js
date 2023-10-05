import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8L_AYOn9rBMfdsMOn4z_upIyMO0ZAmwY",
  authDomain: "first-project-e21dc.firebaseapp.com",
  projectId: "first-project-e21dc",
  storageBucket: "first-project-e21dc.appspot.com",
  messagingSenderId: "229973300305",
  appId: "1:229973300305:web:6b0702f2143d52bee05470",
  measurementId: "G-XYL3Z0Y80Y",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app);
