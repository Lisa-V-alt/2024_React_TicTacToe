import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const ICONS = [
  { name: '🎀', src: '/icons/bow.png' },
  { name: '🍒', src: '/icons/cherry.png' },
  { name: '🌼', src: '/icons/flower.png' },
  { name: '🐟', src: '/icons/goldfish.png' },
  { name: '🧸', src: '/icons/gummy.png' },
  { name: '💖', src: '/icons/heartchat.png' },
  { name: '🌷', src: '/icons/heartflower.png' },
  { name: '🍭', src: '/icons/lollipop.png' },
  { name: '🌈', src: '/icons/rainbow.png' },
  { name: '🍓', src: '/icons/strawberry.png' },
  { name: '☀️', src: '/icons/sun.png' }
];

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    // Store the player symbol (X or O)
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState({ X: 'Player 1', O: 'Player 2' });
  const [gameTurns, setGameTurns] = useState([]);
  const [icons, setIcons] = useState({ X: ICONS[0], O: ICONS[1] });

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handleIconChange(symbol, direction) {
    setIcons(prevIcons => {
      const currentIconIndex = ICONS.findIndex(icon => icon.name === prevIcons[symbol].name);
      const nextIndex = (currentIconIndex + direction + ICONS.length) % ICONS.length;
      const newIcon = ICONS[nextIndex];
      const otherPlayerIcon = symbol === 'X' ? prevIcons['O'] : prevIcons['X'];
      if (newIcon.name === otherPlayerIcon.name) {
        return prevIcons; // Prevent same icons for both players
      }
      return { ...prevIcons, [symbol]: newIcon };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={players.X} 
            symbol="X" 
            isActive={activePlayer === 'X'} 
            onChangeName={setPlayers} 
            icon={icons.X} 
            onIconChange={handleIconChange} 
          />
          <Player 
            initialName={players.O} 
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={setPlayers} 
            icon={icons.O} 
            onIconChange={handleIconChange} 
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} icons={icons} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;