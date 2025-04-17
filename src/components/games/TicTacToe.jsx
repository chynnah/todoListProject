import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStatus, setGameStatus] = useState("Ready to play!");

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameStatus(`Player ${gameWinner} wins!`);
    } else if (!newBoard.includes(null)) {
      setGameStatus("Game ended in a draw!");
    } else {
      setGameStatus(`Next player: ${!isXNext ? "X" : "O"}`);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStatus("Ready to play!");
  };

  const renderSquare = (i) => (
    <button
      className={`w-full h-16 text-2xl font-bold rounded-md transition-all 
        ${
          board[i]
            ? board[i] === "X"
              ? "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400"
              : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700/60 dark:hover:bg-gray-700"
        } 
        ${winner && "hover:bg-gray-100 dark:hover:bg-gray-700/60"}`}
      onClick={() => handleClick(i)}
      disabled={winner || board[i]}
    >
      {board[i]}
    </button>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          {gameStatus}
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-1 text-sm bg-fuchsia-100 text-fuchsia-600 hover:bg-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 dark:hover:bg-fuchsia-900/40 py-1.5 px-3 rounded-lg transition-colors"
        >
          <RotateCcw size={14} /> Reset Game
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Array(9)
          .fill(null)
          .map((_, i) => renderSquare(i))}
      </div>
    </div>
  );
};

export default TicTacToe;