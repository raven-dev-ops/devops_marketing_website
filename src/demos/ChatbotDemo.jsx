// demos/ChatbotDemo.jsx

import React, { useState, useEffect, useRef } from 'react';

const demoSuggestions = [
  "What is SaaS development?",
  "Tell me about custom software.",
  "Do you build mobile apps?",
  "Hi",
];

const botResponses = [
  {
    match: ["saas"],
    text: "SaaS (Software as a Service) involves building cloud-hosted apps offered via subscription. We build scalable SaaS platforms!",
  },
  {
    match: ["custom software"],
    text: "Custom software is tailor-made for your specific business needs, providing a perfect fit unlike off-the-shelf options. We excel at creating these.",
  },
  {
    match: ["app development", "mobile app", "web app", "build apps"],
    text: "We develop both web and mobile applications designed to streamline your operations, engage customers, and digitize workflows.",
  },
  {
    match: ["hello", "hi", "hey"],
    text: "Hello there! How can I help you demo Raven Development's services today?",
  },
];

function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  for (const resp of botResponses) {
    if (resp.match.some((phrase) => lowerInput.includes(phrase))) {
      return resp.text;
    }
  }
  if (lowerInput.includes("price") || lowerInput.includes("cost")) {
    return "Pricing depends on your project's requirements. Our quotes are always transparent. For detailed pricing, see the Pricing section or contact us!";
  }
  return "Thanks for your message! As a demo bot, I have limited responses. For a real consultation, please use the contact form.";
}

const ChatbotDemo = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! 👋 Ask me about Raven Development services. Try clicking a suggestion below to get started.',
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim() || isBotTyping) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text },
    ]);
    setInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const botMessage = { sender: 'bot', text: getBotResponse(text) };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 1000 + Math.random() * 400);
  };

  const handleSend = () => sendMessage(input);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col h-[340px]">
      <div className="flex-grow overflow-y-auto mb-3 pr-2 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <span className={`inline-block px-3 py-1.5 rounded-lg max-w-[80%] text-sm ${
              msg.sender === 'user' ? 'bg-raven-blue text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
        {isBotTyping && (
          <div className="flex justify-start">
            <span className="inline-block px-3 py-1.5 rounded-lg bg-gray-200 text-gray-500 text-sm italic animate-pulse">
              Bot is typing...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Bubbles */}
      {!isBotTyping && (
        <div className="flex flex-wrap gap-2 mb-2">
          {demoSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendMessage(suggestion)}
              className="bg-gray-100 hover:bg-raven-blue hover:text-white transition px-3 py-1 rounded-full text-xs border border-gray-200"
              tabIndex={0}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input & Send */}
      <div className="flex mt-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow border border-gray-300 rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-raven-blue"
          placeholder="Type your message..."
          disabled={isBotTyping}
          aria-label="Type your message"
        />
        <button
          onClick={handleSend}
          className={`bg-raven-blue text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200 text-sm ${isBotTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isBotTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotDemo;
