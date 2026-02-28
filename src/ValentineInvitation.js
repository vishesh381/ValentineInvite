import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function ValentineInvitation() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 250 });
  const [hoverCount, setHoverCount] = useState(0);

  const handleYesClick = () => {
    setAccepted(true);
  };

  const handleNoEscape = (e) => {
    if (e.cancelable) e.preventDefault();
    setHoverCount(prev => prev + 1);

    // Scale movement to screen size so button stays on-screen on mobile
    const maxX = Math.min(220, window.innerWidth * 0.3);
    const maxY = Math.min(110, window.innerHeight * 0.15);

    const directions = [
      { x: -maxX, y: -maxY },
      { x:  maxX, y: -maxY },
      { x: -maxX, y:  maxY },
      { x:  maxX, y:  maxY },
      { x: 0,     y: -maxY * 1.2 },
      { x: 0,     y:  maxY * 1.2 },
      { x: -maxX * 1.1, y: 0 },
      { x:  maxX * 1.1, y: 0 },
    ];

    const availableDirections = directions.filter(dir => {
      const dist = Math.sqrt(
        Math.pow(dir.x - noButtonPosition.left, 2) +
        Math.pow(dir.y - noButtonPosition.top, 2)
      );
      return dist > 100;
    });

    const randomDir = availableDirections.length > 0
      ? availableDirections[Math.floor(Math.random() * availableDirections.length)]
      : directions[Math.floor(Math.random() * directions.length)];

    setNoButtonPosition({ top: randomDir.y, left: randomDir.x });
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
          
          <h1 className="text-3xl md:text-5xl font-bold text-red-600 mb-4">
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
//comit
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

      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 max-w-3xl w-full text-center relative z-10">
        <Heart className="text-red-500 w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 animate-bounce" />

        <h1 className="text-3xl md:text-6xl font-bold text-red-600 mb-6 md:mb-8">
          So do you love me? I dare you to say no LOL!
        </h1>

        <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12">
          I promise to make it special! 💝
        </p>

        <div className="flex justify-center items-center gap-6 relative" style={{ minHeight: '240px', padding: '80px 0' }}>
          <button
            onClick={handleYesClick}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-full text-xl md:text-2xl transform hover:scale-110 transition-all duration-200 shadow-lg z-10"
          >
            Yes! 💕
          </button>

          <button
            onMouseEnter={handleNoEscape}
            onTouchStart={handleNoEscape}
            className="bg-red-500 text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-full text-xl md:text-2xl shadow-lg cursor-pointer absolute select-none"
            style={{
              transform: `translate(${noButtonPosition.left}px, ${noButtonPosition.top}px)`,
              transition: 'transform 0.3s ease-out',
              touchAction: 'none',
            }}
          >
            No 😢
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-4 md:mt-8 italic">
          Hint: The "No" button is a bit shy... 😊
        </p>
      </div>
    </div>
  );
}