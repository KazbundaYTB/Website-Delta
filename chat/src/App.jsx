import ChatList from "./components/chatlist";
import Panel from "./components/panel";
import "./style.css";
import { useEffect, useState } from "react";
import { messagesCollection } from "./api/firebase";
import { getDocs, query, orderBy } from "firebase/firestore";

function App() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Fetching data...");
        const snap = await getDocs(
          query(messagesCollection, orderBy("time", "asc"))
        );
        const data = snap.docs.map((doc) => doc.data());

        setArr(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    setInterval(fetchData, 1000);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-[10%] bg-stale-200"> 
        <h1 className="p-5 text-3xl text-center align-middle items-center ">React web chat</h1>
        
      </div>
      <div className="h-[70%] bg-slate-200">
        <ChatList arr={arr} />
      </div>

      <div className="h-[20%] bg-slate-300">
        <Panel arr={arr} setArr={setArr} />
      </div>
    </div>
  );
}

export default App;