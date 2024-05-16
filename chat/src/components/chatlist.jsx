import React from "react";
import Message from "./message";

export default function ChatList({ arr }) {
  return (
    <div className="w-full h-full flex flex-col justify-end bg-green-100">
      <div className=" overflow-y-scroll">
      {arr.length === 0 ? (
        <div className="text-center text-red-600 text-xl font-bold">SYSTÉM - No messages to load!</div>
      ) : (
        arr.map((item) => (
          <Message
            id={item.id}
            key={item.id}
            name={item.username}
            message={item.message}
            time={item.time}
          />
        ))
      )}
    </div>
    </div>
  );
}
