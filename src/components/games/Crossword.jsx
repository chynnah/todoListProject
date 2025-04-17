import React, { useState, useEffect } from "react";
import { Pencil, RotateCcw, Check, HelpCircle, Info } from "lucide-react";

const Crossword = () => {
  // Sample 5x5 crossword puzzle
  const [puzzle, setPuzzle] = useState({
    grid: [
      [1, 2, 3, '#', 4],
      [5, ' ', ' ', ' ', ' '],
      [6, ' ', '#', 7, ' '],
      [' ', ' ', 8, ' ', ' '],
      [9, ' ', ' ', ' ', ' ']
    ],
    // Solution to the puzzle
    solution: [
      ['P', 'E', 'T', '#', 'F'],
      ['A', 'C', 'E', 'S', 'U'],
      ['R', 'E', '#', 'K', 'N'],
      ['K', 'A', 'T', 'I', 'N'],
      ['S', 'W', 'A', 'P', 'S']
    ],
    // User's current answers
    userAnswers: [
      ['', '', '', '#', ''],
      ['', '', '', '', ''],
      ['', '', '#', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ],
    cellStatuses: Array(5).fill().map(() => Array(5).fill('empty')), // 'empty', 'filled', 'error', 'correct'
    currentCell: { row: 0, col: 0 },
    direction: 'across', // 'across' or 'down'
    clues: {
      across: {
        1: "Animal companion",
        4: "Joy or happiness",
        5: "Confronts or deals with",
        6: "Vehicle parking area",
        8: "Feline animal",
        9: "Exchanges or trades"
      },
      down: {
        1: "PARK backwards",
        2: "Era or time period",
        3: "Device for fishing",
        4: "Enjoyment or entertainment",
        7: "Knowledge or information",
        8: "Beverage often served hot"
      }
    }
  });

  const [showHelp, setShowHelp] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle cell selection
  const selectCell = (row, col) => {
    if (puzzle.grid[row][col] === '#') return;
    
    // If clicking the same cell, toggle direction
    if (row === puzzle.currentCell.row && col === puzzle.currentCell.col) {
      setPuzzle(prev => ({
        ...prev,
        direction: prev.direction === 'across' ? 'down' : 'across'
      }));
    } else {
      setPuzzle(prev => ({
        ...prev,
        currentCell: { row, col }
      }));
    }
  };

  // Handle key inputs
  const handleKeyInput = (e) => {
    const { row, col } = puzzle.currentCell;
    if (puzzle.grid[row][col] === '#') return;

    const { key } = e;
    
    if (/^[a-zA-Z]$/.test(key)) {
      // Update user answer for current cell
      const newUserAnswers = [...puzzle.userAnswers];
      newUserAnswers[row][col] = key.toUpperCase();
      
      // Update cell status
      const newCellStatuses = [...puzzle.cellStatuses];
      newCellStatuses[row][col] = 'filled';
      
      // Move to next cell
      let nextRow = row;
      let nextCol = col;
      
      if (puzzle.direction === 'across') {
        nextCol = col + 1;
        while (nextCol < 5 && puzzle.grid[nextRow][nextCol] === '#') {
          nextCol++;
        }
        if (nextCol >= 5) nextCol = col;
      } else {
        nextRow = row + 1;
        while (nextRow < 5 && puzzle.grid[nextRow][nextCol] === '#') {
          nextRow++;
        }
        if (nextRow >= 5) nextRow = row;
      }
      
      setPuzzle(prev => ({
        ...prev,
        userAnswers: newUserAnswers,
        cellStatuses: newCellStatuses,
        currentCell: { row: nextRow, col: nextCol }
      }));
    } else if (key === 'Backspace' || key === 'Delete') {
      // Clear current cell
      const newUserAnswers = [...puzzle.userAnswers];
      newUserAnswers[row][col] = '';
      
      // Update cell status
      const newCellStatuses = [...puzzle.cellStatuses];
      newCellStatuses[row][col] = 'empty';
      
      setPuzzle(prev => ({
        ...prev,
        userAnswers: newUserAnswers,
        cellStatuses: newCellStatuses
      }));
    } else if (key === 'ArrowRight') {
      let nextCol = col + 1;
      while (nextCol < 5 && puzzle.grid[row][nextCol] === '#') {
        nextCol++;
      }
      if (nextCol < 5) {
        setPuzzle(prev => ({
          ...prev,
          currentCell: { row, col: nextCol },
          direction: 'across'
        }));
      }
    } else if (key === 'ArrowLeft') {
      let nextCol = col - 1;
      while (nextCol >= 0 && puzzle.grid[row][nextCol] === '#') {
        nextCol--;
      }
      if (nextCol >= 0) {
        setPuzzle(prev => ({
          ...prev,
          currentCell: { row, col: nextCol },
          direction: 'across'
        }));
      }
    } else if (key === 'ArrowDown') {
      let nextRow = row + 1;
      while (nextRow < 5 && puzzle.grid[nextRow][col] === '#') {
        nextRow++;
      }
      if (nextRow < 5) {
        setPuzzle(prev => ({
          ...prev,
          currentCell: { row: nextRow, col },
          direction: 'down'
        }));
      }
    } else if (key === 'ArrowUp') {
      let nextRow = row - 1;
      while (nextRow >= 0 && puzzle.grid[nextRow][col] === '#') {
        nextRow--;
      }
      if (nextRow >= 0) {
        setPuzzle(prev => ({
          ...prev,
          currentCell: { row: nextRow, col },
          direction: 'down'
        }));
      }
    }
  };

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyInput);
    return () => {
      window.removeEventListener('keydown', handleKeyInput);
    };
  }, [puzzle.currentCell, puzzle.direction]);

  // Check answers
  const checkAnswers = () => {
    const newCellStatuses = [...puzzle.cellStatuses];
    let allCorrect = true;
    
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (puzzle.grid[row][col] === '#') continue;
        
        if (puzzle.userAnswers[row][col] === '') {
          newCellStatuses[row][col] = 'empty';
          allCorrect = false;
        } else if (puzzle.userAnswers[row][col] === puzzle.solution[row][col]) {
          newCellStatuses[row][col] = 'correct';
        } else {
          newCellStatuses[row][col] = 'error';
          allCorrect = false;
        }
      }
    }
    
    setPuzzle(prev => ({
      ...prev,
      cellStatuses: newCellStatuses
    }));
    
    setIsComplete(allCorrect);
    if (allCorrect) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Reset puzzle
  const resetPuzzle = () => {
    setPuzzle(prev => ({
      ...prev,
      userAnswers: [
        ['', '', '', '#', ''],
        ['', '', '', '', ''],
        ['', '', '#', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ],
      cellStatuses: Array(5).fill().map(() => Array(5).fill('empty')),
      currentCell: { row: 0, col: 0 }
    }));
    setIsComplete(false);
  };

  // Helper to determine cell class based on its status
  const getCellClass = (row, col, status) => {
    if (puzzle.grid[row][col] === '#') {
      return 'bg-black';
    }
    
    const isSelected = row === puzzle.currentCell.row && col === puzzle.currentCell.col;
    
    let baseClass = 'border cursor-pointer transition-all';
    
    if (isSelected) {
      baseClass += ' ring-2 ring-purple-500 border-purple-500 bg-purple-100 dark:bg-purple-900/30';
    } else {
      switch (status) {
        case 'empty':
          baseClass += ' border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800';
          break;
        case 'filled':
          baseClass += ' border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20';
          break;
        case 'error':
          baseClass += ' border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20';
          break;
        case 'correct':
          baseClass += ' border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20';
          break;
        default:
          baseClass += ' border-gray-300 dark:border-gray-600';
      }
    }
    
    return baseClass;
  };

  // Render clue number in cell if needed
  const renderClueNumber = (cellValue) => {
    if (typeof cellValue === 'number') {
      return <span className="absolute top-0.5 left-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">{cellValue}</span>;
    }
    return null;
  };

  // Get the currently highlighted clue
  const getCurrentClue = () => {
    const { row, col } = puzzle.currentCell;
    if (puzzle.grid[row][col] === '#') return '';
    
    // Find the starting cell for the current word
    let currentClueNum;
    if (puzzle.direction === 'across') {
      // Trace to the leftmost cell of the word
      let c = col;
      while (c > 0 && puzzle.grid[row][c-1] !== '#') {
        c--;
      }
      currentClueNum = puzzle.grid[row][c];
      if (typeof currentClueNum !== 'number') return '';
      return `${currentClueNum} Across: ${puzzle.clues.across[currentClueNum]}`;
    } else {
      // Trace to the topmost cell of the word
      let r = row;
      while (r > 0 && puzzle.grid[r-1][col] !== '#') {
        r--;
      }
      currentClueNum = puzzle.grid[r][col];
      if (typeof currentClueNum !== 'number') return '';
      return `${currentClueNum} Down: ${puzzle.clues.down[currentClueNum]}`;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Success message */}
      {showSuccess && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white py-3 px-6 rounded-xl shadow-xl animate-bounce">
          🎉 Congratulations! Puzzle completed! 🎉
        </div>
      )}
      
      {/* Info overlay */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowInfo(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">About this Crossword</h3>
            <p className="mb-4">This is a simple 5x5 mini crossword puzzle with short words. Try to fill in all the words based on the clues provided.</p>
            <h4 className="font-semibold mb-1">How to play:</h4>
            <ul className="list-disc pl-5 mb-4 space-y-1 text-sm">
              <li>Click a cell to select it</li>
              <li>Type letters to fill in words</li>
              <li>Click a cell twice to switch between across and down</li>
              <li>Use arrow keys to navigate</li>
              <li>Click "Check" to verify your answers</li>
            </ul>
            <button 
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              onClick={() => setShowInfo(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
      
      {/* Help overlay */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowHelp(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">Need a hint?</h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Across</h4>
              <ul className="space-y-1 text-sm">
                {Object.entries(puzzle.clues.across).map(([num, clue]) => (
                  <li key={`across-${num}`} className="flex">
                    <span className="w-6 font-semibold">{num}.</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Down</h4>
              <ul className="space-y-1 text-sm">
                {Object.entries(puzzle.clues.down).map(([num, clue]) => (
                  <li key={`down-${num}`} className="flex">
                    <span className="w-6 font-semibold">{num}.</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button 
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              onClick={() => setShowHelp(false)}
            >
              Back to puzzle
            </button>
          </div>
        </div>
      )}
      
      {/* Current clue */}
      <div className="w-full bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg mb-4 text-center text-gray-700 dark:text-gray-200 font-medium">
        {getCurrentClue() || "Select a square to begin"}
      </div>
      
      {/* Crossword Grid */}
      <div className="relative w-64 h-64 grid grid-cols-5 grid-rows-5 gap-px bg-gray-300 dark:bg-gray-600 p-px rounded-lg overflow-hidden mb-4">
        {puzzle.grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`}
              className={`relative flex items-center justify-center text-lg font-semibold ${getCellClass(rowIndex, colIndex, puzzle.cellStatuses[rowIndex][colIndex])}`}
              onClick={() => selectCell(rowIndex, colIndex)}
            >
              {renderClueNumber(cell)}
              {cell !== '#' && (
                <span className="text-gray-900 dark:text-gray-100">
                  {puzzle.userAnswers[rowIndex][colIndex]}
                </span>
              )}
            </div>
          ))
        ))}
      </div>
      
      {/* Controls */}
      <div className="flex gap-3 mb-2">
        <button 
          className="flex items-center gap-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          onClick={checkAnswers}
        >
          <Check size={16} /> Check
        </button>
        <button 
          className="flex items-center gap-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
          onClick={resetPuzzle}
        >
          <RotateCcw size={16} /> Reset
        </button>
        <button 
          className="flex items-center gap-1 py-2 px-4 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg"
          onClick={() => setShowHelp(true)}
        >
          <HelpCircle size={16} /> Clues
        </button>
        <button 
          className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
          onClick={() => setShowInfo(true)}
        >
          <Info size={16} />
        </button>
      </div>
      
      {/* Status indicator */}
      <div className="text-sm text-center text-gray-500 dark:text-gray-400">
        {isComplete ? (
          <span className="text-green-600 dark:text-green-400 font-medium">Puzzle completed! 🎉</span>
        ) : (
          <span>Click cells and type to solve the puzzle</span>
        )}
      </div>
    </div>
  );
};

export default Crossword;