import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameHistory, setGameHistory] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  const themeColor = "#FF1654";
  const textColor = "#283D3B";

  useEffect(() => {
    const winner = calculateWinner(board);

    if (winner) {
      setIsGameOver(true);
      if (winner.player) {
        setScores(prev => ({
          ...prev,
          [winner.player]: prev[winner.player] + 1
        }));
        setWinningLine(winner.line);
      }
    } else if (!board.includes(null)) {
      setIsGameOver(true);
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || isGameOver) return;

    const updatedBoard = [...board];
    updatedBoard[index] = xIsNext ? 'X' : 'O';

    setBoard(updatedBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setGameHistory(prev => [
      ...prev,
      { board, winner: calculateWinner(board)?.player || 'Tie' }
    ]);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setIsGameOver(false);
    setWinningLine([]);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, ties: 0 });
    setGameHistory([]);
    resetGame();
  };

  const renderSquare = (index) => {
    const isWinning = winningLine.includes(index);

    return (
      <button
        key={index}
        className={`square ${board[index] ? 'filled' : ''} ${isWinning ? 'winning' : ''}`}
        onClick={() => handleClick(index)}
        style={{
          backgroundColor: isWinning ? themeColor : '#fff',
          color: isWinning ? '#fff' : (board[index] === 'X' ? themeColor : textColor),
          borderColor: themeColor,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px'
        }}
      >
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner.player}`
    : board.includes(null)
    ? `Next player: ${xIsNext ? 'X' : 'O'}`
    : "It's a tie!";

  return (
    <div className="game-container" style={{ color: textColor }}>
      <h1 style={{ color: themeColor, textAlign: 'center', marginBottom: '1rem' }}>
        Tic Tac Toe
      </h1>

      <div
        className="scoreboard"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(255, 22, 84, 0.1)',
          padding: '0.5rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      >
        <Score label="X" value={scores.X} color={themeColor} />
        <Score label="Ties" value={scores.ties} />
        <Score label="O" value={scores.O} color={textColor} />
      </div>

      <div
        className="status"
        style={{
          textAlign: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: winner ? themeColor : textColor
        }}
      >
        {status}
      </div>

      <div className="board" style={{ margin: '0 auto', maxWidth: '300px' }}>
        {[0, 1, 2].map(row =>
          <div key={row} className="board-row" style={{ display: 'flex' }}>
            {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
          </div>
        )}
      </div>

      <div
        className="controls"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1.5rem'
        }}
      >
        <GameButton label="New Game" onClick={resetGame} bg={themeColor} />
        <GameButton label="Reset Scores" onClick={resetScores} bg={textColor} />
      </div>

      <style jsx>{`
        .square {
          width: 100%;
          height: 80px;
          font-size: 2rem;
          font-weight: bold;
          border: 2px solid;
          border-radius: 8px;
          background: white;
          margin: 2px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .square:hover:not(.filled) {
          background-color: rgba(255, 22, 84, 0.1);
        }

        .square.filled {
          cursor: not-allowed;
        }

        .square.winning {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// Sub-components for cleaner code
const Score = ({ label, value, color }) => (
  <div className="score-item">
    <span style={{ fontWeight: 'bold', color: color || 'inherit' }}>{label}</span>: {value}
  </div>
);

const GameButton = ({ label, onClick, bg }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: bg,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px'
    }}
  >
    {label}
  </button>
);

// Utility function
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]             // diagonal
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] };
    }
  }
  return null;
};

export default TicTacToe;
