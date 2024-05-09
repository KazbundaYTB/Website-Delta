import React, { useState } from "react";
import { firestore, kidsCollection, messagesCollection } from "../api/firebase";
import { addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

export default function Panel({ arr, setArr, username }) {
  const [message, setMessage] = useState("");

  const clearInputs = () => {
    setMessage("");
  };

  const handleSend = async () => {
    if (!username || !message) return;

    try {
      const docRef = await addDoc(messagesCollection, {
        username: username,
        message: message,
        time: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    clearInputs();
  };

  const handleLogOut = () => {
    signOut(auth);
  };

  return (
    <div className="w-full h-full flex ">
      <div className="w-10/12 bg-red-300 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <p className="text-xl font-bold">{username}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="p-4 text-2xl"
        />
      </div>

      <button
        className="w-2/12 m-10 bg-blue-400 rounded-lg text-white py-2"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}