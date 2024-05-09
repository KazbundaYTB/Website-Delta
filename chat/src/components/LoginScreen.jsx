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
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // ..
      });

    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // ..
      });

    setEmail("");
    setPassword("");
  };

  const handleGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="p-4 text-2xl"
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="p-4 text-2xl"
      />

      <button onClick={handleCreate} className="p-4 bg-blue-400 text-2xl">
        Create acc
      </button>
      <button onClick={handleLogin} className="p-4 bg-blue-400 text-2xl">
        Login
      </button>
      <button onClick={handleGoogle} className="p-4 bg-blue-400 text-2xl">
        Google
      </button>
    </div>
  );
}