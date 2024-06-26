import React from 'react';

export default function Maintenance({ setMaintenanceStatus, username }) {
  const maintenanceOff = () => {
    setMaintenanceStatus(false);
  };

  return (
    <div className="w-screen h-screen flex items-center bg-slate-600 flex-col space-y-2.5 justify-center">
      <div className="text-center text-white text-3xl">Under Maintenance!</div>
      <br />
      <div className="p-4 text-xl rounded-lg flex items-center text-white bg-slate-600 flex-col space-y-5 justify-center">
        <h1>This website is under maintenance! Check our discord for more info or try it again later!</h1>
        <div className="flex flex-row space-x-5">
          {username === "administrator@kazbunda.tk" && (
            <button className="px-4 py-2 bg-blue-500 text-white rounded items-center" onClick={maintenanceOff}>
              Maintenance bypass
            </button>
          )}
          <button className="px-4 py-2 bg-blue-500 text-white rounded items-center">
              <a href="https://localhost:3000/">Discord</a>
            </button>
        </div>
      </div>
    </div>
  );
}
