import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard'; // Importing Chessboard component from react-chessboard
import { Chess } from 'chess.js'; // Importing Chess class as default from chess.js library
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast from react-toastify library
import 'react-toastify/dist/ReactToastify.css'; // Importing default CSS styles for react-toastify

function App() {
  // State hook to manage the chess game state
  const [game, setGame] = useState(new Chess());

  // Function to handle piece move on the chessboard
  function onDrop(source, target) {
    const currentPlayer = game.turn(); // Determine current player's turn
    const movingPiece = game.get(source); // Get the piece being moved

    // Attempt to make the move
    let move = game.move({
      from: source,
      to: target,
    });

    // Check if the move is illegal
    if (move === null) {
      toast.error('Illegal move!'); // Show error toast message for illegal moves
      return;
    }

    // Capture opponent pieces if any
    captureOpponentPieces();

    // Update the board state with the new FEN string
    updateBoardState(game.fen());
  }

  // Function to capture opponent's pieces
  function captureOpponentPieces() {
    const possibleMoves = game.moves({ verbose: true }); // Get all possible moves
    for (let move of possibleMoves) {
      if (move.flags.includes('c')) {
        game.move(move); // Execute the move that captures an opponent's piece
        break; // Exit loop after capturing one piece
      }
    }
  }

  // Function to update the board state using FEN notation
  function updateBoardState(fen) {
    setGame(new Chess(fen)); // Update the game state with a new Chess instance
  }

  // Function to calculate the number of eliminated pieces for each player
  function getEliminatedPiecesCount(color) {
    const totalPieces = 16; // Total number of pieces per player
    const remainingPieces = game.board().flat().filter(p => p && p.color === color).length; // Count remaining pieces of specified color
    return totalPieces - remainingPieces; // Calculate eliminated pieces
  }

  // Handle quitting the game and display winner or draw
  function handleQuit() {
    const whiteEliminated = getEliminatedPiecesCount('w'); // Count eliminated white pieces
    const blackEliminated = getEliminatedPiecesCount('b'); // Count eliminated black pieces

    // Determine winner or declare draw based on eliminated pieces
    if (whiteEliminated > blackEliminated) {
      alert("White wins!");
    } else if (blackEliminated > whiteEliminated) {
      alert("Black wins!");
    } else {
      alert("It's a draw!");
    }

    window.location.reload(); // Reload the page to restart the game
  }

  // JSX structure for the Chess game UI
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <ToastContainer /> {/* Container for displaying toast messages */}

      {/* Display current player's turn */}
      <div className="text-4xl mb-4">
        <p className='bg-amber-950 text-white p-4 rounded-md text-center font-medium font-mono shadow-lg'>
          {game.turn() === 'w' ? `White's Turn` : `Black's Turn`}
        </p>
      </div>

      {/* Display eliminated pieces count for each player */}
      <div className='text-black flex font-medium font-mono'>
        <div className='text-2xl flex flex-col w-48 mt-4 p-4 bg-white rounded-md shadow-lg'>
          <p className='font-bold'>White's Eliminated Pieces</p>
          <p className='mt-2 text-center text-3xl text-red-600'>{getEliminatedPiecesCount('w')}</p>
        </div>

        {/* Chessboard component for displaying the game board */}
        <div className="app mx-8">
          <Chessboard
            position={game.fen()} // Current position of the pieces on the board
            onPieceDrop={onDrop} // Callback function for handling piece drops
            boardStyle={{ // Styling for the chessboard
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px'
            }}
            highlightLegalMoves={true} // Enable highlighting legal moves
          />
        </div>

        {/* Display eliminated pieces count for Black */}
        <div className='text-2xl flex flex-col w-48 mt-4 p-4 bg-white rounded-md shadow-lg'>
          <p className='font-bold'>Black's Eliminated Pieces</p>
          <p className='mt-2 text-center text-3xl text-red-600'>{getEliminatedPiecesCount('b')}</p>
        </div>
      </div>

      {/* Quit button to end the game */}
      <div onClick={handleQuit} className="cursor-pointer mt-4 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg">
        Quit
      </div>
    </div>
  );
}

export default App;
