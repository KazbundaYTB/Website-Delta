import React from "react";
import Message from "./message";
import { firestore } from "../api/firebase";
import { doc, updateDoc } from "firebase/firestore";
export default function ChatList({ arr, username }) {


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





  return (
    <div className="w-full h-full flex flex-row bg-neutral-700">

  <div className="w-2/12 bg-gray-600 flex-col">
    <br />
    <div className="bg-slate-700 h-[35px] flex items-center justify-center"> <h1 className="text-white font-bold">ReactChat - v3.2 </h1> </div>

  <br />
  <div className="w-full h-[1px] bg-slate-400"></div>
  <p className="text-white font-bold text-l align-top text-center"> Channels:</p>

  {/* <div className="h-[45%] bg-gray-600 flex flex-col justify-start text-start space-x-5 "> */}
  <div className="h-[10%] bg-gray-600 flex flex-col justify-start text-start space-x-5 rounded-xl">

  <div className="text-white font-bold text-l align-top text-center">
  {/* <div className="text-white font-bold text-l align-top text-center"> */}

  <button className="bg-emerald-500 hover:bg-emerald-600 rounded-md text-white py-2 px-20 m-2"> Global chat </button>

  
  


</div>
  </div> {/* CHANNELS DIV END */}
  
  {username === "administrator@kazbunda.tk" && (
  <>
  <div className="w-full h-[1px] bg-slate-400"></div>
  <p className="text-white font-bold text-l align-top text-center "> Administrators category:</p>

  <div className="flex flex-row justify-center px-4 py-2 space-x-2">

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

  </div>
    </>
    )}





  </div> {/* MAIN DIV END*/}



  






      <div className="w-10/12 overflow-y-scroll" id="chat">
        {arr.length === 0 ? (
          <div className="text-center text-red-600 text-xl font-bold">
            SYSTEM - No messages to load!
          </div>
        ) : (
          arr.map((item) => (
            <Message
              id={item.id}
              key={item.id}
              email={item.username}
              message={item.message}
              time={item.time}
              currentuser={username}
            />
          ))
        )}
      </div>


    </div>
  );
}
