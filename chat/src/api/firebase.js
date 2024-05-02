import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfFIb7Z6k6pQt5QsmIdQ2AgV1Jx8XJ2P0",
  authDomain: "schoolchatappkids.firebaseapp.com",
  projectId: "schoolchatappkids",
  storageBucket: "schoolchatappkids.appspot.com",
  messagingSenderId: "190568430302",
  appId: "1:190568430302:web:8af203db979e17d2b0204f",
};

export const app = initializeApp(firebaseConfig);

//Firestore
export const firestore = getFirestore(app);
export const kidsCollection = collection(firestore, "kids");
export const messagesCollection = collection(firestore, "messages");
