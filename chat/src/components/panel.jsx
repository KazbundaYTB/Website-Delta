import React, { useState, useEffect } from "react";
import { messagesCollection, firestore } from "../api/firebase";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

export default function Panel({ username, maintenanceStatus }) {
  const [message, setMessage] = useState("");

  const clearInputs = () => {
    setMessage("");
  };

  const handleSend = async () => {
    if (!username || !message) return alert(" You cannot send an empty message! ");

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

  const handleEnableMaintenance = async () => {
    const settingsDoc = doc(firestore, 'config', 'settings');
    await updateDoc(settingsDoc, {
      maintenanceMode: true
    });
  };

  const handleDisableMaintenance = async () => {
    const settingsDoc = doc(firestore, 'config', 'settings');
    await updateDoc(settingsDoc, {
      maintenanceMode: false
    });
  };

  useEffect(() => {
    // Přidej kód pro automatické update zde
    return () => {
      // Clean-up funkce zde, pokud je potřeba
    };
  }, [maintenanceStatus]);

  return (
    <div className="w-full h-full flex">
      <div className="w-11/12 bg-red-300 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <p className="text-xl font-bold">{username}</p>
          <div className="flex space-x-2">
            {username === "administrator@kazbunda.tk" && (
              <>
                <button
                  className="bg-red-500 rounded-md text-white py-2 px-4"
                  onClick={handleEnableMaintenance}
                >
                  Enable Maintenance
                </button>
                <button
                  className="bg-green-500 rounded-md text-white py-2 px-4"
                  onClick={handleDisableMaintenance}
                >
                  Disable Maintenance
                </button>
              </>
            )}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
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
