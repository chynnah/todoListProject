import React, { useState, useEffect } from "react";

const Sudoku = () => {
  const [grid, setGrid] = useState([]);
  const [initialGrid, setInitialGrid] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const generated = generateSudokuGrid();
    setGrid(generated);
    setInitialGrid(generated.map((row) => [...row]));
    setMessage("");
  };

  const generateSudokuGrid = () => {
    const grid = Array(9)
      .fill()
      .map(() => Array(9).fill(""));

    for (let i = 0; i < 25; i++) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      const num = Math.floor(Math.random() * 9) + 1;
      if (grid[row][col] === "") grid[row][col] = num.toString();
    }

    return grid;
  };

  const checkWin = (grid) => {
    const isValidGroup = (group) => {
      const nums = group.filter((n) => n !== "").map(Number);
      return nums.length === 9 && new Set(nums).size === 9;
    };

    for (let i = 0; i < 9; i++) {
      if (!isValidGroup(grid[i])) return false;

      const col = grid.map((row) => row[i]);
      if (!isValidGroup(col)) return false;
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const box = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            box.push(grid[r * 3 + i][c * 3 + j]);
          }
        }
        if (!isValidGroup(box)) return false;
      }
    }

    return true;
  };

  const handleChange = (row, col, value) => {
    if (!/^[1-9]?$/.test(value)) return;

    if (initialGrid[row][col] !== "") return; 

    const newGrid = [...grid.map((r) => [...r])];
    newGrid[row][col] = value;
    setGrid(newGrid);

    if (checkWin(newGrid)) {
      setMessage("🎉 You solved the puzzle!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Sudoku</h2>

      <div className="overflow-auto">
        <table className="border-collapse mx-auto">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-400 w-10 h-10 text-center ${
                      (rowIndex % 3 === 2 && rowIndex !== 8
                        ? "border-b-4"
                        : "") +
                      " " +
                      (colIndex % 3 === 2 && colIndex !== 8
                        ? "border-r-4"
                        : "")
                    }`}
                  >
                    <input
                      type="text"
                      maxLength="1"
                      value={cell}
                      onChange={(e) =>
                        handleChange(rowIndex, colIndex, e.target.value)
                      }
                      className={`w-full h-full text-center text-lg font-medium outline-none ${
                        initialGrid[rowIndex][colIndex] !== ""
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-white"
                      }`}
                      disabled={initialGrid[rowIndex][colIndex] !== ""}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && (
        <p className="mt-4 text-green-600 text-center font-semibold">
          {message}
        </p>
      )}

      <div className="text-center mt-6">
        <button
          onClick={startNewGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        >
          🔄 New Game
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
