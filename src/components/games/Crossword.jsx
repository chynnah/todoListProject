import React, { useState, useEffect } from 'react';

// List of sample words for the crossword
const wordList = [
  { word: 'CAT', clue: 'Animal', positions: [[0, 0], [0, 1], [0, 2]] },
  { word: 'APPLE', clue: 'Fruit', positions: [[1, 0], [2, 0], [3, 0], [4, 0], [4, 1]] },
  { word: 'DOG', clue: 'Pet', positions: [[2, 2], [2, 3], [2, 4]] },
  { word: 'PINE', clue: 'Tree type', positions: [[0, 3], [0, 4], [1, 4], [2, 4]] },
  { word: 'PEAR', clue: 'Fruit', positions: [[4, 2], [4, 3], [3, 3], [2, 3]] }
];

// Generate an empty 5x5 grid
const generateEmptyGrid = () => {
  return Array(5).fill().map(() => Array(5).fill(''));
};

// Pick a random word from the list
const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};

const Crossword = () => {
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [currentWord, setCurrentWord] = useState(null);
  const [currentClue, setCurrentClue] = useState('');

  useEffect(() => {
    generateRandomGrid();
  }, []);

  // Place a word into the grid at the specified positions
  const placeWordInGrid = (word, positions) => {
    const newGrid = [...grid];
    for (let i = 0; i < word.length; i++) {
      const [row, col] = positions[i];
      newGrid[row][col] = word[i];
    }
    setGrid(newGrid);
  };

  // Generate a random crossword
  const generateRandomGrid = () => {
    const word = getRandomWord();
    setCurrentWord(word);
    setCurrentClue(word.clue);
    
    const newGrid = generateEmptyGrid();
    placeWordInGrid(word.word, word.positions);
    setGrid(newGrid);
  };

  // Handle the input change
  const handleChange = (row, col, value) => {
    if (value.length > 1) return;
    const newGrid = [...grid];
    newGrid[row][col] = value.toUpperCase();
    setGrid(newGrid);
  };

  // Check if the user's answer matches the word
  const checkAnswer = () => {
    if (!currentWord) return false;
    
    for (let i = 0; i < currentWord.word.length; i++) {
      const [row, col] = currentWord.positions[i];
      if (grid[row][col] !== currentWord.word[i]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (checkAnswer()) {
      alert("🎉 You solved the crossword!");
    } else {
      alert("❌ Try again!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-4xl font-semibold text-center text-indigo-600 mb-6">Crossword Puzzle</h2>

      <div className="grid grid-cols-5 gap-1 mb-6">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              className="w-12 h-12 text-center text-2xl font-medium border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
              maxLength="1"
            />
          ))
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Clue:</h3>
        <p className="text-lg text-gray-700">{currentClue}</p>
      </div>

      <div className="text-center mt-8 space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          Submit
        </button>
        <button
          onClick={generateRandomGrid}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Crossword;
