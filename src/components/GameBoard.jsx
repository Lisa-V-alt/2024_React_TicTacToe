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
                      <img src={icons[playerSymbol].src} alt="Player Icon" style={{ width: '100px', height: '100px' }} />
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