import React from "react";
import Message from "./message";

export default function ChatList({ arr, username }) {
  return (
    
    <div className=" w-full h-full flex flex-col justify-end bg-neutral-700">

      
      <div className=" overflow-y-scroll " id="chat">
      {arr.length === 0 ? (
        <div className="text-center text-red-600 text-xl font-bold">SYSTEM - No messages to load!</div>
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
