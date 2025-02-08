import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useNavbar } from "../contexts/NavbarContext";

const ChatAI = () => {
  const { setNavbar } = useNavbar();
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // AI Response Function
  const getAIResponse = (message: string) => {
    if (message.toLowerCase().includes("fever")) {
      return "It looks like you have a fever. Stay hydrated and rest well!";
    } else if (message.toLowerCase().includes("headache")) {
      return "A headache can be caused by stress or dehydration. Drink some water and relax.";
    } else {
      return "I'm your AI Doctor. Please describe your symptoms, and I'll try to help!";
    }
  };

  // Handle Message Submission
  const sendMessage = () => {
    if (input.trim() === "") return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const aiMessage = { text: getAIResponse(input), sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInput("");
  };

  useEffect(() => {
    setNavbar(false);
    return () => setNavbar(true);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full font-primary text-2xl font-black flex justify-center items-center py-4 border-b-2 border-gray-300 bg-white shadow-md">
        <div className="tracking-wider">
          AUSADHI <span className="text-green-600">MITRA</span>
        </div>
      </nav>

      {/* Chat Container */}
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="bg-green-600 text-white text-center py-4 text-xl font-semibold">
          AI Doctor Assistant
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-4 rounded-xl shadow-md max-w-3xs ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-white border border-gray-300 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white shadow-md flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Describe your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition flex items-center"
            onClick={sendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatAI;
