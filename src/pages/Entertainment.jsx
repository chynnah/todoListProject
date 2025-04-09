import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Smile,
  Zap,
  PawPrint,
} from "lucide-react";

const Entertainment = () => {
  const [joke, setJoke] = useState("");
  const [fact, setFact] = useState("");
  const [cat, setCat] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#FDFAF6");
  const [cardColor, setCardColor] = useState("#FFFFFF");

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

  useEffect(() => {
    fetchJoke();
    fetchFact();
    fetchCat();
  }, []);

  const widgetClass =
    "rounded-lg shadow-md p-6 flex flex-col justify-between space-y-4 hover:scale-105 transform transition duration-300 ease-in-out";

  const buttonClass =
    "bg-[#FF1654] text-white rounded-md py-2 hover:bg-[#D20043] transition duration-300 w-full";

  const handleBackgroundChange = (color) => {
    setBackgroundColor(color);
  };

  const handleCardColorChange = (color) => {
    setCardColor(color);
  };

  return (
    <div
      className="p-8 min-h-screen text-[#283D3B] transition-all flex"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="w-full md:w-2/3">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3 text-[#FF1654]">
          <Sparkles className="animate-pulse" /> Entertainment Hub
        </h1>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          <div
            className={`${widgetClass}`}
            style={{ backgroundColor: cardColor }}
          >
            <h2 className="text-lg font-semibold text-[#FF1654]">
              <Smile className="inline mr-2" /> Joke of the Day
            </h2>
            <p>{joke}</p>
            <button
              onClick={fetchJoke}
              className={buttonClass}
            >
              Get New Joke
            </button>
          </div>

          <div
            className={`${widgetClass}`}
            style={{ backgroundColor: cardColor }}
          >
            <h2 className="text-lg font-semibold text-[#FF1654]">
              <Zap className="inline mr-2" /> Did You Know?
            </h2>
            <p>{fact}</p>
            <button
              onClick={fetchFact}
              className={buttonClass}
            >
              Get New Fact
            </button>
          </div>

          {cat && (
            <div
              className={`${widgetClass} items-center`}
              style={{ backgroundColor: cardColor }}
            >
              <h2 className="text-lg font-semibold text-[#FF1654]">
                <PawPrint className="inline mr-2" /> Random Cat
              </h2>
              <img
                src={cat}
                alt="Cat"
                className="rounded-lg shadow-md max-h-64 object-contain"
              />
              <button
                onClick={fetchCat}
                className={buttonClass}
              >
                Get New Cat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Color Changer and Background Changer Section */}
      <div className="w-1/4 ml-6 flex flex-col space-y-6 bg-white rounded-lg shadow-md p-6">
        <div className={widgetClass}>
          <h2 className="text-lg font-semibold text-[#FF1654]">
            <Zap className="inline mr-2" /> Color Customizer
          </h2>
          <p>Click a circle to change the background or card color!</p>

          <div className="flex flex-col items-center space-y-4">
            {/* Background Color Changer */}
            <div className="mb-4 w-full">
              <p className="font-semibold text-[#FF1654]">Background Color</p>
              <div className="flex flex-wrap justify-between">
                {[
                  "#FDFAF6", "#D1C4E9", "#F0E1D4", "#F7D7A3", "#F1F1F1", "#B0BEC5",
                ].map((color) => (
                  <div
                    key={color}
                    onClick={() => handleBackgroundChange(color)}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Card Color Changer */}
            <div className="w-full">
              <p className="font-semibold text-[#FF1654]">Card Color</p>
              <div className="flex flex-wrap justify-between">
                {[
                  "#FFFFFF", "#F1F1F1", "#D1C4E9", "#F0E1D4", "#F7D7A3", "#B0BEC5",
                ].map((color) => (
                  <div
                    key={color}
                    onClick={() => handleCardColorChange(color)}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;
