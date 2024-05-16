import React, { useState } from "react";
import { messagesCollection } from "../api/firebase";
import { addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

export default function Panel({ username }) {
  const [message, setMessage] = useState("");

  const clearInputs = () => {
    setMessage("");
  };

  const handleSend = async () => {
    if (!username || !message) return alert(" You can't send empty message! ");

    try {
      const docRef = await addDoc(messagesCollection, {
        username: username,
        message: message,
        time: new Date(),
      });

      console.log("Message created with ID: ", docRef.id);
    } catch (e) {
      console.error("Error with creating message: ", e);
    }

    clearInputs();
  };

  const handleLogOut = () => {
    signOut(auth);
  };

  return (
    <div className="w-full h-full flex ">
      <div className="w-11/12 bg-red-300 flex flex-col">

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
        className="w-1/12 m-2 bg-blue-400 rounded-md text-white py-2"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}