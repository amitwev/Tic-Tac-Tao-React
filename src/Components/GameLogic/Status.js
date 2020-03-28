export default {
    someoneIsWinner(boardCards){
        //Winner Combination
        const winnerCombination = [
            [0,1,2], //V rows first 
            [3,4,5], //V rows mid 
            [6,7,8],//V  rows last 
            [0,3,6],//V cols left
            [1,4,7], //V cols mid
            [2,5,8], //V  cols right
            [0,4,8], //V X left to right
            [2,4,6] //X X right to left 
        ]; 
        //to determine if arr full - def = true
        let isArrayFull = this.isBoardFull(boardCards);
        for (let i = 0; i < winnerCombination.length; i++) {
            const [ a, b, c ] = winnerCombination[i];
            if(boardCards[a] && 
                boardCards[a] === boardCards[b] && 
                boardCards[b] === boardCards[c]) {
                return boardCards[a];
            }
        }
        return isArrayFull 
                ? 'undefined'
                : false;
    },
    //Check if board is full or not
    isBoardFull(boardCards){
        for (let index = 0; index < boardCards.length; index++) {
            if(boardCards[index] === null){
                return false; 
            }
        }
        return true; 
    },
    checkStatus(winner, player, isAgainstRandom){
        if(winner === 'undefined'){
            return `No one won, it's a tie!`;
        }else if(winner){
            return `Winner is ${winner}!`
        }else{
            return `You play against ${isAgainstRandom ? 'Random' : 'AI'} computer. Player ${player ? 'X' : 'O'} turn`;
        }
    }
}