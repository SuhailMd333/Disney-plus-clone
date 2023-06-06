import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "@firebase/firestore"
//
const firebaseConfig = {
    apiKey: "AIzaSyD31XyVVOf7VRuocp1YYVLuPbk4ofvJ7P0",
    authDomain: "disney-plus-clone-a2aca.firebaseapp.com",
    projectId: "disney-plus-clone-a2aca",
    storageBucket: "disney-plus-clone-a2aca.appspot.com",
    messagingSenderId: "401591524448",
    appId: "1:401591524448:web:5f804deccba9c52357b705",
    measurementId: "G-822Y0SNE58"
  };
  
  // Initialize Firebase
 // Use this to initialize the firebase App
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth , provider,db}