import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "auth-development-31e8a.firebaseapp.com",
  projectId: "auth-development-31e8a",
  storageBucket: "auth-development-31e8a.appspot.com",
  messagingSenderId: "1031000972374",
  appId: "1:1031000972374:web:280c6f0a9ae3da34d72ff7",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = firebase.database();
export const storage = firebase.storage();
export default app;
