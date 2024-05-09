import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// DENIS LOGIN (KROUZEK)
  const firebaseConfig = {
    apiKey: "AIzaSyDfFIb7Z6k6pQt5QsmIdQ2AgV1Jx8XJ2P0",
    authDomain: "schoolchatappkids.firebaseapp.com",
    projectId: "schoolchatappkids",
    storageBucket: "schoolchatappkids.appspot.com",
    messagingSenderId: "190568430302",
   appId: "1:190568430302:web:8af203db979e17d2b0204f",
};

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
