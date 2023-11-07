// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnscuL_MwHs5Pe-oawlLo_OU2RXLDGOLI",
  authDomain: "webcarros-13392.firebaseapp.com",
  projectId: "webcarros-13392",
  storageBucket: "webcarros-13392.appspot.com",
  messagingSenderId: "153761797950",
  appId: "1:153761797950:web:eca6b7467013e3ee997e6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
