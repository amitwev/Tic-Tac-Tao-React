import React from 'react';
import './board.css';
import Card from '../Card/Card';

const Board = ({ boardCards, playerClickOnCard ,winner }) =>{
    const renderCard = (index) => {
        return <Card 
                value={boardCards[index]} 
                disable={winner}
                playerClickOnCard={() => 
                    playerClickOnCard(index)
                }/>
    }
    return(
        <div> 
           <div id={'mainBoard'}>
                <div className={'boardRow'}>
                    {renderCard(0)}
                    {renderCard(1)}
                    {renderCard(2)}
                </div >
                <div className={'boardRow'}>
                    {renderCard(3)}
                    {renderCard(4)}
                    {renderCard(5)}
                </div>
                <div className={'boardRow'}>
                    {renderCard(6)}
                    {renderCard(7)}
                    {renderCard(8)}
                </div>
           </div>
        </div>
    )
}

export default Board; 