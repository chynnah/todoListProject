import React, { useState, useEffect } from 'react';
import { RotateCw, Trophy, Award } from 'lucide-react';

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ user: 0, computer: 0, ties: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const choices = [
    { emoji: '🪨', name: 'Rock', color: 'bg-blue-100' },
    { emoji: '📄', name: 'Paper', color: 'bg-green-100' },
    { emoji: '✂️', name: 'Scissors', color: 'bg-red-100' }
  ];

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleChoice = (choice) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setUserChoice(choice);
    setComputerChoice(null);
    setResult('');

    // Add a slight delay for better UX
    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * 3)];
      setComputerChoice(computerChoice);

      if (choice.emoji === computerChoice.emoji) {
        setResult("It's a tie! 😐");
        setScore(prev => ({ ...prev, ties: prev.ties + 1 }));
      } else if (
        (choice.emoji === '🪨' && computerChoice.emoji === '✂️') ||
        (choice.emoji === '📄' && computerChoice.emoji === '🪨') ||
        (choice.emoji === '✂️' && computerChoice.emoji === '📄')
      ) {
        setResult('You win! 🎉');
        setScore(prev => ({ ...prev, user: prev.user + 1 }));
        setShowConfetti(true);
      } else {
        setResult('You lose! 😢');
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
      setIsAnimating(false);
    }, 800);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ user: 0, computer: 0, ties: 0 });
  };

  const Confetti = () => {
    if (!showConfetti) return null;
    
    return (
      <div className="flex flex-col items-center justify-center p-4 max-w-md mx-auto">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 8 + 6;
          const left = Math.random() * 100;
          const animDuration = Math.random() * 2 + 2;
          const delay = Math.random();
          const color = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500'][Math.floor(Math.random() * 5)];
          
          return (
            <div 
              key={i}
              className={`absolute ${color} rounded-full opacity-70`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: '-20px',
                animation: `confetti ${animDuration}s ease-in forwards ${delay}s`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-md mx-auto">
      {showConfetti && <Confetti />}
      
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(720deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          75% { transform: translateX(5px) rotate(5deg); }
        }
      `}</style>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-12 h-12 bg-white rounded-full -translate-x-6 -translate-y-6"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full translate-x-8 translate-y-8"></div>
          </div>
          <h1 className="text-3xl font-bold text-white">Rock Paper Scissors</h1>
          <p className="text-white opacity-90 mt-1">Choose your weapon</p>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b">
          <div className="text-center transform transition-transform hover:scale-105">
            <div className="flex items-center justify-center mb-1">
              <Trophy size={16} className="text-green-500 mr-1" />
              <p className="text-sm font-medium text-gray-500">YOU</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{score.user}</p>
          </div>
          <div className="text-center transform transition-transform hover:scale-105">
            <div className="flex items-center justify-center mb-1">
              <Award size={16} className="text-yellow-500 mr-1" />
              <p className="text-sm font-medium text-gray-500">TIES</p>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{score.ties}</p>
          </div>
          <div className="text-center transform transition-transform hover:scale-105">
            <div className="flex items-center justify-center mb-1">
              <Trophy size={16} className="text-red-500 mr-1" />
              <p className="text-sm font-medium text-gray-500">COM</p>
            </div>
            <p className="text-3xl font-bold text-red-600">{score.computer}</p>
          </div>
        </div>

        {/* Game Area */}
        <div className="p-6">
          {/* Choices */}
          <div className="flex justify-center gap-6 mb-8">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice)}
                disabled={isAnimating}
                className={`w-24 h-24 flex flex-col items-center justify-center text-5xl rounded-xl shadow transition-all duration-300 relative
                  ${userChoice?.emoji === choice.emoji 
                    ? 'ring-4 ring-indigo-400 scale-105' 
                    : 'hover:shadow-md hover:scale-105'}
                  ${choice.color} ${isAnimating ? 'opacity-70' : ''}`}
                style={{
                  animation: userChoice?.emoji === choice.emoji ? 'pulse 1s ease-in-out infinite' : 'none'
                }}
              >
                <div className="absolute inset-0 bg-white rounded-xl opacity-0 hover:opacity-20 transition-opacity"></div>
                {choice.emoji}
                <span className="text-xs font-medium mt-1 text-gray-700">{choice.name}</span>
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="text-center mb-6">
            {userChoice && (
              <div className="space-y-4">
                <div className="flex justify-center items-center gap-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Your choice</p>
                    <div className={`text-5xl p-4 rounded-lg ${userChoice.color} shadow-inner`}
                         style={{ animation: result.includes('win') ? 'shake 0.5s ease-in-out' : 'none' }}>
                      {userChoice.emoji}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                    <span className="text-gray-400 font-bold">VS</span>
                  </div>
                  
                  {computerChoice ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Computer</p>
                      <div className={`text-5xl p-4 rounded-lg ${computerChoice.color} shadow-inner`}
                           style={{ animation: result.includes('lose') ? 'shake 0.5s ease-in-out' : 'none' }}>
                        {computerChoice.emoji}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Computer</p>
                      <div className="text-5xl p-4 rounded-lg bg-gray-100 shadow-inner flex items-center justify-center w-16 h-16">
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                      </div>
                    </div>
                  )}
                </div>

                <h3 className={`text-2xl font-bold mt-4 ${
                  result.includes('win') ? 'text-green-600' : 
                  result.includes('lose') ? 'text-red-600' : 
                  'text-yellow-600'
                }`}>
                  {result}
                </h3>
              </div>
            )}
          </div>

          {/* Reset Button */}
          {(score.user > 0 || score.computer > 0 || score.ties > 0) && (
            <div className="flex justify-center">
              <button
                onClick={resetGame}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors flex items-center gap-2 group"
              >
                <RotateCw size={16} className="text-gray-500 group-hover:rotate-180 transition-transform duration-500" />
                Reset Game
              </button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="py-3 bg-gray-50 text-center text-xs text-gray-500 border-t">
          Play responsibly. Best of luck!
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;