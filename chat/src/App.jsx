import ChatList from "./components/chatlist";
import Panel from "./components/panel";
import Maintenance from "./components/Maintenance"

import "./style.css";
import { useEffect, useState } from "react";
import {  messagesCollection,firestore } from "./api/firebase";
import {  query, orderBy, onSnapshot,doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import LoginScreen from "./components/LoginScreen";
import { auth } from "./api/firebase";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [maintenanceStatus, setMaintenanceStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const settingsDoc = doc(firestore, 'config', 'settings');
    const unsubscribe = onSnapshot(settingsDoc, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMaintenanceStatus(data.maintenanceMode);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(messagesCollection, orderBy("time", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });

      setArr(msgs);
      const elem = document.getElementById('chat');
      console.log(elem)
      elem.scrollTop = elem.scrollHeight;
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        setUsername(email);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    
    const elem = document.getElementById('chat');
    console.log(elem)
    if (!elem) return;
    elem.scrollTop = elem.scrollHeight

}, [arr]);

  if (maintenanceStatus) {
    return <Maintenance username={username} setMaintenanceStatus={setMaintenanceStatus} />;
  }

  if (!loggedIn) {
    return <LoginScreen username={username}/>;
  }

  
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-[80%] bg-slate-200">
        <ChatList arr={arr} username={username} />
      </div>
      <div className="h-[20%] bg-slate-300">
        <Panel arr={arr} setArr={setArr} username={username} />
      </div>
    </div>
  );
}
export default App;