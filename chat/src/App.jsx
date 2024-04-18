import "./style.css"
import ChatList from "./components/chatlist";
import Panel from "./components/panel";
import Message from "./components/message";

function App() {
  return (
    <div>
      <h1 className="m-2 text-3xl text-red-400">CHAT</h1>
      <p>Start chatting now</p>
      <div className="w-screen h-screen flex flex-col">

        <div className="h-[80%] bg-slate-200"> <ChatList /> </div>

        <Message />
        <Message />
        <Message />
        <Message />
        <Message />

        <div className="h-[20%] bg-slate-300"> <Panel /></div>
        
      </div>
    </div>
  );
}

export default App;
