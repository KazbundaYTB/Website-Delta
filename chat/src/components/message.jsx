import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { messagesCollection } from "../api/firebase";
import { FaTrash } from "react-icons/fa";

export default function Message({ id, name, message, time }) {
  const handleDelete = async () => {
    await deleteDoc(doc(messagesCollection, id));
  };

  return (
    <div className="relative p-5 whitespace-nowrap text-3xl bg-slate-300 rounded-xl w-min m-3">
      <p className="text-sm text-blue-800">{name}</p>
      <p>{message}</p>
      <p className="text-sm text-blue-800">{time.toDate().toLocaleString()}</p>
      <button
        className="absolute bottom-2 right-2 bg-red-500 text-white p-1 rounded-xl"
        onClick={handleDelete}
      >
        <FaTrash style={{ fontSize: "0.8rem" }} />
      </button>
    </div>
  );
  
}
