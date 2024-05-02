import React from "react";
import Message from "./Message";

export default function ChatList({ arr }) {
  return (
    <div className="w-full h-full flex flex-col justify-end bg-green-100 ">
      {arr.map((item, index) => (
        <Message
          key={index}
          name={item.username}
          message={item.message}
          time={item.time}
        />
      ))}
    </div>
  );
}
