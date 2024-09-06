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

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleNameChange} />  // <== Changed to `handleNameChange`
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">
          <button onClick={() => onIconChange(symbol, -1)}>⬅️</button>
          <span>{icon.name}</span>
          <button onClick={() => onIconChange(symbol, 1)}>➡️</button>
        </span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
