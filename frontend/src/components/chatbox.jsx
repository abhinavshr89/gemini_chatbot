import React, { useState } from 'react';
import { useProcessContentMutation } from '../store/apiSlice';
import ReactMarkdown from 'react-markdown';
import toast, { Toaster } from 'react-hot-toast';
import { ClipboardCopy } from "lucide-react";
import { Copy } from 'lucide-react';
import {Send} from 'lucide-react';
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [processContent] = useProcessContentMutation();

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    const userMessage = input;
    setInput('');

    try {
      const response = await processContent(userMessage).unwrap();
      setMessages((prev) => [...prev, { sender: 'bot', text: response.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: Unable to process your message.' }]);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="w-full sm:w-[60%] mx-auto p-4 rounded-2xl shadow-lg flex flex-col h-[80vh] bg-gray-800 text-white mb-7">
      <Toaster />
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 px-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl ${msg.sender === 'user' ? "w-fit" : "w-auto"} ${
              msg.sender === 'user'
                ? 'bg-blue-600 self-end text-right ml-auto text-white'
                : 'bg-gray-700 self-start text-left text-white'
            }`}
          >
            {msg.sender === 'bot' ? (
              <div className="overflow-x-auto relative">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                <button
                  className="absolute top-0 right-0 mt-1 mr-1 text-sm text-gray-400 hover:text-white"
                  onClick={() => handleCopy(msg.text)}
                >
                  <Copy size={16}  /> 
                </button>
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          onClick={handleSend}
        >
          <Send size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
