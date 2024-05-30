import React, { useState, useEffect } from "react";
import { messagesCollection } from "../api/firebase";
import { addDoc,} from "firebase/firestore";
import { signOut,sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../api/firebase";
import { BsFillSendFill } from "react-icons/bs";


export default function Panel({ username, maintenanceStatus }) {
  const [message, setMessage] = useState("");

  const clearInputs = () => {
    setMessage("");
  };

  const handleSend = async () => {
    if (!username || !message) return alert(" You cannot send an empty message! ");
    if(message.startsWith(" ")) return alert(" You cannot send an empty message! ");

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






  useEffect(() => {
    return () => {
    };
  }, [maintenanceStatus]);

  return (
    <div className="w-full h-full flex rounded-lg">
    <div className=" w-2/12">

    <div className=" w-[100%] h-[100%] bg-gray-700 flex flex-col justify-center text-center space-y-2">
    <p className="text-white font-bold text-l align-top"> Logged as: {username}</p>
    
    <div className="flex flex-row space-x-5 justify-center">

    <button
      className="px-4 py-2 bg-emerald-500 text-white rounded"
      onClick={() =>{
        sendPasswordResetEmail(auth, username)
          .then(() => {
            console.log("email sent")
            })
            .catch((error) => {
           const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
       }
      ); alert(`A password reset email has been sent to your inbox! (${username})`);

       }}>
        
        Change password 
        </button>
    
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded "
      onClick={handleLogOut}
    >
      <p>Log out</p>
    </button>
    
    </div>
        </div>
        </div>

    <div className="w-10/12 bg-gray-500 flex flex-row items-center justify-center align-middle space-x-2">

        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="p-4 text-2xl rounded-xl w-[88%]"
        />
        <button
        className="bg-blue-400 flex items-center justify-center rounded-md mx-auto py-4 px-6"
        
        onClick={handleSend}
      >
         <BsFillSendFill /> Send
      </button>
      </div>
      
    </div>
  );
  
}
