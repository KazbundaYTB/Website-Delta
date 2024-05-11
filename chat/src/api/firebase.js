import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDYTmqPnuqG_k0vBA5UwDohXcHluQKlUl0",
  authDomain: "chatappdb-5cad4.firebaseapp.com",
  projectId: "chatappdb-5cad4",
  storageBucket: "chatappdb-5cad4.appspot.com",
  messagingSenderId: "1000459507260",
  appId: "1:1000459507260:web:bcdfa1149d38dd701c5539",
  measurementId: "G-WSGFSKNT19"
};
//my
//  const firebaseConfig = {
//    apiKey: "AIzaSyDYTmqPnuqG_k0vBA5UwDohXcHluQKlUl0",
//    authDomain: "chatappdb-5cad4.firebaseapp.com",
//    projectId: "chatappdb-5cad4",
//    storageBucket: "chatappdb-5cad4.appspot.com",
//    messagingSenderId: "1000459507260",
//    appId: "1:1000459507260:web:bcdfa1149d38dd701c5539",
//    measurementId: "G-WSGFSKNT19"
//  };

export const app = initializeApp(firebaseConfig);

/*Firestore*/
export const firestore = getFirestore(app);
export const messagesCollection = collection(firestore, "messages");

//Auth
export const auth = getAuth(app);