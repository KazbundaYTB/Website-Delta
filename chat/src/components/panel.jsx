import React, { useState } from "react";
import { messagesCollection } from "../api/firebase";
import { addDoc } from "firebase/firestore";

export default function Panel({ arr, setArr }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const clearInputs = () => {
    setMessage("");
  };

  const handleSend = async () => {
    try {
      const docRef = await addDoc(messagesCollection, {
        username: name,
        message: message,
        time: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    clearInputs();
  };


  return (
    <div className="w-full h-full flex">
      <div className="w-10/12 bg-red-300 flex flex-col">
        <input
          type="text"
          placeholder="Jméno"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="p-4 text-2xl"
        />
        <input
          type="text"
          placeholder="Zpráva"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="p-4 text-2xl"
        />
      </div>

      <button className="w-2/12 m-5 bg-blue-400 p-4 text-2xl" onClick={handleSend}>
        Odeslat
      </button>

    </div>
  );
}
  