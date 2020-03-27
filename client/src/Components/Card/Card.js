import React from 'react';
import './Card.css';
const Card = ({ value, playerClickOnCard }) => {
    return(
        <button className={'card'} 
                onClick={playerClickOnCard}>
            {value}
        </button>
    )
}

export default Card;