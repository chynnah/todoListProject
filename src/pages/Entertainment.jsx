import React, { useState, useEffect } from "react";
import { Smile, RefreshCw, Gamepad2, Music, Zap, Palette, Image } from "lucide-react";
import TicTacToe from '../components/games/TicTacToe';
import Sudoku from '../components/games/Sudoku';
import RockPaperScissors from '../components/games/RockPaperScissors';
import MemoryCardMatch from '../components/games/MemoryCardMatch';
import Crossword from '../components/games/Crossword';
import { useTheme } from "../lib/theme";

const Entertainment = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // State for content
  const [joke, setJoke] = useState("");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState({
    joke: true,
    fact: true,
    animal: true
  });
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [animalImage, setAnimalImage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicProgress, setMusicProgress] = useState(30); // Simulated progress

  // API Fetching
  const fetchJoke = async () => {
    setLoading(prev => ({ ...prev, joke: true }));
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await res.json();
      setJoke(`${data.setup} ${data.punchline}`);
    } catch {
      setJoke("No jokes for now 😅");
    } finally {
      setLoading(prev => ({ ...prev, joke: false }));
    }
  };

  const fetchFact = async () => {
    setLoading(prev => ({ ...prev, fact: true }));
    try {
      const res = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
      const data = await res.json();
      setFact(data.text);
    } finally {
      setLoading(prev => ({ ...prev, fact: false }));
    }
  };

  const fetchAnimalImage = async () => {
    setLoading(prev => ({ ...prev, animal: true }));
    try {
      const res = await fetch("https://api.unsplash.com/photos/random?query=animal&client_id=YOUR_UNSPLASH_ACCESS_KEY");
      const data = await res.json();
      setAnimalImage(data.urls.regular);
    } catch {
      setAnimalImage("");
    } finally {
      setLoading(prev => ({ ...prev, animal: false }));
    }
  };

  const generateLuckyNumber = () => {
    setLoading(prev => ({ ...prev, number: true }));
    setTimeout(() => {
      const number = Math.floor(Math.random() * 100) + 1;
      setLuckyNumber(number);
      setLoading(prev => ({ ...prev, number: false }));
    }, 1000);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Simulate music progress
    if (!isPlaying) {
      const interval = setInterval(() => {
        setMusicProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
      return () => clearInterval(interval);
    }
  };

  // Initialize content
  useEffect(() => {
    fetchJoke();
    fetchFact();
    fetchAnimalImage();
  }, []);

  // Game data
  const games = [
    { name: 'TicTacToe', emoji: '❌⭕', label: 'Tic-Tac-Toe' },
    { name: 'RockPaperScissors', emoji: '🪨📄✂️', label: 'RPS' },
    { name: 'MemoryCardMatch', emoji: '🃏', label: 'Memory' },
    { name: 'Sudoku', emoji: '🔢', label: 'Sudoku' },
    { name: 'Crossword', emoji: '✏️', label: 'Crossword' }
  ];

  return (
    <div className="min-h-screen p-4 text-[#053C5E] dark:text-gray-200 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 rounded-xl p-6 bg-[#A31621] dark:bg-[#FF4757] text-white">
        <h1 className="text-2xl font-bold">Entertainment Hub</h1>
        <p className="opacity-90">Your daily dose of fun and relaxation</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Content Widgets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Joke Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-[#A9BFA8] dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Smile className="text-[#A31621] dark:text-[#FF4757]" /> 
                Joke of the Day
              </h2>
              <button 
                onClick={fetchJoke}
                className="flex items-center gap-1 text-sm text-[#A31621] dark:text-[#FF4757] hover:underline"
              >
                <RefreshCw size={16} /> Refresh
              </button>
            </div>
            {loading.joke ? (
              <div className="h-16 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#A31621] dark:border-[#FF4757]"></div>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{joke}</p>
            )}
          </div>

          {/* Fact Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-[#A9BFA8] dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="text-[#A31621] dark:text-[#FF4757]" />
                Did You Know?
              </h2>
              <button 
                onClick={fetchFact}
                className="flex items-center gap-1 text-sm text-[#A31621] dark:text-[#FF4757] hover:underline"
              >
                <RefreshCw size={16} /> Refresh
              </button>
            </div>
            {loading.fact ? (
              <div className="h-16 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#A31621] dark:border-[#FF4757]"></div>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{fact}</p>
            )}
          </div>

          {/* Games Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-[#A9BFA8] dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Gamepad2 className="text-[#A31621] dark:text-[#FF4757]" /> Games
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {games.map((game) => (
                <button
                  key={game.name}
                  onClick={() => setSelectedGame(game.name)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedGame === game.name 
                      ? 'bg-[#A31621] dark:bg-[#FF4757] text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="text-2xl block mb-1">{game.emoji}</span>
                  <span className="text-xs">{game.label}</span>
                </button>
              ))}
            </div>

            <div className="min-h-64 rounded-lg border border-[#A9BFA8] dark:border-gray-700 p-4">
              {selectedGame === 'TicTacToe' && <TicTacToe />}
              {selectedGame === 'RockPaperScissors' && <RockPaperScissors />}
              {selectedGame === 'MemoryCardMatch' && <MemoryCardMatch />}
              {selectedGame === 'Sudoku' && <Sudoku />}
              {selectedGame === 'Crossword' && <Crossword />}
              
              {!selectedGame && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <Gamepad2 size={48} className="mb-4 opacity-50" />
                  <p>Select a game to play</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Side Widgets */}
        <div className="space-y-6">
          {/* Lucky Number */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-[#A9BFA8] dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="text-[#A31621] dark:text-[#FF4757]" />
              Lucky Number
            </h2>
            
            <div className="flex flex-col items-center justify-center py-4">
              {loading.number ? (
                <div className="h-24 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A31621] dark:border-[#FF4757]"></div>
                </div>
              ) : (
                luckyNumber && (
                  <div className="w-20 h-20 rounded-full bg-[#A31621] dark:bg-[#FF4757] flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-white">{luckyNumber}</span>
                  </div>
                )
              )}
              
              <button 
                onClick={generateLuckyNumber}
                className="w-full py-2 bg-[#A31621] dark:bg-[#FF4757] text-white rounded-lg hover:bg-[#8A1320] dark:hover:bg-[#E03E4E] transition-colors"
              >
                {luckyNumber ? "Generate New" : "Get Lucky Number"}
              </button>
            </div>
          </div>

          {/* Relaxation Section */}
          <div className="space-y-6">
            {/* Music Player */}
            <div className="bg-[#053C5E] dark:bg-gray-800 rounded-xl p-6 text-white dark:text-gray-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Music className="text-white dark:text-[#FF4757]" />
                Relaxation Music
              </h2>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleMusic}
                  className="w-10 h-10 rounded-full bg-white text-[#053C5E] flex items-center justify-center"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <div className="flex-1">
                  <p className="font-medium">Nature Sounds</p>
                  <div className="w-full bg-white/30 h-1.5 rounded-full mt-2">
                    <div 
                      className="h-full rounded-full bg-white" 
                      style={{ width: `${musicProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animal Picture */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-[#A9BFA8] dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Image className="text-[#A31621] dark:text-[#FF4757]" />
                  Cute Animal
                </h2>
                <button 
                  onClick={fetchAnimalImage}
                  className="flex items-center gap-1 text-sm text-[#A31621] dark:text-[#FF4757] hover:underline"
                >
                  <RefreshCw size={16} /> New
                </button>
              </div>
              
              {loading.animal ? (
                <div className="h-48 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A31621] dark:border-[#FF4757]"></div>
                </div>
              ) : animalImage ? (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={animalImage} 
                    alt="Random animal" 
                    className="w-full h-48 object-cover"
                    onError={() => setAnimalImage("")}
                  />
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No image available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;