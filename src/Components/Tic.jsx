import React, { useState } from "react";
import "./Tic.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState("twoPlayer"); // "twoPlayer" or "singlePlayer"

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    checkWinner(newBoard);

    if (mode === "singlePlayer" && !winner) {
      const updatedBoard = [...newBoard];
      setTimeout(() => computerMove(updatedBoard), 500); // Add delay for better UX
    } else {
      setIsXNext(!isXNext);
    }
  };

  const computerMove = (currentBoard) => {
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    if (emptyIndices.length > 0) {
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      currentBoard[randomIndex] = "O";
      setBoard(currentBoard);
      checkWinner(currentBoard);
      setIsXNext(true); // Switch back to the player's turn
    }
  };

  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner("Tie");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="mode-selection">
        <button
          className={mode === "twoPlayer" ? "active" : ""}
          onClick={() => setMode("twoPlayer")}
        >
          Two Player
        </button>
        <button
          className={mode === "singlePlayer" ? "active" : ""}
          onClick={() => setMode("singlePlayer")}
        >
          Play with Computer
        </button>
      </div>
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      {winner && (
        <div className="winner">
          {winner === "Tie" ? "It's a Tie!" : `Winner: ${winner}`}
        </div>
      )}
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
