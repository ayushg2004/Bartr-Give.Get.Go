import React from "react";
import Logo from "@/components/Logo"; // Ensure this path is correct

const EmptyChat = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-gray-500 bg-gray-100">
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
            backgroundImage: `url("https://barter-hive.s3.us-east-1.amazonaws.com/chat-background.webp")`,
            backgroundSize: "cover",  // Ensures full coverage
            backgroundPosition: "center", // Keeps focus centered
            backgroundBlendMode: "overlay", // Softens the effect
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Light tint for more softness
        }}
        />

      <Logo className="w-24 h-24 mb-4 z-10" /> {/* Adjust size if needed */}
      <p className="text-2xl font-medium z-10">Select a chat to start messaging</p>
    </div>
  );
};

export default EmptyChat;