import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Zap, Loader2 } from 'lucide-react';

// Emoji cards organized by difficulty level
const cardSets = {
  easy: [
    { value: '🐶', name: 'dog' },
    { value: '🐱', name: 'cat' },
    { value: '🐰', name: 'rabbit' },
    { value: '🐼', name: 'panda' },
    { value: '🦊', name: 'fox' },
    { value: '🦁', name: 'lion' },
  ],
  medium: [
    { value: '🍎', name: 'apple' },
    { value: '🍌', name: 'banana' },
    { value: '🍓', name: 'strawberry' },
    { value: '🍇', name: 'grapes' },
    { value: '🍉', name: 'watermelon' },
    { value: '🍒', name: 'cherries' },
    { value: '🥑', name: 'avocado' },
    { value: '🍍', name: 'pineapple' },
  ],
  hard: [
    { value: '🚗', name: 'car' },
    { value: '🚲', name: 'bicycle' },
    { value: '✈️', name: 'airplane' },
    { value: '⛵', name: 'sailboat' },
    { value: '🚀', name: 'rocket' },
    { value: '🚂', name: 'train' },
    { value: '🚁', name: 'helicopter' },
    { value: '🛵', name: 'scooter' },
    { value: '🚢', name: 'ship' },
    { value: '🏍️', name: 'motorcycle' },
  ]
};

const MemoryCardMatch = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bestScores, setBestScores] = useState({
    easy: localStorage.getItem('memoryGameBestEasy') || '—',
    medium: localStorage.getItem('memoryGameBestMedium') || '—',
    hard: localStorage.getItem('memoryGameBestHard') || '—',
  });

  // Initialize cards based on difficulty
  const initializeGame = () => {
    setIsLoading(true);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setGameCompleted(false);
    
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    // Create a pair of each card for the selected difficulty
    let selectedCards = cardSets[difficulty];
    
    // For beginner, use fewer cards
    if (difficulty === 'easy') {
      selectedCards = selectedCards.slice(0, 4);
    } else if (difficulty === 'medium') {
      selectedCards = selectedCards.slice(0, 6);
    }
    
    // Create pairs and shuffle
    const cardPairs = [...selectedCards, ...selectedCards].map((card, index) => ({
      id: index,
      value: card.value,
      name: card.name,
      isMatched: false,
      isFlipped: false
    }));
    
    // Fisher-Yates shuffle
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    setTimeout(() => {
      setCards(cardPairs);
      setIsLoading(false);
    }, 500);
  };

  // Start game and timer
  const startGame = () => {
    setGameStarted(true);
    initializeGame();
    
    // Start the timer
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    
    setTimerInterval(interval);
  };

  const flipCard = (index) => {
    // Prevent flipping if already 2 cards are flipped, or this card is already flipped/matched
    if (flipped.length === 2) return;
    if (flipped.includes(index)) return;
    if (matched.includes(index)) return;
    
    setFlipped([...flipped, index]);
    
    // Check for match when 2 cards are flipped
    if (flipped.length === 1) {
      setMoves(prevMoves => prevMoves + 1);
      
      const firstCardIndex = flipped[0];
      const secondCardIndex = index;
      
      if (cards[firstCardIndex].value === cards[secondCardIndex].value) {
        setMatched([...matched, firstCardIndex, secondCardIndex]);
        setFlipped([]);
      } else {
        // Flip back after a delay if no match
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  };
  
  // Check for game completion
  useEffect(() => {
    if (gameStarted && matched.length > 0 && matched.length === cards.length) {
      setGameCompleted(true);
      clearInterval(timerInterval);
      
      // Update best score if faster
      const currentScore = `${moves} moves in ${formatTime(timer)}`;
      const currentKey = `memoryGameBest${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
      
      // Save best score if it's the first one or better than previous
      if (bestScores[difficulty] === '—' || timer < parseInt(localStorage.getItem(`memoryGameTime${difficulty}`))) {
        localStorage.setItem(currentKey, currentScore);
        localStorage.setItem(`memoryGameTime${difficulty}`, timer.toString());
        
        setBestScores({
          ...bestScores,
          [difficulty]: currentScore
        });
      }
    }
  }, [matched, cards, gameStarted, timerInterval, moves, timer, difficulty, bestScores]);
  
  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col h-full">
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <h1 className="text-2xl font-bold text-[#FF1654]">Memory Card Match</h1>
          
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold text-[#283D3B] mb-4">Select Difficulty</h2>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-lg transition-all font-medium ${
                    difficulty === level 
                      ? 'bg-[#FF1654] text-white' 
                      : 'bg-gray-100 text-[#283D3B] hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-sm font-semibold text-[#283D3B] mb-2 flex items-center">
                <Trophy size={16} className="mr-1 text-[#FF1654]" /> Best Scores
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Easy:</span>
                  <span className="font-medium">{bestScores.easy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium:</span>
                  <span className="font-medium">{bestScores.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard:</span>
                  <span className="font-medium">{bestScores.hard}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="w-full bg-[#FF1654] text-white rounded-lg py-2.5 px-4 hover:bg-opacity-90 transition duration-300 flex items-center justify-center gap-2 font-medium shadow-sm"
            >
              <Zap size={16} /> Start Game
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Game header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#FF1654]">Memory Match</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#283D3B] bg-gray-100 px-3 py-1 rounded-lg">
                <Clock size={16} className="text-[#FF1654]" />
                <span className="font-medium">{formatTime(timer)}</span>
              </div>
              <div className="flex items-center gap-1 text-[#283D3B] bg-gray-100 px-3 py-1 rounded-lg">
                <Zap size={16} className="text-[#FF1654]" />
                <span className="font-medium">{moves} Moves</span>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 size={48} className="animate-spin text-[#FF1654]" />
            </div>
          ) : gameCompleted ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-gray-50 rounded-xl p-8">
              <div className="text-4xl">🎉</div>
              <h2 className="text-2xl font-bold text-[#FF1654]">Congratulations!</h2>
              <div className="text-center">
                <p className="text-lg text-[#283D3B] mb-2">You completed the {difficulty} level</p>
                <p className="text-[#283D3B] font-medium">
                  {moves} moves in {formatTime(timer)}
                </p>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setTimerInterval(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-[#283D3B] rounded-lg hover:bg-gray-300 transition"
                >
                  Change Level
                </button>
                <button
                  onClick={() => startGame()}
                  className="px-4 py-2 bg-[#FF1654] text-white rounded-lg hover:bg-opacity-90 transition flex items-center gap-2"
                >
                  <Zap size={16} /> Play Again
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className={`grid gap-3 ${
                difficulty === 'easy' ? 'grid-cols-4' : 
                difficulty === 'medium' ? 'grid-cols-4 md:grid-cols-5' : 
                'grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
              }`}>
                {cards.map((card, index) => (
                  <button
                    key={index}
                    onClick={() => flipCard(index)}
                    disabled={flipped.includes(index) || matched.includes(index)}
                    className={`card w-16 h-16 sm:w-20 sm:h-20 ${
                      flipped.includes(index) || matched.includes(index) 
                        ? 'bg-white' : 'bg-[#FF1654]'
                    } ${
                      matched.includes(index) ? 'bg-green-100' : ''
                    } rounded-lg flex items-center justify-center text-3xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform ${
                      flipped.includes(index) || matched.includes(index) ? 'rotate-0' : ''
                    } ${
                      flipped.includes(index) && !matched.includes(index) ? 'ring-2 ring-[#FF1654]' : ''
                    }`}
                  >
                    {flipped.includes(index) || matched.includes(index) ? (
                      <span className="transition-all duration-300 transform scale-100">
                        {card.value}
                      </span>
                    ) : (
                      <span className="text-white">?</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Game footer (only show when game is active and not completed) */}
          {gameStarted && !gameCompleted && !isLoading && (
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  setGameStarted(false);
                  clearInterval(timerInterval);
                }}
                className="text-[#283D3B] hover:text-[#FF1654] transition"
              >
                Exit Game
              </button>
              <button
                onClick={initializeGame}
                className="text-[#FF1654] font-medium hover:underline transition"
              >
                Restart
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryCardMatch;