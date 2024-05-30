import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { messagesCollection } from "../api/firebase";
import { FaTrash } from "react-icons/fa";

export default function Message({ id, email, message, time, currentuser }) {
  const handleDelete = async () => {
    await deleteDoc(doc(messagesCollection, id));
  };
  const TextWrapper = ({ message, maxLength }) => {
    const wrappedText = message.length > maxLength ? message.match(new RegExp(`.{1,${maxLength}}`, 'g')).join('\n') : message;
    return wrappedText.split('\n').map((line, index) => (
      <p key={index} className="text-white break-words">{line}</p>
    ));
  };
  

  return (
    <div className={`w-full flex ${email === currentuser && ""}`}>
      <div className={`relative p-3 rounded-lg max-w-md m-3 text-xl ${email === currentuser ? "bg-emerald-600" : "bg-neutral-400"}`}>
        <p className="text-sm text-black">
          {email} - {time.toDate().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
        </p>

        <TextWrapper message={message} maxLength={25} />

        <p className="text-sm text-black"></p>
        {email === currentuser && (
          <button
            className="absolute bottom-2 right-2 text-red-400 p-1 rounded-xl"
            onClick={handleDelete}
          >
            <FaTrash style={{ fontSize: "0.8rem" }} />
          </button>
        )}
        {"administrator@kazbunda.tk" === currentuser && (
          <button
            className="absolute bottom-2 right-2 text-red-400 p-1 rounded-xl"
            onClick={handleDelete}
          >
            <FaTrash style={{ fontSize: "0.8rem" }} />
          </button>
        )}
      </div>
    </div>
  );

  
}