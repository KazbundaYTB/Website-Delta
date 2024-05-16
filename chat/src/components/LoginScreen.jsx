import React, { useState } from "react";
import { auth } from "../api/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginScreen() {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
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
    <div className="w-screen h-screen flex items-center  bg-slate-600 flex-col space-y-2.5 justify-center ">
      <div className="text-center text-white text-3xl ">Login to continue</div>
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="p-4 text-2xl rounded-lg"
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="p-4 text-2xl rounded-lg"
      />

      <div className="flex flex-row space-x-3.5">
        <button onClick={handleCreate} className="p-4 bg-blue-400 text-2xl rounded-lg">
          Create Account
        </button>
        <button onClick={handleLogin} className="p-4 bg-blue-400 text-2xl rounded-lg">
          Login
        </button>
      </div>
      
      <button onClick={handleGoogle} className="p-4 bg-blue-400 text-2xl rounded-lg">
        Login with Google
      </button>
        
      <div className="p-4 text-xl rounded-lg flex items-center text-white bg-slate-600 flex-col space-y-5 justify-center ">

      <h1>If you have problems logging in, please contact!</h1>


      <div className=" flex flex-row space-x-5">
      <button className="px-4 py-2 bg-blue-500 text-white rounded items-center"> 

      <a href="http://localhost:3000/" className="justify-center">Discord</a> 

      </button>
      {/* <button className="px-4 py-2 bg-blue-500 text-white rounded items-center"> 

<a href="http://localhost:3000/" className="justify-center">Discord</a> 

</button> */}
      </div>
      </div>
    </div>
  );
}
