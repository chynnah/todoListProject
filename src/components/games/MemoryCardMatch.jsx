import React, { useState, useEffect } from "react";
import { RotateCcw, Clock } from "lucide-react";

const MemoryCardMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Card emojis with their corresponding ids
  const cardEmojis = [
    { id: 1, emoji: "🐶" },
    { id: 2, emoji: "🐱" },
    { id: 3, emoji: "🐭" },
    { id: 4, emoji: "🐹" },
    { id: 5, emoji: "🐰" },
    { id: 6, emoji: "🦊" },
    { id: 7, emoji: "🐻" },
    { id: 8, emoji: "🐼" },
  ];

  // Initialize/reset game
  const initializeGame = () => {
    // Create a duplicate set of cards and assign unique keys
    const duplicatedCards = [...cardEmojis, ...cardEmojis].map((card, index) => ({
      ...card,
      key: `${card.id}-${index}`,
      flipped: false,
      solved: false,
    }));

    // Shuffle the cards
    const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
    
    // Reset game state
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setMoves(0);
    setGameCompleted(false);
    setTimer(0);
    
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    setGameStarted(false);
  };

  // Start the game timer
  const startTimer = () => {
    if (timerInterval) return;
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    setTimerInterval(interval);
  };

  // Handle card click
  const handleCardClick = (clickedIndex) => {
    // Prevent clicking if game is disabled or card is already flipped/solved
    if (
      disabled || 
      flipped.includes(clickedIndex) || 
      solved.includes(clickedIndex)
    ) return;
    
    // Start game and timer on first click
    if (!gameStarted) {
      setGameStarted(true);
      startTimer();
    }
    
    // Flip the card
    const newFlipped = [...flipped, clickedIndex];
    setFlipped(newFlipped);
    
    // If this is the second card flipped
    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves(prev => prev + 1);
      
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
      
      // Check if cards match
      if (firstCard.id === secondCard.id) {
        setSolved(prev => [...prev, firstIndex, secondIndex]);
        setFlipped([]);
        setDisabled(false);
      } else {
        // If cards don't match, flip them back after a delay
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  // Check if game is completed
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setGameCompleted(true);
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  }, [solved, cards, timerInterval]);

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      {/* Game stats */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 py-1 px-2 rounded-md text-sm">
            <Clock size={14} /> {formatTime(timer)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Moves: <span className="font-semibold">{moves}</span>
          </div>
        </div>
        
        <button
          onClick={initializeGame}
          className="flex items-center gap-1 text-sm bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40 py-1.5 px-3 rounded-lg transition-colors"
        >
          <RotateCcw size={14} /> New Game
        </button>
      </div>

      {/* Game completed message */}
      {gameCompleted && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-center">
          <p className="font-medium">Congratulations! You completed the game!</p>
          <p className="text-sm">Time: {formatTime(timer)} | Moves: {moves}</p>
        </div>
      )}

      {/* Game board */}
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <button
            key={card.key}
            onClick={() => handleCardClick(index)}
            className={`aspect-square rounded-lg transition-all transform ${
              flipped.includes(index) || solved.includes(index)
                ? "bg-green-100 dark:bg-green-900/30 shadow-md rotate-y-180"
                : "bg-gradient-to-br from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700"
            } ${
              solved.includes(index)
                ? "ring-2 ring-green-500 dark:ring-green-400"
                : ""
            }`}
            disabled={disabled || solved.includes(index)}
          >
            <div className="h-full w-full flex items-center justify-center">
              {(flipped.includes(index) || solved.includes(index)) ? (
                <span className="text-2xl">{card.emoji}</span>
              ) : (
                <span className="text-white text-2xl">?</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryCardMatch;