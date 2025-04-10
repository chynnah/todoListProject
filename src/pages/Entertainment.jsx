import React, { useEffect, useState } from "react";
import { Sparkles, Smile, Zap, PawPrint, Layout, Coffee, Gamepad2, Palette } from "lucide-react";
import TicTacToe from '../components/games/TicTacToe';
import Sudoku from '../components/games/Sudoku';
import RockPaperScissors from '../components/games/RockPaperScissors';
import MemoryCardMatch from '../components/games/MemoryCardMatch';
import Crossword from '../components/games/Crossword';

const Entertainment = () => {
  const [joke, setJoke] = useState("");
  const [fact, setFact] = useState("");
  const [cat, setCat] = useState("");
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [cardColor, setCardColor] = useState("#FFFFFF");
  const [moodMessage, setMoodMessage] = useState("");
  const [moodColor, setMoodColor] = useState("#FF1654");
  const [selectedGame, setSelectedGame] = useState(null);
  const [sidebar, setSidebar] = useState(true);

  const fetchJoke = async () => {
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await res.json();
      setJoke(`${data.setup} ${data.punchline}`);
    } catch {
      setJoke("No jokes for now 😅");
    }
  };

  const fetchFact = async () => {
    try {
      const res = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
      const data = await res.json();
      setFact(data.text);
    } catch {
      setFact("No random facts available 🧐");
    }
  };

  const fetchCat = async () => {
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await res.json();
      setCat(data[0].url);
    } catch {
      setCat("");
    }
  };

  const generateLuckyNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const handleLuckyNumber = () => {
    setLoading(true);
    setLuckyNumber(null);

    setTimeout(() => {
      setLoading(false);
      const number = generateLuckyNumber();
      setLuckyNumber(number);
      localStorage.setItem("luckyNumber", number);
    }, 1500);
  };

  const handleMoodChange = (mood) => {
    const moodData = {
      "😄": { message: "Keep smiling, it suits you!", color: "#4A7C59" },
      "😢": { message: "It's okay to cry. Tomorrow's a new day!", color: "#5086C1" },
      "😠": { message: "Take a deep breath. You got this!", color: "#FF1654" },
      "😴": { message: "Nap time is self-care. 😌", color: "#7D4E57" },
      "🤯": { message: "Take a break. Your brain is working overtime!", color: "#7D82B8" },
    };

    setMoodMessage(moodData[mood].message);
    setMoodColor(moodData[mood].color);
    localStorage.setItem("moodMessage", moodData[mood].message);
    localStorage.setItem("moodColor", moodData[mood].color);
  };

  useEffect(() => {
    fetchJoke();
    fetchFact();
    fetchCat();

    const savedBackgroundColor = localStorage.getItem("backgroundColor");
    const savedCardColor = localStorage.getItem("cardColor");
    const savedMoodMessage = localStorage.getItem("moodMessage");
    const savedMoodColor = localStorage.getItem("moodColor");
    const savedLuckyNumber = localStorage.getItem("luckyNumber");
    const savedSidebar = localStorage.getItem("sidebar");

    if (savedBackgroundColor) setBackgroundColor(savedBackgroundColor);
    if (savedCardColor) setCardColor(savedCardColor);
    if (savedMoodMessage) setMoodMessage(savedMoodMessage);
    if (savedMoodColor) setMoodColor(savedMoodColor);
    if (savedLuckyNumber) setLuckyNumber(savedLuckyNumber);
    if (savedSidebar) setSidebar(JSON.parse(savedSidebar));
  }, []);

  const widgetClass = "rounded-xl shadow-lg p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition duration-300 ease-in-out border border-gray-100";
  const buttonClass = "bg-[#FF1654] text-white rounded-[50px] py-2.5 px-4 hover:bg-opacity-80 transition duration-300 flex items-center justify-center gap-2 font-medium shadow-sm";

  const handleBackgroundChange = (color) => {
    setBackgroundColor(color);
    localStorage.setItem("backgroundColor", color);
  };

  const handleCardColorChange = (color) => {
    setCardColor(color);
    localStorage.setItem("cardColor", color);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    localStorage.setItem("sidebar", JSON.stringify(!sidebar));
  };

  return (
    <div className="min-h-screen text-[#283D3B] transition-all duration-500" style={{ backgroundColor }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 py-3 px-6 sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FF1654] flex items-center gap-2">
          <Sparkles className="text-[#FF1654]" size={20} />
          Entertainment Hub
        </h1>
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={sidebar ? "Hide sidebar" : "Show sidebar"}
        >
          <Layout size={20} className="text-[#283D3B]" />
        </button>
      </header>

      <div className="flex flex-col lg:flex-row p-6 gap-6">
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebar ? 'lg:w-3/4' : 'w-full'}`}>
          {/* Widgets */}
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-10">
            <div className={widgetClass} style={{ backgroundColor: cardColor }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#283D3B] flex items-center gap-2">
                  Joke of the Day
                </h2>
                <div className="">
                  <Smile size={18} className="text-[#283D3B" /> 
                </div>
              </div>
              <p className="py-4">{joke}</p>
              <button onClick={fetchJoke} className={buttonClass}>
                <Zap size={16} /> Get New Joke
              </button>
            </div>

            <div className={widgetClass} style={{ backgroundColor: cardColor }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#283D3B] flex items-center gap-2">
                   Did You Know?
                </h2>
                <div className="">
                  <Coffee size={18} className="text-[#283D3B]" />
                </div>
              </div>
              <p className="py-4">{fact}</p>
              <button onClick={fetchFact} className={buttonClass}>
                <Zap size={16} /> Get New Fact
              </button>
            </div>

            {cat && (
              <div className={`${widgetClass}`} style={{ backgroundColor: cardColor }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#283D3B] flex items-center gap-2">
                     Random Cat
                  </h2>
                  <div className="">
                    <PawPrint size={18} className="text-[#283D3B]" />
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center py-4">
                  <img src={cat} alt="Cat" className="rounded-lg shadow-md max-h-48 object-contain" />
                </div>
                <button onClick={fetchCat} className={buttonClass}>
                  <Zap size={16} /> Get New Cat
                </button>
              </div>
            )}
          </div>

          {/* Games Section */} 
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 " style={{ backgroundColor: cardColor }}>
            <h2 className="text-2xl font-bold text-[#FF1654] mb-6 flex items-center gap-2">
              <Gamepad2 className="text-[#FF1654]" size={20} /> Games
            </h2>
            
            {/* Game Selection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
              {[
                { name: 'TicTacToe', emoji: '❌⭕', label: 'Tic-Tac-Toe' },
                { name: 'RockPaperScissors', emoji: '🪨📄✂️', label: 'RPS' },
                { name: 'MemoryCardMatch', emoji: '🃏', label: 'Memory' },
                { name: 'Sudoku', emoji: '🔢', label: 'Sudoku' },
                { name: 'Crossword', emoji: '✏️', label: 'Crossword' }
              ].map((game) => (
                <button
                  key={game.name}
                  onClick={() => setSelectedGame(game.name)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                    selectedGame === game.name 
                      ? 'bg-[#F7F3EE] text-[#283D3B] border-[#F7F3EE]' 
                      : 'bg-white hover:bg-[#FF1654] hover:bg-[opacity-50] border-gray-200 hover:border-[#FF1654]'
                  }`}
                >
                  <span className="text-2xl mb-2">{game.emoji}</span>
                  <span className="text-xs font-medium">{game.label}</span>
                </button>
              ))}
            </div>

            {/* Game Display Area */}
            <div className="w-full min-h-[400px] bg-gray-50 rounded-xl border border-gray-200 p-4">
              {selectedGame === 'TicTacToe' && <TicTacToe />}
              {selectedGame === 'RockPaperScissors' && <RockPaperScissors />}
              {selectedGame === 'MemoryCardMatch' && <MemoryCardMatch />}
              {selectedGame === 'Sudoku' && <Sudoku />}
              {selectedGame === 'Crossword' && <Crossword />}
              
              {!selectedGame && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="text-5xl mb-4">🎮</div>
                  <h3 className="text-xl font-semibold">Select a game to play</h3>
                  <p className="text-sm mt-2">Choose from the options above</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        {sidebar && (
          <aside className="lg:w-1/4 w-full flex flex-col space-y-6 transition-all duration-300">
            {/* Mood Selector */}
            <div className={`${widgetClass} bg-white`} style={{ backgroundColor: cardColor }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#283D3B">How are you feeling?</h2>
                <div className="h-8 w-8 rounded-full bg-[#FF1654] bg-opacity-10 flex items-center justify-center">
                  <span>🧠</span>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2 my-4">
                {["😄", "😢", "😠", "😴", "🤯"].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodChange(mood)}
                    className="hover:scale-110 transition transform duration-300 bg-white border border-gray-200 text-xl py-2 rounded-lg shadow-sm hover:shadow-md flex items-center justify-center"
                  >
                    {mood}
                  </button>
                ))}
              </div>

              {moodMessage && (
                <div
                  className="text-center p-4 rounded-[50px] rounded-br-none text-white font-medium"
                  style={{ backgroundColor: moodColor }}
                >
                  {moodMessage}
                </div>
              )}
            </div>

            {/* Color Customizer */}
            <div className={`${widgetClass} bg-white`} style={{ backgroundColor: cardColor }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#283D3B] flex items-center gap-2">
                 Color Theme
                </h2>
                <div className="h-8 w-8 rounded-full bg-[#FF1654] bg-opacity-10 flex items-center justify-center">
                  <span>🎨</span>
                </div>
              </div>
              
              <div className="my-4 space-y-4">
                <div>
                  <p className="font-medium text-[#283D3B] mb-2">Background</p>
                  <div className="flex flex-wrap gap-2">
                    {["#FFFFFF", "#F8F9FA", "#F7F3EE", "#EFF6FF", "#FEF2F2", "#ECFDF5"].map((color) => (
                      <div
                        key={color}
                        onClick={() => handleBackgroundChange(color)}
                        className={`cursor-pointer w-8 h-8 rounded-lg border hover:scale-110 transition-transform shadow-sm ${backgroundColor === color ? 'ring-2 ring-[#FF1654]' : 'ring-1 ring-gray-200'}`}
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium text-[#283D3B] mb-2">Cards</p>
                  <div className="flex flex-wrap gap-2">
                    {["#FFFFFF", "#FEF3F2", "#EFF6FF", "#ECFDF5", "#F7F3EE", "#FEF9C3"].map((color) => (
                      <div
                        key={color}
                        onClick={() => handleCardColorChange(color)}
                        className={`cursor-pointer w-8 h-8 rounded-lg border hover:scale-110 transition-transform shadow-sm ${cardColor === color ? 'ring-2 ring-[#FF1654]' : 'ring-1 ring-gray-200'}`}
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lucky Number */}
            <div className={`${widgetClass} bg-white`} style={{ backgroundColor: cardColor }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#283D3B]">Your Lucky Number</h2>
                <div className="h-8 w-8 rounded-full bg-[#FF1654] bg-opacity-10 flex items-center justify-center">
                  <span>🍀</span>
                </div>
              </div>
              
              {loading ? (
                <div className="py-8 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-[#FF1654] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                luckyNumber !== null ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="w-24 h-24 rounded-full bg-[#FF1654] flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">{luckyNumber}</span>
                    </div>
                    <p className="text-sm text-gray-600">Your lucky number for today</p>
                  </div>
                ) : (
                  <div className="py-4 flex items-center justify-center">
                    <span className="text-gray-500">Generate your lucky number</span>
                  </div>
                )
              )}
              
              <button onClick={handleLuckyNumber} className={buttonClass}>
                <Zap size={16} /> {luckyNumber ? "New Number" : "Generate Number"}
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Entertainment;