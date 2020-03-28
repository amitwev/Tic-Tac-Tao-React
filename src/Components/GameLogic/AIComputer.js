import Status from './Status';
export default {
    availableSpotsOnArray(boardCards){
        let availableSpots = []; 
        for (let i = 0; i < boardCards.length; i++) {
            if(boardCards[i] >= 0 && boardCards[i] < 9){
                availableSpots.push(i)
            }
        }
        return availableSpots;
    },
    MinimaxFunctionForAi(newBoard, isComputer){
        // Check if there are available spots on board
        let availableSpots = this.availableSpotsOnArray(newBoard);
        //Checking if there is a winner
        if(Status.someoneIsWinner(newBoard) === 'X'){
            return { score: -10 };
        }else if(Status.someoneIsWinner(newBoard) === 'O'){
            return { score: 10 };
        }else if(availableSpots.length === 0){
            return{ score: 0 };            
        }
        let moves = [];
        //Looping to find the all the possibilities
        for (let i = 0; i < availableSpots.length; i++) {
            let move = {}; 
            move['index'] = newBoard[availableSpots[i]];
            isComputer ? newBoard[availableSpots[i]] = 'O' : newBoard[availableSpots[i]] = 'X';
            if(isComputer){
                //Computer Player
                let result = this.MinimaxFunctionForAi(newBoard, false);
                move.score = result.score; 
            }else{
                //Human player
                let result = this.MinimaxFunctionForAi(newBoard, true);
                move.score = result.score;
            }
            newBoard[availableSpots[i]] = move.index; 
            moves.push(move);          
        }
        //Checking for the best move for computer 
        let bestMove; 
        if(isComputer){
            let bestScore = -1000;
            for (let i = 0; i < moves.length; i++) {
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }                
            }
        }else{
            let bestScore = 1000;
            for (let i = 0; i < moves.length; i++) {
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }                
            }
        }
        //Returning best move object
        return moves[bestMove];
    }
}