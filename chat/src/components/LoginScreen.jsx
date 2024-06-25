import React, { useState } from "react";
import { auth } from "../api/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginScreen(username) {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleCreate = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });

    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });

    setEmail("");
    setPassword("");
  };

  const handleGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <div className="w-screen h-screen flex items-center  bg-neutral-900 flex-col space-y-2.5 justify-center ">
      <div className="text-center text-white text-3xl font-bold">Login to continue</div>
      <br />
      {error && <p className="text-red-500">{error}</p>}
      <div className=" flex flex-col mt-3">
      <span className=" text-white mb-4 ml-3 underline font-bold">Email or Username:</span>

      <input
        type="email"
        placeholder="username@provider.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="px-16 py-3 rounded-lg"
      />
      <span className=" text-white mt-3 ml-3 justify-center items-center underline font-bold">Password:</span>
      <input
        type="password"
        placeholder="Password1234"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className=" p-4 px-16 py-3 rounded-lg mt-3"
      />
</div>
<button onClick={handleCreate} className=" px-16 py-2 bg-green-600 text-white rounded">
          Create Account
        </button>
      <div className="flex ml-2 gap-2">

        <button onClick={handleLogin} className=" px-16 py-2 bg-blue-600 text-white rounded">
          Login
        </button>
      
      
      <button onClick={handleGoogle} className="px-6 py-2 bg-blue-700 text-white rounded">
        Login with Google
      </button>
      </div>
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
               });
  
               }}>
                
                Password reset (Email)
                </button>
        
      <div className="p-4 text-xl rounded-lg flex items-center text-white bg-neutral-900 flex-col space-y-5 justify-center ">

      <h1>If you have problems logging in, please contact!</h1>


      <div className=" flex flex-row space-x-5">
      <button className="px-4 py-2 bg-blue-500 text-white rounded items-center"> 

      <a href="http://localhost:3000/" className="justify-center">Discord</a> 

      </button>
      </div>
      </div>
    </div>
  );
}
