// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBJTB9LW_4W3RvXvM12Zjjj4fgLyuV5Qcs",

  authDomain: "tiendita-teclados.firebaseapp.com",

  projectId: "tiendita-teclados",

  storageBucket: "tiendita-teclados.appspot.com",

  messagingSenderId: "236106567749",

  appId: "1:236106567749:web:85d21332e81b22a018d32c"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

//Base de datos
export const db = getFirestore(app)