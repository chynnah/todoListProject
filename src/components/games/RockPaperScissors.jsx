import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [gameInProgress, setGameInProgress] = useState(false);
  
  const choices = [
    { name: "rock", emoji: "🪨", beats: "scissors" },
    { name: "paper", emoji: "📄", beats: "rock" },
    { name: "scissors", emoji: "✂️", beats: "paper" },
  ];

  const determineWinner = (player, computer) => {
    if (player === computer) return "draw";
    
    const playerChoiceObj = choices.find(choice => choice.name === player);
    if (playerChoiceObj.beats === computer) {
      return "win";
    } else {
      return "lose";
    }
  };

  const handlePlayerChoice = (choice) => {
    if (gameInProgress) return;
    
    setGameInProgress(true);
    setPlayerChoice(choice);
    
    // Simulate computer thinking
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerSelection = choices[randomIndex].name;
      setComputerChoice(computerSelection);
      
      const gameResult = determineWinner(choice, computerSelection);
      
      if (gameResult === "win") {
        setResult("You win!");
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (gameResult === "lose") {
        setResult("Computer wins!");
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      } else {
        setResult("It's a draw!");
      }
      
      setGameInProgress(false);
    }, 800);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  const resetScore = () => {
    resetGame();
    setScore({ player: 0, computer: 0 });
  };
  
  const getEmojiByChoice = (choiceName) => {
    return choices.find(choice => choice.name === choiceName)?.emoji || '';
  };

  return (
    <div className="w-full">
      {/* Score display */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">You</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{score.player}</p>
        </div>
        <div className="mx-4 text-xl text-gray-400">vs</div>
        <div className="text-center flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Computer</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{score.computer}</p>
        </div>
      </div>

      {/* Result display */}
      {result && (
        <div className={`text-center p-3 rounded-lg mb-4 font-medium ${
          result === "You win!" 
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
            : result === "Computer wins!" 
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        }`}>
          {result}
        </div>
      )}

      {/* Choices display */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="w-24 h-24 rounded-xl flex items-center justify-center border-2 border-dashed border-purple-200 dark:border-purple-700">
          {playerChoice ? (
            <span className="text-4xl">{getEmojiByChoice(playerChoice)}</span>
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">Your choice</span>
          )}
        </div>
        
        <div className="text-2xl text-gray-400">vs</div>
        
        <div className="w-24 h-24 rounded-xl flex items-center justify-center border-2 border-dashed border-indigo-200 dark:border-indigo-700">
          {computerChoice ? (
            <span className="text-4xl">{getEmojiByChoice(computerChoice)}</span>
          ) : gameInProgress ? (
            <div className="animate-bounce text-gray-400">🤔</div>
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">Computer</span>
          )}
        </div>
      </div>

      {/* Player choice buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => handlePlayerChoice(choice.name)}
            disabled={gameInProgress}
            className={`py-3 rounded-lg transition-all ${
              gameInProgress
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-purple-100 dark:hover:bg-purple-900/30"
            } ${
              playerChoice === choice.name
                ? "bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-400 dark:ring-purple-600"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1">{choice.emoji}</span>
              <span className="text-xs font-medium capitalize">{choice.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Game controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={resetGame}
          className="flex items-center gap-1 text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 py-1.5 px-3 rounded-lg transition-colors"
        >
          <RotateCcw size={14} /> New Round
        </button>
        
        <button
          onClick={resetScore}
          className="flex items-center gap-1 text-sm bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/40 py-1.5 px-3 rounded-lg transition-colors"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
};

export default RockPaperScissors;