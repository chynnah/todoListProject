import React, { useState, useEffect, useRef } from "react";
import { Smile, RefreshCw, Gamepad2, Zap, Star, X, CheckCircle, Coffee, Battery, Droplet } from "lucide-react";
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


  const WaterTracker = () => {
    const [waterIntake, setWaterIntake] = useState(() => {
      const saved = localStorage.getItem('todoApp_waterIntake');
      return saved !== null ? JSON.parse(saved) : { glasses: 0, goal: 8, lastUpdated: new Date().toDateString() };
    });
    
    useEffect(() => {
      const today = new Date().toDateString();
      if (waterIntake.lastUpdated !== today) {
        const resetIntake = { ...waterIntake, glasses: 0, lastUpdated: today };
        setWaterIntake(resetIntake);
        localStorage.setItem('todoApp_waterIntake', JSON.stringify(resetIntake));
      }
    }, []);

    const addWater = () => {
      if (waterIntake.glasses < waterIntake.goal * 2) {
        const updatedIntake = { 
          ...waterIntake, 
          glasses: waterIntake.glasses + 1, 
          lastUpdated: new Date().toDateString() 
        };
        setWaterIntake(updatedIntake);
        localStorage.setItem('todoApp_waterIntake', JSON.stringify(updatedIntake));
      }
    };

    const removeWater = () => {
      if (waterIntake.glasses > 0) {
        const updatedIntake = { 
          ...waterIntake, 
          glasses: waterIntake.glasses - 1, 
          lastUpdated: new Date().toDateString() 
        };
        setWaterIntake(updatedIntake);
        localStorage.setItem('todoApp_waterIntake', JSON.stringify(updatedIntake));
      }
    };

    const updateGoal = (newGoal) => {
      if (newGoal >= 1 && newGoal <= 16) {
        const updatedIntake = { ...waterIntake, goal: newGoal };
        setWaterIntake(updatedIntake);
        localStorage.setItem('todoApp_waterIntake', JSON.stringify(updatedIntake));
      }
    };

    const resetCounter = () => {
      const updatedIntake = { 
        ...waterIntake, 
        glasses: 0, 
        lastUpdated: new Date().toDateString() 
      };
      setWaterIntake(updatedIntake);
      localStorage.setItem('todoApp_waterIntake', JSON.stringify(updatedIntake));
    };

    const progressPercentage = Math.min((waterIntake.glasses / waterIntake.goal) * 100, 100);
    
    const getFeedback = () => {
      const percentage = waterIntake.glasses / waterIntake.goal;
      if (percentage === 0) return "Start your hydration routine!";
      if (percentage < 0.25) return "You're just getting started!";
      if (percentage < 0.5) return "Keep drinking, you're doing well!";
      if (percentage < 0.75) return "Over halfway to your goal!";
      if (percentage < 1) return "Almost there, keep going!";
      if (percentage === 1) return "You've hit your daily goal!";
      return "Excellent hydration today!";
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30 shadow-md shadow-blue-500/5 dark:shadow-blue-900/10 transition-all hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Droplet className="h-5 w-5" />
          <span>Water Tracker</span>
        </h2>
        
        <div className="flex flex-col items-center">
          <div className="w-full px-4 mb-6 relative">
            <div className="relative h-36 w-36 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900/50 overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 transition-all duration-500 ease-out"
                  style={{ height: `${progressPercentage}%` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 transform -translate-y-1/2 rounded-full"></div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{waterIntake.glasses}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">of {waterIntake.goal} glasses</span>
              </div>
            </div>
            
            <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              {getFeedback()}
            </p>
          </div>
          
          <div className="w-full grid grid-cols-3 gap-3 mb-5">
            <button 
              onClick={removeWater} 
              disabled={waterIntake.glasses <= 0}
              className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
            >
              <span className="text-lg">-</span>
            </button>
            
            <button 
              onClick={resetCounter}
              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Reset
            </button>
            
            <button 
              onClick={addWater}
              className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="text-lg">+</span>
            </button>
          </div>
          
          <div className="w-full bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Adjust Your Daily Goal</h3>
            
            <div className="flex items-center justify-between">
              <button 
                onClick={() => updateGoal(Math.max(1, waterIntake.goal - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                -
              </button>
              
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900/30 text-gray-700 dark:text-gray-300">
                {waterIntake.goal} glasses
              </span>
              
              <button 
                onClick={() => updateGoal(Math.min(16, waterIntake.goal + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                +
              </button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              The recommended daily water intake is about 8 glasses (2L)
            </p>
          </div>
        </div>
      </div>
    );
  };

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
                <WaterTracker />
                <TimerWidget />
              </div>
            </div>
          </div>

          {/* Desktop-only right column */}
          <div className="hidden md:block space-y-6">
            <WaterTracker />
            <TimerWidget />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;