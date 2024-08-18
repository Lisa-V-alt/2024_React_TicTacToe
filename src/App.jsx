import {useState} from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  //activePlayer dynamically highlights which player is currently active

function handleSelectSquare(){
  setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X'); //checks if current player is an o or an x and switches to opposite
}

  return (
    <main>
      <div id="game-container">
        {/* PLAYERS */}
        <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {/* GAME BOARD */}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
      {/* LOG */}

    </main>
  )
}

export default App;