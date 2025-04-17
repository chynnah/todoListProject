import React, { useState, useEffect } from "react";
import { RotateCcw, Check, AlertCircle } from "lucide-react";

const Sudoku = () => {
  // Difficulty levels
  const DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
  };

  // Initial state
  const [board, setBoard] = useState([]);
  const [originalBoard, setOriginalBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
  const [isValidBoard, setIsValidBoard] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState(null);

  // Generate initial board when component mounts
  useEffect(() => {
    generateNewGame(difficulty);
  }, []);

  // Generate a new game with the given difficulty
  const generateNewGame = (difficultyLevel) => {
    setDifficulty(difficultyLevel);
    setMessage(null);
    setIsSolved(false);
    
    // Generate a solved board first
    const solved = generateSolvedBoard();
    
    // Create a playable board by removing some cells based on difficulty
    const emptyCellsCount = getEmptyCellsCount(difficultyLevel);
    const playableBoard = createPlayableBoard(solved, emptyCellsCount);
    
    setBoard(playableBoard);
    setOriginalBoard(JSON.parse(JSON.stringify(playableBoard)));
    setSelectedCell(null);
  };

  // Generate a completely solved Sudoku board
  const generateSolvedBoard = () => {
    // For the demo, we'll use a pre-solved board
    // In a real implementation, you would use a backtracking algorithm to generate a valid Sudoku board
    const solvedBoard = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
    
    // Shuffle the board for variety
    // This is a simplified approach - a real implementation would use proper shuffling techniques
    // that maintain Sudoku validity
    return solvedBoard;
  };

  // Create a playable board by removing cells from the solved board
  const createPlayableBoard = (solvedBoard, emptyCellsCount) => {
    const playableBoard = JSON.parse(JSON.stringify(solvedBoard));
    
    let cellsToRemove = emptyCellsCount;
    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (playableBoard[row][col] !== 0) {
        playableBoard[row][col] = 0;
        cellsToRemove--;
      }
    }
    
    return playableBoard;
  };

  // Get the number of cells to remove based on difficulty
  const getEmptyCellsCount = (difficultyLevel) => {
    switch (difficultyLevel) {
      case DIFFICULTY.EASY:
        return 30; // Remove 30 cells
      case DIFFICULTY.MEDIUM:
        return 40; // Remove 40 cells
      case DIFFICULTY.HARD:
        return 50; // Remove 50 cells
      default:
        return 30;
    }
  };

  // Handle cell selection
  const handleCellClick = (rowIndex, colIndex) => {
    // Can't select original cells
    if (originalBoard[rowIndex][colIndex] !== 0) return;
    
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  // Handle digit selection
  const handleDigitClick = (digit) => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    const newBoard = [...board];
    
    // Toggle digit (if same digit is selected again, clear the cell)
    newBoard[row][col] = newBoard[row][col] === digit ? 0 : digit;
    
    setBoard(newBoard);
    validateBoard(newBoard);
    checkIfSolved(newBoard);
  };

  // Clear selected cell
  const clearCell = () => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    const newBoard = [...board];
    newBoard[row][col] = 0;
    
    setBoard(newBoard);
    validateBoard(newBoard);
  };

  // Validate the current board state
  const validateBoard = (currentBoard) => {
    // For simplicity, we're only checking if there are any obvious conflicts
    // A complete validation would check rows, columns, and 3x3 boxes
    
    let isValid = true;
    // Validate rows
    for (let row = 0; row < 9; row++) {
      const seen = new Set();
      for (let col = 0; col < 9; col++) {
        const value = currentBoard[row][col];
        if (value !== 0) {
          if (seen.has(value)) {
            isValid = false;
            break;
          }
          seen.add(value);
        }
      }
      if (!isValid) break;
    }
    
    // Validate columns
    if (isValid) {
      for (let col = 0; col < 9; col++) {
        const seen = new Set();
        for (let row = 0; row < 9; row++) {
          const value = currentBoard[row][col];
          if (value !== 0) {
            if (seen.has(value)) {
              isValid = false;
              break;
            }
            seen.add(value);
          }
        }
        if (!isValid) break;
      }
    }
    
    setIsValidBoard(isValid);
    if (!isValid) {
      setMessage({ type: 'error', text: 'There are conflicts in your solution' });
    } else {
      setMessage(null);
    }
    
    return isValid;
  };

  // Check if the puzzle is solved
  const checkIfSolved = (currentBoard) => {
    // Check if all cells are filled and board is valid
    const allFilled = currentBoard.every(row => 
      row.every(cell => cell !== 0)
    );
    
    if (allFilled && validateBoard(currentBoard)) {
      setIsSolved(true);
      setMessage({ type: 'success', text: 'Congratulations! You solved the puzzle!' });
    }
    
    return allFilled;
  };

  // Render a cell
  const renderCell = (value, rowIndex, colIndex) => {
    const isOriginal = originalBoard[rowIndex][colIndex] !== 0;
    const isSelected = selectedCell && 
                      selectedCell.row === rowIndex && 
                      selectedCell.col === colIndex;
    
    return (
      <button
        key={`cell-${rowIndex}-${colIndex}`}
        className={`
          w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
          ${isOriginal 
            ? 'font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30' 
            : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800'}
          ${isSelected 
            ? 'ring-2 ring-amber-500 dark:ring-amber-400 bg-amber-50 dark:bg-amber-900/20' 
            : ''}
          ${(colIndex + 1) % 3 === 0 && colIndex < 8 ? 'border-r-2 border-amber-300 dark:border-amber-700' : 'border-r border-amber-200 dark:border-amber-800'}
          ${(rowIndex + 1) % 3 === 0 && rowIndex < 8 ? 'border-b-2 border-amber-300 dark:border-amber-700' : 'border-b border-amber-200 dark:border-amber-800'}
          transition-all hover:bg-amber-50 dark:hover:bg-amber-900/20
        `}
        onClick={() => handleCellClick(rowIndex, colIndex)}
        disabled={isOriginal}
      >
        {value !== 0 ? value : ''}
      </button>
    );
  };

  // Render the number pad
  const renderNumberPad = () => {
    return (
      <div className="flex justify-center gap-1 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
          <button
            key={`digit-${digit}`}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-colors"
            onClick={() => handleDigitClick(digit)}
            disabled={!selectedCell}
          >
            {digit}
          </button>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
          onClick={clearCell}
          disabled={!selectedCell}
        >
          ✕
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Game controls */}
      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {Object.values(DIFFICULTY).map(level => (
            <button
              key={level}
              className={`text-xs py-1 px-2 rounded-md transition-colors ${
                difficulty === level
                  ? "bg-amber-500 text-white dark:bg-amber-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => generateNewGame(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => generateNewGame(difficulty)}
          className="flex items-center gap-1 text-xs bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/40 py-1 px-2 rounded-md transition-colors"
        >
          <RotateCcw size={12} /> New Game
        </button>
      </div>

      {/* Status message */}
      {message && (
        <div className={`w-full mb-4 p-2 rounded-md text-sm text-center ${
          message.type === 'error' 
            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        }`}>
          <div className="flex items-center justify-center gap-1">
            {message.type === 'error' ? (
              <AlertCircle size={14} />
            ) : (
              <Check size={14} />
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Sudoku board */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-md border-2 border-amber-300 dark:border-amber-700 overflow-hidden">
        <div className="grid grid-cols-9">
          {board.length > 0 && board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              renderCell(cell, rowIndex, colIndex)
            ))
          ))}
        </div>
      </div>

      {/* Number pad */}
      {renderNumberPad()}
    </div>
  );
};

export default Sudoku;