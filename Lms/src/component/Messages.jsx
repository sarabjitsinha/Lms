import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Mail, Send, User } from "lucide-react";

export default function Messages() {
  const { messages, user } = useAuth();
  const [activeChat, setActiveChat] = useState(messages[0]);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: "Adrian Demian", isMe: false, text: "Great job on your CSS Grid project! Let me know if you need review on Module 2.", time: "2:15 PM" },
    { id: 2, sender: "Bill Evans", isMe: true, text: "Thank you Adrian! I just completed the responsive breakpoint section.", time: "2:18 PM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: user?.name || "Bill Evans",
        isMe: true,
        text: inputMsg.trim(),
        time: "Just now"
      }
    ]);
    setInputMsg("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 font-heading">
          Direct Messages
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Chat directly with instructors and study group peers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-subtle min-h-[550px]">
        
        {/* Contact List */}
        <div className="md:col-span-4 border-r border-slate-100 dark:border-slate-700 p-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Conversations
          </h3>
          {messages.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveChat(m)}
              className={`p-3 rounded-xl cursor-pointer flex items-center space-x-3 transition ${
                activeChat?.id === m.id
                  ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700"
                  : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <img src={m.avatar} alt={m.sender} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{m.sender}</h4>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
                <p className="text-slate-500 truncate mt-0.5">{m.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="md:col-span-8 flex flex-col justify-between p-6">
          
          {/* Chat Header */}
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-700">
            <img src={activeChat?.avatar} alt={activeChat?.sender} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                {activeChat?.sender || "Instructor Chat"}
              </h4>
              <span className="text-[11px] text-emerald-500 font-semibold">● Online</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 py-6 space-y-4 overflow-y-auto max-h-[380px] pr-2">
            {chatHistory.map((c) => (
              <div
                key={c.id}
                className={`flex ${c.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                    c.isMe
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-xs"
                  }`}
                >
                  <p className="leading-relaxed">{c.text}</p>
                  <span className={`text-[9px] block text-right ${c.isMe ? "text-blue-200" : "text-slate-400"}`}>
                    {c.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Send Box */}
          <form onSubmit={handleSend} className="flex items-center space-x-2 pt-4 border-t border-slate-100 dark:border-slate-700">
            <input
              type="text"
              placeholder={`Message ${activeChat?.sender || "instructor"}...`}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-blue-500 text-slate-800 dark:text-slate-200"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
