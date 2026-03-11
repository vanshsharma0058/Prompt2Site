// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_KEY ,
  authDomain: "prompt2site-1978b.firebaseapp.com",
  projectId: "prompt2site-1978b",
  storageBucket: "prompt2site-1978b.firebasestorage.app",
  messagingSenderId: "502541294881",
  appId: "1:502541294881:web:e96393cd771f4f16f97260"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

//authentication have many provider like github ,google etc but here we only use google 
const provider =new GoogleAuthProvider()

export {auth,provider}