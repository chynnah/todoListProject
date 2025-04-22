import React, { useState, useEffect, useRef } from "react";
import { Smile, RefreshCw, Gamepad2, Zap, Star, X, CheckCircle, Coffee, Battery } from "lucide-react";
import TicTacToe from "../components/games/TicTacToe";
import RockPaperScissors from "../components/games/RockPaperScissors";
import MemoryCardMatch from "../components/games/MemoryCardMatch";

const Entertainment = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeTab, setActiveTab] = useState("games");
  const [productivityTip, setProductivityTip] = useState("");
  const [motivation, setMotivation] = useState("");
  const [loading, setLoading] = useState({
    tip: true,
    motivation: true,
    streak: false
  });
  const [productivityStreak, setProductivityStreak] = useState(() => {
    const saved = localStorage.getItem('todoApp_productivityStreak');
    return saved !== null ? JSON.parse(saved) : null;
  });
  const [currentEnergy, setCurrentEnergy] = useState(() => {
    const saved = localStorage.getItem('todoApp_currentEnergy');
    return saved ? JSON.parse(saved) : { level: "medium", label: "Moderate Energy" };
  });
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Game data
  const games = [
    { name: 'TicTacToe', emoji: '❌⭕', label: 'Tic-Tac-Toe', color: 'from-blue-500 to-indigo-600' },
    { name: 'RockPaperScissors', emoji: '🪨📄✂️', label: 'RPS', color: 'from-purple-500 to-pink-600' },
    { name: 'MemoryCardMatch', emoji: '🃏', label: 'Memory', color: 'from-green-500 to-emerald-600' }
  ];

  // Energy levels
  const energyLevels = [
    { level: "high", emoji: "⚡", label: "High Energy", color: "bg-green-400" },
    { level: "medium", emoji: "😊", label: "Moderate Energy", color: "bg-blue-400" },
    { level: "low", emoji: "😴", label: "Low Energy", color: "bg-amber-400" },
  ];

  // Productivity tips
  const productivityTips = [
    "Break large tasks into smaller, manageable chunks",
    "Use the Pomodoro technique: 25 minutes of work followed by a 5-minute break",
    "Complete your most difficult task first thing in the morning",
    "Set specific goals for each work session",
    "Keep your workspace clean and organized",
    "Batch similar tasks together to maintain focus",
    "Take regular short breaks to maintain energy and focus",
    "Drink water regularly throughout the day",
    "Schedule dedicated time for checking emails and messages",
    "Review your todo list at the end of each day to prepare for tomorrow"
  ];

  // Motivational quotes
  const motivationalQuotes = [
    "The secret of getting ahead is getting started. - Mark Twain",
    "Done is better than perfect. - Sheryl Sandberg",
    "It always seems impossible until it's done. - Nelson Mandela",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "You don't have to be great to start, but you have to start to be great. - Zig Ziglar",
    "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
    "Small progress is still progress.",
    "Focus on being productive instead of busy. - Tim Ferriss",
    "You've got this!",
    "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort. - Paul J. Meyer"
  ];

  // Tabs
  const tabs = [
    { id: "games", label: "Break Time", icon: <Gamepad2 size={18} /> },
    { id: "discover", label: "Productivity", icon: <Zap size={18} /> },
  ];

  // Timer functions
  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setTimeLeft(0);
  };

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      resetTimer();
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const fetchProductivityTip = () => {
    setLoading(prev => ({ ...prev, tip: true }));
    setTimeout(() => {
      const tip = productivityTips[Math.floor(Math.random() * productivityTips.length)];
      setProductivityTip(tip);
      setLoading(prev => ({ ...prev, tip: false }));
    }, 800);
  };

  const fetchMotivation = () => {
    setLoading(prev => ({ ...prev, motivation: true }));
    setTimeout(() => {
      const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setMotivation(quote);
      setLoading(prev => ({ ...prev, motivation: false }));
    }, 800);
  };

  const generateProductivityStreak = () => {
    setLoading(prev => ({ ...prev, streak: true }));
    setTimeout(() => {
      const currentStreak = Math.floor(Math.random() * 10) + 1;
      setProductivityStreak(currentStreak);
      localStorage.setItem('todoApp_productivityStreak', JSON.stringify(currentStreak));
      setLoading(prev => ({ ...prev, streak: false }));
    }, 1000);
  };

  const renderGameComponent = () => {
    switch(selectedGame) {
      case 'TicTacToe': return <TicTacToe />;
      case 'RockPaperScissors': return <RockPaperScissors />;
      case 'MemoryCardMatch': return <MemoryCardMatch />;
      default: return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <Gamepad2 size={48} className="mb-4 opacity-40" />
          <p className="font-medium">Select a game to play</p>
          <p className="text-sm mt-2 opacity-80">Take a quick break between tasks!</p>
        </div>
      );
    }
  };

  useEffect(() => {
    fetchProductivityTip();
    fetchMotivation();
    if (productivityStreak === null) {
      generateProductivityStreak();
    }
  }, []);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-600 dark:border-fuchsia-400"></div>
    </div>
  );

  const TimerWidget = () => (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20 dark:shadow-emerald-700/30">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Coffee className="h-5 w-5" />
        <span>Task Timer</span>
      </h2>
      <div className="flex flex-col items-center justify-center py-4">
        <div className="mb-4 text-center">
          <p className="text-sm mb-2">Take a short break or focus with a timer</p>
          <div className="flex justify-center gap-3 mb-4">
            <button 
              onClick={() => startTimer(5)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              5 min
            </button>
            <button 
              onClick={() => startTimer(15)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              15 min
            </button>
            <button 
              onClick={() => startTimer(25)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              25 min
            </button>
          </div>
          <div className="text-5xl font-bold">{formatTime(timeLeft)}</div>
        </div>
        <button 
          onClick={isTimerRunning ? resetTimer : () => setIsTimerRunning(true)}
          className="w-full py-2.5 bg-white/20 hover:bg-white/30 transition-colors text-white rounded-xl font-medium"
        >
          {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
        </button>
      </div>
    </div>
  );

  const ProductivityStreakWidget = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/30 shadow-md shadow-indigo-500/5 dark:shadow-indigo-900/10 transition-all hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <Star className="h-5 w-5" />
        <span>Productivity Streak</span>
      </h2>
      <div className="flex flex-col items-center justify-center py-4">
        {loading.streak ? (
          <LoadingSpinner />
        ) : (
          productivityStreak && (
            <div className="flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-indigo-200 dark:bg-indigo-900/30 animate-pulse opacity-40"></div>
              </div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 dark:shadow-indigo-600/30 z-10">
                <span className="text-2xl font-bold text-white">{productivityStreak}</span>
              </div>
            </div>
          )
        )}
        <button 
          onClick={generateProductivityStreak}
          className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 dark:from-indigo-600 dark:to-blue-700 dark:hover:from-indigo-700 dark:hover:to-blue-800 text-white rounded-xl shadow-md shadow-indigo-500/20 dark:shadow-indigo-600/30 font-medium transition-all hover:shadow-lg hover:scale-105 active:scale-100"
        >
          Update Streak
        </button>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
          Complete your daily tasks to maintain your streak!
        </p>
      </div>
    </div>
  );

  const TaskSuggestionWidget = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30 shadow-md shadow-purple-500/5 dark:shadow-purple-900/10">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-600 dark:text-purple-400">
        <Battery className="h-5 w-5" />
        <span>Energy-Based Tasks</span>
      </h2>
      <div className="bg-purple-50/50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-100 dark:border-purple-900/30">
        <h3 className="font-medium mb-2">Recommended for {currentEnergy?.label}</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {currentEnergy?.level === "high" && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Tackle your most challenging tasks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Work on creative problem-solving</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Learn something new and complex</span>
              </li>
            </>
          )}
          {currentEnergy?.level === "medium" && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-500" />
                <span>Focus on moderate difficulty tasks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-500" />
                <span>Complete your required daily tasks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-500" />
                <span>Plan and organize upcoming work</span>
              </li>
            </>
          )}
          {currentEnergy?.level === "low" && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-amber-500" />
                <span>Handle simple, routine tasks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-amber-500" />
                <span>Clear small items from your todo list</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-amber-500" />
                <span>Take short breaks between tasks</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-900/20 dark:to-purple-900/20 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-900/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 relative overflow-hidden rounded-2xl p-8 bg-[#4A6FA5] dark:bg-[#166088] text-white shadow-xl shadow-blue-500/20 dark:shadow-blue-700/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-10 w-32 h-32 bg-white opacity-10 rounded-full translate-y-1/3"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  Productivity Break 
                  <span className="text-2xl">🎯</span>
                </h1>
                <p className="opacity-90 text-lg">Recharge while staying productive</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <p className="text-sm font-medium mb-2 opacity-90">How's your energy today?</p>
                <div className="flex flex-wrap gap-2">
                  {energyLevels.map((energy) => (
                    <button
                      key={energy.level}
                      onClick={() => {
                        setCurrentEnergy(energy);
                        localStorage.setItem('todoApp_currentEnergy', JSON.stringify(energy));
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                        currentEnergy?.level === energy.level 
                        ? `${energy.color} ring-2 ring-white scale-110` 
                        : `${energy.color} opacity-70 hover:opacity-100`
                      }`}
                    >
                      {energy.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {currentEnergy && (
              <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/20 text-sm">
                <span>Energy Level: {currentEnergy.label}</span>
                <button 
                  onClick={() => {
                    setCurrentEnergy({ level: "medium", label: "Moderate Energy" });
                    localStorage.setItem('todoApp_currentEnergy', JSON.stringify({ level: "medium", label: "Moderate Energy" }));
                  }}
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
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
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
          <div className="lg:col-span-2 space-y-6">
            {/* Games Section */}
            <div className={`${activeTab !== 'games' && 'hidden md:block'}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30 shadow-md shadow-blue-500/5 dark:shadow-blue-900/10">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Gamepad2 className="h-6 w-6" /> 
                  <span>Quick Break Games</span>
                </h2>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
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

                <div className="min-h-64 rounded-xl border border-blue-100 dark:border-blue-900/30 p-6 bg-blue-50/50 dark:bg-blue-900/10">
                  {selectedGame && (
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {games.find(g => g.name === selectedGame)?.label}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Take a short break before returning to your tasks</p>
                    </div>
                  )}
                  {renderGameComponent()}
                </div>
              </div>
            </div>

            {/* Discover Section */}
            <div className={`${activeTab !== 'discover' && 'hidden md:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Productivity Tip Widget */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-green-100 dark:border-green-900/30 shadow-md shadow-green-500/5 dark:shadow-green-900/10 transition-all hover:shadow-lg hover:shadow-green-500/10 dark:hover:shadow-green-900/20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5" /> 
                      <span>Productivity Tip</span>
                    </h2>
                    <button 
                      onClick={fetchProductivityTip}
                      className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/20 py-1.5 px-3 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                      <RefreshCw size={14} /> New Tip
                    </button>
                  </div>
                  
                  {loading.tip ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="bg-green-50/50 dark:bg-green-900/10 rounded-xl p-4 border border-green-100 dark:border-green-900/30">
                      <p className="text-gray-700 dark:text-gray-300">{productivityTip}</p>
                    </div>
                  )}
                </div>

                {/* Motivation Widget */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30 shadow-md shadow-amber-500/5 dark:shadow-amber-900/10 transition-all hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-900/20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Zap className="h-5 w-5" />
                      <span>Daily Motivation</span>
                    </h2>
                    <button 
                      onClick={fetchMotivation}
                      className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 bg-amber-50 dark:bg-amber-900/20 py-1.5 px-3 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                    >
                      <RefreshCw size={14} /> New Quote
                    </button>
                  </div>
                  
                  {loading.motivation ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-900/30">
                      <p className="text-gray-700 dark:text-gray-300">{motivation}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile-only widgets */}
              <div className="md:hidden space-y-6 mt-6">
                <ProductivityStreakWidget />
                <TimerWidget />
                <TaskSuggestionWidget />
              </div>
            </div>
          </div>

          {/* Desktop-only right column */}
          <div className="hidden md:block space-y-6">
            <ProductivityStreakWidget />
            <TimerWidget />
            <TaskSuggestionWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;