export default function GameBoard({ onSelectSquare, board, icons }) {
    return (
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                    {playerSymbol ? (
                      // Display the corresponding icon for the player symbol
                      <img src={icons[playerSymbol].src} alt="Player Icon" style={{ width: '50px', height: '50px' }} />
                    ) : (
                      ''
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }