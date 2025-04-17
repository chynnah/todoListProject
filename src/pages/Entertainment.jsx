import React, { useState, useEffect } from "react";
import { Smile, RefreshCw, Gamepad2, Music, Zap, Palette, Image, Star, X } from "lucide-react";
import TicTacToe from "../components/games/TicTacToe";
import RockPaperScissors from "../components/games/RockPaperScissors";
import Sudoku from "../components/games/Sudoku";
import MemoryCardMatch from "../components/games/MemoryCardMatch";
import Crossword from "../components/games/Crossword";

const Entertainment = () => {

  const [joke, setJoke] = useState("");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState({
    joke: true,
    fact: true,
    animal: true,
    number: false
  });
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [animalImage, setAnimalImage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicProgress, setMusicProgress] = useState(30);
  const [activeTab, setActiveTab] = useState("games"); 
  const [currentMood, setCurrentMood] = useState(null);

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
    generateLuckyNumber();
  }, []);

  // Game data
  const games = [
    { name: 'TicTacToe', emoji: '❌⭕', label: 'Tic-Tac-Toe', color: 'from-blue-500 to-indigo-600' },
    { name: 'RockPaperScissors', emoji: '🪨📄✂️', label: 'RPS', color: 'from-purple-500 to-pink-600' },
    { name: 'MemoryCardMatch', emoji: '🃏', label: 'Memory', color: 'from-green-500 to-emerald-600' },
    { name: 'Sudoku', emoji: '🔢', label: 'Sudoku', color: 'from-amber-500 to-orange-600' },
    { name: 'Crossword', emoji: '✏️', label: 'Crossword', color: 'from-rose-500 to-red-600' }
  ];

  // Render the selected game component
  const renderGameComponent = () => {
    switch(selectedGame) {
      case 'TicTacToe':
        return <TicTacToe />;
      case 'RockPaperScissors':
        return <RockPaperScissors />;
      case 'MemoryCardMatch':
        return <MemoryCardMatch />;
      case 'Sudoku':
        return <Sudoku />;
      case 'Crossword':
        return <Crossword />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <Gamepad2 size={48} className="mb-4 opacity-40" />
            <p className="font-medium">Select a game to play</p>
            <p className="text-sm mt-2 opacity-80">Challenge yourself with fun interactive games</p>
          </div>
        );
    }
  };

  // Mood tracker
  const moods = [
    { emoji: "😀", label: "Happy", color: "bg-yellow-400" },
    { emoji: "😌", label: "Calm", color: "bg-sky-400" },
    { emoji: "😴", label: "Tired", color: "bg-indigo-400" },
    { emoji: "😢", label: "Sad", color: "bg-blue-400" },
    { emoji: "😤", label: "Stressed", color: "bg-orange-400" },
    { emoji: "🤩", label: "Excited", color: "bg-pink-400" },
  ];

  // Music playlists
  const playlists = [
    { name: "Nature Sounds", icon: "🌳", duration: "1:30:00" },
    { name: "Relaxing Jazz", icon: "🎷", duration: "45:20" },
    { name: "Focus Beats", icon: "🎧", duration: "1:15:00" },
    { name: "Meditation", icon: "🧘", duration: "30:15" },
  ];

  // Tab data for mobile view
  const tabs = [
    { id: "games", label: "Games", icon: <Gamepad2 size={18} /> },
    { id: "relax", label: "Relax", icon: <Music size={18} /> },
    { id: "discover", label: "Discover", icon: <Zap size={18} /> },
  ];

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-600 dark:border-fuchsia-400"></div>
    </div>
  );

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Floating Background Elements (decorative) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-900/20 dark:to-purple-900/20 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-900/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-900/20 dark:to-yellow-900/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 relative overflow-hidden rounded-2xl p-8 bg-[#A31621] dark:bg-[#FF4757] text-white shadow-xl shadow-purple-500/20 dark:shadow-purple-700/30">
          {/* Abstract shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-10 w-32 h-32 bg-white opacity-10 rounded-full translate-y-1/3"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  Entertainment Hub 
                  <span className="text-2xl">✨</span>
                </h1>
                <p className="opacity-90 text-lg">Your daily dose of fun and relaxation</p>
              </div>
              
              {/* Mood Tracker */}
              <div className="mt-4 md:mt-0">
                <p className="text-sm font-medium mb-2 opacity-90">How are you feeling today?</p>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => setCurrentMood(mood)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                        currentMood?.label === mood.label 
                        ? `${mood.color} ring-2 ring-white scale-110` 
                        : `${mood.color} opacity-70 hover:opacity-100`
                      }`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {currentMood && (
              <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/20 text-sm">
                <span>You're feeling {currentMood.label}</span>
                <button 
                  onClick={() => setCurrentMood(null)}
                  className="p-0.5 rounded-full hover:bg-white/20"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile navigation tabs */}
        <div className="md:hidden mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 transition-colors ${
                  activeTab === tab.id
                    ? "text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-900/20"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                {tab.icon}
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Games and Activities */}
          <div className={`lg:col-span-2 space-y-6 ${activeTab !== 'games' && activeTab !== 'discover' ? 'hidden md:block' : ''}`}>
            {/* Games Section */}
            <div className={`${activeTab !== 'games' && activeTab !== 'discover' ? 'hidden md:block' : ''}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30 shadow-md shadow-purple-500/5 dark:shadow-purple-900/10">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-400">
                  <Gamepad2 className="h-6 w-6" /> 
                  <span>Game Zone</span>
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                  {games.map((game) => (
                    <button
                      key={game.name}
                      onClick={() => setSelectedGame(game.name)}
                      className={`relative overflow-hidden p-4 rounded-xl transition-all duration-300
                        ${selectedGame === game.name 
                          ? `bg-gradient-to-br ${game.color} text-white shadow-lg` 
                          : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                        }`}
                    >
                      {/* Decorative circles */}
                      {selectedGame === game.name && (
                        <>
                          <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                          <div className="absolute bottom-0 left-0 w-10 h-10 bg-white opacity-10 rounded-full translate-y-1/3 -translate-x-1/3"></div>
                        </>
                      )}
                      <div className="relative z-10 flex flex-col items-center">
                        <span className="text-3xl block mb-2">{game.emoji}</span>
                        <span className="text-sm font-medium">{game.label}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="min-h-64 rounded-xl border border-purple-100 dark:border-purple-900/30 p-6 bg-purple-50/50 dark:bg-purple-900/10">
                  {selectedGame && (
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                        {games.find(g => g.name === selectedGame)?.label}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Game in progress</p>
                    </div>
                  )}
                  
                  {renderGameComponent()}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={`${activeTab !== 'discover' ? 'hidden md:block' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Joke Widget */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-rose-100 dark:border-rose-900/30 shadow-md shadow-rose-500/5 dark:shadow-rose-900/10 transition-all hover:shadow-lg hover:shadow-rose-500/10 dark:hover:shadow-rose-900/20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-rose-600 dark:text-rose-400">
                      <Smile className="h-5 w-5" /> 
                      <span>Joke of the Day</span>
                    </h2>
                    <button 
                      onClick={fetchJoke}
                      className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-900/20 py-1.5 px-3 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
                    >
                      <RefreshCw size={14} /> New Joke
                    </button>
                  </div>
                  
                  {loading.joke ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="bg-rose-50/50 dark:bg-rose-900/10 rounded-xl p-4 border border-rose-100 dark:border-rose-900/30">
                      <p className="text-gray-700 dark:text-gray-300">{joke}</p>
                    </div>
                  )}
                </div>


                {/* Fact Widget */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30 shadow-md shadow-amber-500/5 dark:shadow-amber-900/10 transition-all hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-900/20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Zap className="h-5 w-5" />
                      <span>Fun Fact</span>
                    </h2>
                    <button 
                      onClick={fetchFact}
                      className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 bg-amber-50 dark:bg-amber-900/20 py-1.5 px-3 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                    >
                      <RefreshCw size={14} /> New Fact
                    </button>
                  </div>
                  
                  {loading.fact ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-900/30">
                      <p className="text-gray-700 dark:text-gray-300">{fact}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Side Widgets */}
          <div className={`space-y-6 ${activeTab !== 'relax' && activeTab !== 'discover' ? 'hidden md:block' : ''}`}>
            {/* Lucky Number Widget */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/30 shadow-md shadow-indigo-500/5 dark:shadow-indigo-900/10 transition-all hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Star className="h-5 w-5" />
                <span>Today's Lucky Number</span>
              </h2>
              
              <div className="flex flex-col items-center justify-center py-4">
                {loading.number ? (
                  <LoadingSpinner />
                ) : (
                  luckyNumber && (
                    <div className="flex items-center justify-center mb-4 relative">
                      {/* Decorative circles */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-indigo-200 dark:bg-indigo-900/30 animate-pulse opacity-40"></div>
                      </div>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 dark:shadow-indigo-600/30 z-10">
                        <span className="text-2xl font-bold text-white">{luckyNumber}</span>
                      </div>
                    </div>
                  )
                )}
                
                <button 
                  onClick={generateLuckyNumber}
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 dark:from-indigo-600 dark:to-blue-700 dark:hover:from-indigo-700 dark:hover:to-blue-800 text-white rounded-xl shadow-md shadow-indigo-500/20 dark:shadow-indigo-600/30 font-medium transition-all hover:shadow-lg hover:scale-105 active:scale-100"
                >
                  {luckyNumber ? "Generate New Number" : "Get Lucky Number"}
                </button>
              </div>
            </div>

            {/* Music Player */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Music className="h-5 w-5" />
                <span>Relaxation Music</span>
              </h2>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <button 
                    onClick={toggleMusic}
                    className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md hover:bg-blue-50 hover:scale-105 active:scale-100 transition-all"
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  <div className="flex-1">
                    <p className="font-medium">Nature Sounds</p>
                    <p className="text-xs text-blue-100">Relaxing Forest Ambience</p>
                    <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-white" 
                        style={{ width: `${musicProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-blue-100">
                  <span>1:28</span>
                  <span>3:45</span>
                </div>
              </div>
              
              <h3 className="text-sm font-medium mb-2 text-blue-100">Your Playlists</h3>
              <div className="space-y-2">
                {playlists.map(playlist => (
                  <div 
                    key={playlist.name}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center">
                      <span>{playlist.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{playlist.name}</p>
                      <p className="text-xs text-blue-200">{playlist.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Animal Picture */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/30 shadow-md shadow-emerald-500/5 dark:shadow-emerald-900/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Image className="h-5 w-5" />
                  <span>Cute Animal</span>
                </h2>
                <button 
                  onClick={fetchAnimalImage}
                  className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 py-1.5 px-3 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <RefreshCw size={14} /> New Pet
                </button>
              </div>
              
              {loading.animal ? (
                <LoadingSpinner />
              ) : animalImage ? (
                <div className="rounded-xl overflow-hidden border border-emerald-100 dark:border-emerald-900/30 shadow-md">
                  <img 
                    src={animalImage} 
                    alt="Random animal" 
                    className="w-full h-64 object-cover"
                    onError={() => setAnimalImage("")}
                  />
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <div className="text-center">
                    <Image size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No image available</p>
                  </div>
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