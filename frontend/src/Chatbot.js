// Chatbot.js
import React, { useState } from "react";
import { Chatbot } from "react-chatbot-kit";  // Import the chatbot library
import "react-chatbot-kit/build/main.css";  // Import chatbot styles

const ChatbotComponent = () => {
  const [openChat, setOpenChat] = useState(false);  // State to control chatbot visibility

  const handleChatClick = () => {
    setOpenChat(!openChat);  // Toggle the chatbot visibility
  };

  return (
    <>
      {/* Button to open/close the chatbot */}
      <button className="chat-btn" onClick={handleChatClick}>
        {openChat ? "Close Chat" : "Chat Now"}
      </button>

      {openChat && (
        <div className="chatbot-container">
          <Chatbot
            config={{/* Your chatbot configurations go here */}}
            actionProvider={{/* Your action provider functions */}}
            messageParser={{/* Your message parsing functions */}}
          />
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;
