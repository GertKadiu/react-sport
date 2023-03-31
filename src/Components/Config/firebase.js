// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
   apiKey: "AIzaSyCxMyPyNqSXk9R9loaIAL96B4gEJQuhi3A",
   authDomain: "react-auth-7bc29.firebaseapp.com",
   databaseURL:'https://react-auth-7bc29-default-rtdb.firebaseio.com/',
   projectId: "react-auth-7bc29",
   storageBucket: "react-auth-7bc29.appspot.com",
   messagingSenderId: "554516931566",
   appId: "1:554516931566:web:5a41e7837cc50ee38ba4ff",
   measurementId: "G-X9PZRE8L7D",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


