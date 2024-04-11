import {useState} from "react";

const MyInput = () => {
    const [text, setText] =useState("");

    return (
    <div>
    <h3>{text}</h3>
    <input 
    type="text" 
    value={text} 
    onChange={(e) => {
        console.log("text")
        setText(e.target.value)
    }}
    />
    

    <button
    onClick={( ) => {
        setText("");
    }}>Clear</button>
    </div>
);
};

export default MyInput;