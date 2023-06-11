<script>
    import Chessboard from "../components/Chessboard.svelte"
    export let pgn = null;
    export let key = Math.random().toString(36).substring(7);
    export let solution;
    let reset = false;
    let isGameStopped = false
    let solutionCopy = solution.slice();
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
    {#if isGameStopped}
    <div class="modal-puzzle">
        Aqui va cuando se resuelve mal, un boton para un retry.
        Lo pongo encima del tablero pero da lo mismo. La cosa es
        que desactivo el tablero cuando se gana o pierde y hay que
        mostrar que se hizo bien o mal, no importa si es un modal u otra forma
        {#if solutionCopy.length === 0}
         PROBLEMA RESUELTO: MUY BIEN
         {:else}
         NO PROBLEMA RESUELTO: MUY MAL
        {/if}
        <button on:click={() => {reset = true; solutionCopy = solution.slice();}}>Retry</button>
    </div>
{/if}
    <Chessboard correctPuzzleMove={correctPuzzleMove} pgn={pgn} key={key} bind:reset={reset} bind:isGameStopped={isGameStopped}/>
</div>


<style>
.game-container{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; 
}
.modal-puzzle {
    position: absolute;
    width: 90%;
    height: 50%;
    z-index: 1;
    background-color: wheat;
}
</style>