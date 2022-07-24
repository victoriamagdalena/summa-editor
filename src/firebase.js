import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbBvpOw2I9BSW5GW08_B5qHq5Z6U6OSOk",
  authDomain: "summa-cd655.firebaseapp.com",
  projectId: "summa-cd655",
  storageBucket: "summa-cd655.appspot.com",
  messagingSenderId: "560024288609",
  appId: "1:560024288609:web:7e60840fa7983e7b9ad920",
  measurementId: "G-Z4N3GSVZ3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
