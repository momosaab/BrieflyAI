import React, { useState, useEffect } from 'react';
import { quantum } from 'ldrs';
import './LoadingScreen.css'; // Import a CSS file for custom styles

quantum.register();

const LoadingScreen = () => {
  const wisdomMessages = [
    "Brevity breeds clarity.",
    "Conciseness illuminates comprehension.",
    "In summaries lies clarity's key.",
    "Briefing, the art of distillation.",
    "In summary, lies mastery.",
    "Summarize to crystallize.",
    "Simplify, magnify.",
    "Briefing - the path to enlightenment.",
    "Clarity forged in succinctness.",
    "Condense for comprehension."
  ];

  const [randomWisdom, setRandomWisdom] = useState(null);

  useEffect(() => {
    // Generate a random wisdom message when the component mounts
    generateRandomWisdom();
  }, []);

  // Function to generate and set a random wisdom message
  const generateRandomWisdom = () => {
    const randomIndex = Math.floor(Math.random() * wisdomMessages.length);
    setRandomWisdom(wisdomMessages[randomIndex]);
  };

  return (
    <div className="loading-container"> {/* Wrapper container */}
      <div className="loading-quantum-container"> {/* Container for loading quantum */}
        <l-quantum
          className="loading-quantum" // Add a custom class for styling
          size="90" // Adjust the size as needed
          speed="1.75"
          color="black"
        ></l-quantum>
      </div>
      {randomWisdom && (
        <div className="wisdom-message">
          Loading Screen Wisdom: {randomWisdom}
        </div>
      )}
    </div>
  );
}

export default LoadingScreen;
