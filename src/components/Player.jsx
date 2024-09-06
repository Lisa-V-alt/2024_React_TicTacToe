import { useState } from 'react';

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

export default function Player({ initialName, symbol, isActive, onChangeName, icon, onIconChange }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
      setIsEditing(editing => !editing);
      if (isEditing) {
        onChangeName(prev => ({ ...prev, [symbol]: playerName }));
      }
    }

    function handleNameChange(event) {
      setPlayerName(event.target.value);
    }

// Handles wrapping logic for the icon selector
function handleIconChange(direction) {
    onIconChange(symbol, direction);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleNameChange}
        className="player-name-input" // Add this class to target the CSS
      />
    );
  }

    return (
        <li className={isActive ? 'active' : undefined}>
          <div className={`player-name-container ${isActive ? 'active' : ''}`}>
            {editablePlayerName}
          </div>
          <div className="player-options-wrapper">
            <div className="player-symbol-container">
              <button onClick={() => handleIconChange(-1)}>⬅️</button> {/* Left button */}
              <span className="player-symbol">{icon.name}</span>
              <button onClick={() => handleIconChange(1)}>➡️</button> {/* Right button */}
            </div>
            <button className="edit-button" onClick={handleEditClick}>
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        </li>
    );
}
