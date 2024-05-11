import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { messagesCollection } from "../api/firebase";

export default function Message({ id, name, message, time }) {
  const handleDelete = async () => {
    await deleteDoc(doc(messagesCollection, id));
  };

  return (
    <div className="p-5 whitespace-nowrap text-3xl bg-slate-300 rounded-xl w-min m-3">
      <p className="text-sm text-blue-800">{name}</p>
      <p>{message}</p>
      <p className="text-sm text-blue-800">{time.toDate().toLocaleString()}</p>
      <button
        className="bg-red-500 text-white p-1 rounded-xl"
        onClick={handleDelete}
      >
        delete
      </button>
    </div>
  );
}