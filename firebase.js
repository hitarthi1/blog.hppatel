
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
//console.log(process.env.API_KEY);

var firebaseConfig = {

  apiKey:`process.env.API_KEY`,
  authDomain: "portfolio-50472.firebaseapp.com",
  projectId: "portfolio-50472",
  storageBucket: "portfolio-50472.appspot.com",
  messagingSenderId: `process.env.MSID`,
  appId: "1:925088659403:web:77d7166150381b0eac284e",
  measurementId: "G-6187DSLT5S"
  };

// if(!firebase.apps.length) 
// firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();


const storage = getStorage(app);

 const serverTimestamp = getFirestore.serverTimestamp


export {auth,db,storage,serverTimestamp}


