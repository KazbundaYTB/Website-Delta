import React from "react";
import Message from "./message";

export default function ChatList({ arr }) {
  return (
    <div className="w-full h-full flex flex-col justify-end bg-green-100">
      {arr.length === 0 ? (
        <div className="text-center text-red-800 text-xl font-bold">SYSTÉM - Nebyly nalezeny žádné zprávy k načtení!</div>
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
  );
}
