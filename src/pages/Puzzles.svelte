<script>
    import Chessboard from "../components/Chessboard.svelte"
    export let pgn = null;
    export let key = Math.random().toString(36).substring(7);
    export let solution = null;
    console.log(solution)
    function correctPuzzleMove(sourceSquare, targetSquare){
        if (sourceSquare+targetSquare === solution[0]){
            solution.shift()
            let opponentAnswer;
            if (solution.length > 0){
                opponentAnswer = solution.shift()
            }
            else{ opponentAnswer = "null"}
            return {isCorrect: true, isSolved: solution.length > 0 ? false: true, answerSourceSquare: opponentAnswer.slice(0,2), answerTargetSquare:opponentAnswer.slice(2,4)};
        } 
        else{
            return {isCorrect: false}
        }
    }
</script>

<div>
    <Chessboard correctPuzzleMove={correctPuzzleMove} pgn={pgn} key={key}/>
</div>
