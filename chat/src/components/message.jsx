import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { messagesCollection } from "../api/firebase";
import { FaTrash } from "react-icons/fa";

export default function Message({ id, email, message, time, currentuser }) {
  const handleDelete = async () => {
    await deleteDoc(doc(messagesCollection, id));
  };

return (
  <div className={`w-full flex ${email === currentuser && ""}`}>
    <div className={`relative p-5 whitespace-nowrap text-3xl rounded-xl w-min m-3 ${email === currentuser ? "bg-neutral-300" : "bg-neutral-400"}`}>
      <p className="text-sm text-blue-800">{email}</p>
      <p>{message}</p>
      <p className="text-sm text-blue-800">{time.toDate().toLocaleString()}</p>
      {email === currentuser && (      
      <button
        className="absolute bottom-2 right-2 text-red-400 p-1 rounded-xl"
        onClick={handleDelete}
      >
        <FaTrash style={{ fontSize: "0.8rem" }} />
      </button>)} 
      {"administrator@kazbunda.tk" === currentuser && (      
      <button
        className="absolute bottom-2 right-2 text-red-400 p-1 rounded-xl"
        onClick={handleDelete}
      >
        <FaTrash style={{ fontSize: "0.8rem" }} />
      </button>)} 
    </div>
  </div>
);

  
}