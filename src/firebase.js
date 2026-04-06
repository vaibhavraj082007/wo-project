import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs3P8B8-r8u25tHsqGVqIreqyQ19D6BtU",
  authDomain: "wplearning-7704d.firebaseapp.com",
  projectId: "wplearning-7704d",
  storageBucket: "wplearning-7704d.firebasestorage.app",
  messagingSenderId: "774261029489",
  appId: "1:774261029489:web:e1f2150f056d090751b9d0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);