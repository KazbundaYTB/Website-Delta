import ChatList from "./components/chatlist";
import Panel from "./components/panel";
import "./style.css";
import { useEffect, useState } from "react";
import { firestore, messagesCollection } from "./api/firebase";
import { getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import LoginScreen from "./components/LoginScreen";
import { auth } from "./api/firebase";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const q = query(messagesCollection, orderBy("time", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setArr(msgs);
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const email = user.email;
        setUsername(email);
        setLoggedIn(true);
        // ...
      } else {
        // User is signed out
        setLoggedIn(false);
        // ...
      }
    });
  }, []);

  if (!loggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-[80%] bg-slate-200">
        <ChatList arr={arr} />
      </div>

      <div className="h-[20%] bg-slate-300">
        <Panel arr={arr} setArr={setArr} username={username} />
      </div>
    </div>
  );
}

export default App;