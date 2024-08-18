import {useState} from 'react';

export default function Player({name, symbol}){
    //initial phase is false when loading page: NOT editing player name or showing input field
    const[isEditing, setIsEditing] = useState(false); 

    function handleEditClick(){
        setIsEditing(true);
    }

    //[1] output span, OR...
    let playerName = <span className='player-name'>{name}</span>;

    //[2] ...if editing is true, output input
    if(isEditing){
        playerName = <input type="text" required />
    }

    return(
    <li>
    <span className="player">
        {playerName}
        <span className='player-symbol'>{symbol}</span>
    </span>
    <button onClick={handleEditClick}>Edit</button>
    </li>
    );
}