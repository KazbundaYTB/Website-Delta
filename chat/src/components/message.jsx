import React from "react";

export default function Message({ name, message, time }) {
  return (
    <div className="p-5 whitespace-nowrap text-3xl bg-slate-300 rounded-xl w-min m-3">
      <p className="text-sm text-blue-800">{name}</p>
      <p>{message}</p>
      <p className="text-sm text-blue-800">{time.toDate().toLocaleString()}</p>
    </div>
  );
}
