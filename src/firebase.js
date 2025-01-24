// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0lyKQfXpPnOsy9_5f9L1L7UeJq3XZkI4",
  authDomain: "login-auth-fb73c.firebaseapp.com",
  projectId: "login-auth-fb73c",
  storageBucket: "login-auth-fb73c.appspot.com",
  messagingSenderId: "301419193853",
  appId: "1:301419193853:web:a80a5d20f3a31011a8a594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export { auth, signInWithGoogle };

