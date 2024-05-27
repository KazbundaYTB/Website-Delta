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
    <div className={`relative p-3 rounded-lg max-w-md m-3 text-xl ${email === currentuser ? "bg-emerald-300" : "bg-neutral-400"}`}>
    <p className="text-sm text-blue-800">
        {email} - {time.toDate().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
      </p>

      <p>{message}</p>
      <p className="text-sm text-blue-800"></p>
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