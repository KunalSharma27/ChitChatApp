import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAkhazn5jFi9tzPf1pUtjwsMdx3w0pq6Qw",
  authDomain: "chit-chat-1-8d4ac.firebaseapp.com",
  projectId: "chit-chat-1-8d4ac",
  storageBucket: "chit-chat-1-8d4ac.appspot.com",
  messagingSenderId: "815597981997",
  appId: "1:815597981997:web:9511e00ad904b6341203a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()