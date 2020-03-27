import React, { useState }  from 'react'; 
import Board from '../Board/Board';
import './GameLogic.css';
import Status from './Status';
import SettingsModal from './SettingsModal';
import AIComputer from './AIComputer';
import Header from '../Header';
import Footer from '../Footer';
import { SemipolarLoading } from 'react-loadingg';


const GameLogic = () => {
    //Init state for board and player turn
    const [ boardCards, setBoardCards ] = useState(Array(9).fill(null));
    const [ isAgainstRandom, setIsAgainstRandom] = useState(true);
    const [ playerXturn, setPlayerXturn] = useState(true); 
    const [ settingsModal, setSettingsModal ] = useState(false);
    const [ isPlayerFirst, setIsPlayerFirst ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    //Player on click function
    const playerClickOnCard = (index) => {
        const cardsArr = [...boardCards]; 
        if(Status.someoneIsWinner(cardsArr) || cardsArr[index]){
            return; 
        }
        //put value in the arr depends on player
        cardsArr[index] = playerXturn ? 'X' : 'O'; 
        //update params
        setBoardCards(cardsArr); 
        setPlayerXturn(!playerXturn); 
        setIsPlayerFirst(!setIsPlayerFirst)
    }

    //Reset Board
    const resetBoard = () => {
        setBoardCards(Array(9).fill(null));
        setPlayerXturn(true);
    }

    //Game Settings
    const gameSettings = () => {
        setSettingsModal(true);
    }
    const handleCloseModal = () => {
        setSettingsModal(false);
    }
    const handleOnChangeAgainstRandom = ( e ) => {
        console.log('inside parent on change modal = ', e, e.target.id)
        setIsAgainstRandom(e.target.id === 'randomComputer' ? true : false);
    }
    const handleOnChangeWhoStart = ( e ) => {
        console.log("inside is player on change = ",e, ", ", e.target.value)
        setIsPlayerFirst(e.target.id === 'startMe' ? true : false)
    }
    //Computer turn 
    const computerTurn = () => {
        (isAgainstRandom) 
            ? playerClickOnCard(RandomComputerTurn()) 
            : playerClickOnCard(AIComputerTurn());
    }
    //Random computer chose
    const RandomComputerTurn = () => {
        console.log(" inside random computer player")
        if(!playerXturn && !Status.isBoardFull(boardCards)){
            //Choosing rand num while board is not full 
            let randNum = Math.floor(Math.random() * 10);
            do {
                randNum = Math.floor(Math.random() * 10);
            } while(!Status.isBoardFull(boardCards) && boardCards[randNum] !== null)   
            return (randNum); 
        }
        return null;
    }
    // Computer Turn - AI computer 
    const AIComputerTurn = () => {
        console.log(" inside AI computer player")
        // Minimax function need to return the index that the computer turn 
        let newCardsFills = boardCards.map((value, i)  => {
            return (value) ? value : i;
        })
        let toReturn = AIComputer.MinimaxFunctionForAi(newCardsFills, true)
        return toReturn.index;
    }
    
    //Game run
    let winner = Status.someoneIsWinner(boardCards); 
    let status = Status.checkStatus(winner, playerXturn, isAgainstRandom); 
    if(!playerXturn){
        computerTurn();
    }

    return(
        <div>
            <Header/>
            <div id={'gameButtonsWrapper'}>
                <button className={'gameButtons'} onClick={gameSettings}>Settings</button>
                <button className={'gameButtons'} onClick={resetBoard}>Reset Board</button>
            </div>
            <div>
                <div id={'status'}>{status}</div>
                <Board  id={`board` }
                        winner={winner}
                        playerClickOnCard={playerClickOnCard}
                        boardCards={boardCards}/> 
                {isLoading ? <SemipolarLoading /> : null} 
            </div>
            <Footer/>
            {/* Modal for Settings */}
            {settingsModal ? <SettingsModal 
                                    show={settingsModal} 
                                    handleOnChangeAgainstRandom={handleOnChangeAgainstRandom} 
                                    handleCloseModal={handleCloseModal}
                                    isAgainstRandom={isAgainstRandom}
                                    isPlayerFirst={isPlayerFirst}
                                    handleOnChangeWhoStart={handleOnChangeWhoStart}/> 
                            : null}
        </div>

    )
}
export default GameLogic;