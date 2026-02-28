import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function ValentineInvitation() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 250 });
  const [hoverCount, setHoverCount] = useState(0);

  const handleYesClick = () => {
    setAccepted(true);
  };

  const handleNoHover = () => {
    setHoverCount(prev => prev + 1);
    
    // Generate a random position far from current position
    const directions = [
      { x: -250, y: -100 },
      { x: 250, y: -100 },
      { x: -250, y: 100 },
      { x: 250, y: 100 },
      { x: 0, y: -120 },
      { x: 0, y: 120 },
      { x: -280, y: 0 },
      { x: 280, y: 0 }
    ];
    
    // Pick a random direction that's far from current position
    const availableDirections = directions.filter(dir => {
      const newLeft = dir.x;
      const newTop = dir.y;
      const distanceFromCurrent = Math.sqrt(
        Math.pow(newLeft - noButtonPosition.left, 2) + 
        Math.pow(newTop - noButtonPosition.top, 2)
      );
      // Make sure it moves at least 200px away
      return distanceFromCurrent > 200;
    });
    
    const randomDir = availableDirections.length > 0 
      ? availableDirections[Math.floor(Math.random() * availableDirections.length)]
      : directions[Math.floor(Math.random() * directions.length)];
    
    setNoButtonPosition({
      top: randomDir.y,
      left: randomDir.x
    });
  };

  if (accepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-pink-200 flex items-center justify-center p-4">
        <div className="text-center space-y-6 animate-pulse">
          <div className="flex justify-center gap-2 mb-4">
            <Sparkles className="text-yellow-500 w-12 h-12 animate-spin" />
            <Heart className="text-red-500 w-16 h-16 animate-bounce" />
            <Sparkles className="text-yellow-500 w-12 h-12 animate-spin" />
          </div>
          
          <h1 className="text-5xl font-bold text-red-600 mb-4">
            Yay! That's a Great Choice! 🎉
          </h1>
          
          <img 
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGUxajc3eHZjNnI1ejZiZ2Rmcnk2YjUzMTh3aGd3cGE3aGh0cHZ5ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BgMfV0moQcwJqufUGS/giphy.gif"
            alt="Celebration"
            className="mx-auto rounded-lg shadow-2xl max-w-md w-full"
          />
          
          <p className="text-2xl text-pink-700 font-semibold">
            Can't wait to celebrate with you! 💕
          </p>
          
          <div className="flex justify-center gap-3 pt-4">
            {[...Array(5)].map((_, i) => (
              <Heart 
                key={i} 
                className="text-red-500 w-8 h-8 animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-red-300 opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-3xl w-full text-center relative z-10">
        <Heart className="text-red-500 w-20 h-20 mx-auto mb-6 animate-bounce" />
        
        <h1 className="text-6xl font-bold text-red-600 mb-8">
          So do you love me? I dare you to say no LOL!
        </h1>
        
        <p className="text-xl text-gray-600 mb-12">
          I promise to make it special! 💝
        </p>
        
        <div className="flex justify-center items-center gap-6 relative" style={{ minHeight: '300px', padding: '100px 0' }}>
          <button
            onClick={handleYesClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-12 rounded-full text-2xl transform hover:scale-110 transition-all duration-200 shadow-lg z-10"
          >
            Yes! 💕
          </button>
          
          <button
            onMouseEnter={handleNoHover}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg cursor-pointer absolute"
            style={{
              transform: `translate(${noButtonPosition.left}px, ${noButtonPosition.top}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            No 😢
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mt-8 italic">
          Hint: The "No" button is a bit shy... 😊
        </p>
      </div>
    </div>
  );
}