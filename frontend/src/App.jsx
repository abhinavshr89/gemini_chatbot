import React from "react";
import ChatBox from "./components/chatbox";

const App = () => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="m-auto flex items-center ">
        <img
          src="https://i.pinimg.com/originals/57/3c/da/573cdaf5205bebaac51ca29273dd5514.gif"
          alt="ChatPanda Icon"
          className="h-[50px]"
        />
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Chat<span className="text-blue-500">Panda</span>
        </h1>
      </div>
      <ChatBox />
    </div>
  );
};

export default App;
