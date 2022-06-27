// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuvbUG9b0QKlb_f9cUavhT2iUi2XmHr0Q",
  authDomain: "shopping-list-1d506.firebaseapp.com",
  databaseURL: "https://shopping-list-1d506.firebaseio.com",
  projectId: "shopping-list-1d506",
  storageBucket: "shopping-list-1d506.appspot.com",
  messagingSenderId: "219622571466",
  appId: "1:219622571466:web:00e79a532fe70858f96333"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);