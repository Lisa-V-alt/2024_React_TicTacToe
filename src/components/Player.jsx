import {useState} from 'react';

export default function Player({initialName, symbol, isActive}){
    const [playerName, setPlayerName] = useState(initialName);
    //initial phase is false when loading page: NOT editing player name or showing input field
    const[isEditing, setIsEditing] = useState(false); 

    function handleEditClick(){
        setIsEditing((editing)=> !editing); 
        //'pass' a function: arrow function ensures a state is updated based on its previous state value - this leads to true to false, false to true (can open and close input mode)
        //why not use [setIsEditing(!isEditing)]? Behind the Scenes React 'schedules' state updates and is not performed instant - it's scheduled for the future
    }
    
    function handleChange(event){
        setPlayerName(event.target.value);
    }

    //[1] output span, OR...
    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    
    //[2] ...if editing is true, output input
    if(isEditing){
        editablePlayerName =(
        <input type="text" required value={playerName} onChange={handleChange} /> //updated value fed back into input (2-way binding)
        );
    }

    return(
    <li className={isActive ? 'active' : undefined}>
    <span className="player">
        {editablePlayerName}
        <span className='player-symbol'>{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
    );
}