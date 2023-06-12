<script>
    import Chessboard from "../components/Chessboard.svelte"
    import { Chess } from 'chess.js';
    import piecesjson from "../utils/pieces.json";
    export let pgn = null;
    export let key = Math.random().toString(36).substring(7);
    export let solution;

    let chess = new Chess();
    let playerColor = chess.turn();

    if (pgn) {
        chess.loadPgn(pgn);
        playerColor = chess.turn();
    }
    let reset = false;
    let isGameStopped = false
    let solutionCopy = solution.slice();

    const color = {
        w: "white",
        b: "black"
    }
    function correctPuzzleMove(sourceSquare, targetSquare){
        if (sourceSquare+targetSquare === solutionCopy[0]){
            solutionCopy.shift()
            let opponentAnswer;
            if (solutionCopy.length > 0){
                opponentAnswer = solutionCopy.shift()
            }
            else{ opponentAnswer = "null"}
            return {isCorrect: true, isSolved: solutionCopy.length > 0 ? false: true, answerSourceSquare: opponentAnswer.slice(0,2), answerTargetSquare:opponentAnswer.slice(2,4)};
        } 
        else{
            return {isCorrect: false}
        }
    }

    
</script>

<div class="game-container">
    <Chessboard correctPuzzleMove={correctPuzzleMove} pgn={pgn} key={key} bind:reset={reset} bind:isGameStopped={isGameStopped}/>
    <div class="modal">
        {#if !isGameStopped}
            <img src={piecesjson["k" + playerColor]} alt="king" class="size-piece" />
            <div class="text">
                <span class="text-title">Your Turn</span>
                <span class="text-description">Find the best move for {color[playerColor]}.</span>
            </div>
        {/if}
        <div class="message">
        {#if isGameStopped}
            {#if solutionCopy.length === 0}
            <i class="fas fa-check" style="color: #629924"></i>
            Well Done, you solved the puzzle!
            {:else}
            <i class="fas fa-times" style="color: #c33"></i>
            Wrong move, try again!
            {/if}
            <button on:click={() => {reset = true; solutionCopy = solution.slice();}}>Retry</button>
        {/if}
        </div>
    </div>
</div>


<style scoped>
.game-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;
}

.size-piece {
    width: 70px;
    height: 70px;
}

.text{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.9rem;
}

.text-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
}

.modal {
    background-color: #302e2c;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    margin: 10px 0;
    width: 100%;
}

i {
    font-size: 2rem;
}

.message{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
</style>