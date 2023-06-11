<script>
    import { Chess } from 'chess.js';
    import piecesjson from '../utils/pieces.json';
    import { onMount } from 'svelte';

    // props
    export let pgn = null;
    export let key = Math.random().toString(36).substring(7);

    // variables
    let chess = new Chess();
    let lastMove = null;
    if (pgn) {
        chess.loadPgn(pgn);
        lastMove = chess.history({verbose: true}).slice(-1)[0];
    }
    else {
    }
    let position = chess.board();
    let currentTurn = chess.turn();
    let pointOfView = currentTurn;
    if (pointOfView === 'b'){
        position = position.map((row) => row.reverse()).reverse();
    }
    let currSourceSquare = null;
    const audio_move = new Audio(piecesjson["audio_move"]);
    


    // methods

    const getNumCoordsBySquare = (square) => {
        let file = square.charCodeAt(0) - 97;
        let rank = 8 - parseInt(square[1]);
        if (pointOfView === 'b'){
            file = 7 - file;
            rank = 7 - rank;
        }
        return [file, rank];
    }

    function getSquareByNumCoords(j, i){
        if (pointOfView === 'b'){
            j = 7 - j;
            i = 7 - i;
        }
        return String.fromCharCode(97 + j) + (8 - i);
    }

    function getSquareColor(file_num, rank_num) {
        let isEvenSquare = (file_num + rank_num) % 2 === 0;
        
        return isEvenSquare ? 'light' : 'dark';
    }

    function getLabel(j, i) {
        if (i === 7) {
            j = pointOfView === 'w' ? j : 7 - j;
            return String.fromCharCode(97 + j);
        }
        i = pointOfView === 'w' ? i : 7 - i;
        return 8 - i;
    }

    function highLightSquares(listOfAllSquares, squaresToHighlight, addOrRemove='add') {
        squaresToHighlight.map((square) => {
            let [file, rank] = getNumCoordsBySquare(square);
            let index = 8 * rank + file;
            let classToAdd = getSquareColor(file, rank) === 'light' ? 'light-highlighted' : 'dark-highlighted';
            addOrRemove === 'add' ? listOfAllSquares[index].classList.add(classToAdd) : listOfAllSquares[index].classList.remove(classToAdd);
        });
    }


    function handleDragStart(event) {
        currSourceSquare = event.target.dataset.square;
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const sourceSquare = currSourceSquare;
        const targetSquare = event.target.dataset.square;
        // console.log(sourceSquare, targetSquare)
        // Perform move validation and update the chess position accordingly
        try {

            const move = chess.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q' // always promote to a queen for example simplicity
            });
            // After the move, update the component's position and re-render
            position = chess.board();
            currentTurn = chess.turn();
            const squares = document.querySelectorAll(`.square-${key}`);
            if (lastMove) {
                highLightSquares(squares, [lastMove.from, lastMove.to], 'remove');
            }
            lastMove = chess.history({verbose: true}).slice(-1)[0];
            highLightSquares(squares, [lastMove.from, lastMove.to]);


            if (pointOfView === 'b'){
                position = position.map((row) => row.reverse()).reverse();
            }

            audio_move.play();
        }
        catch (e) {
            console.log("Invalid move");
            console.log(e);
        }
            
    }

    // onMount

    onMount(() => {
        const squares = document.querySelectorAll(`.square-${key}`);
        if (lastMove) {
            highLightSquares(squares, [lastMove.from, lastMove.to]);
        }
    });

    // watch
    // $: {
    //     }

</script>

<div>
    <div class="chessboard">
        <!-- iterate in position -->
        <!-- rotate board -->
        {#each position as row, i}
        {#each row as squareData, j}
        <div
            class="square square-{key} {getSquareColor(j, i)}"
            data-square="{getSquareByNumCoords(j, i)}"
            draggable="false"
            on:dragover={handleDragOver}
            on:drop={handleDrop}
        >
            {#if i === 7 || j === 7}
                <span class="label-coord">
                    {getLabel(j, i)}
                </span>
            {/if}
            {#if squareData}
                <img src={piecesjson[squareData.type + squareData.color]}
                data-square="{getSquareByNumCoords(j, i)}"
                alt=""
                class="piece {currentTurn === squareData.color ? 'draggable' : ''}"
                on:dragstart={handleDragStart}
                draggable="{currentTurn === squareData.color}"
                />
            {/if}

        </div>
        {/each}
        {/each}

    </div>

</div>




<style>
    .chessboard {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        width: 500px;
        height: 500px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 4px solid #634b37;
    }
    .square {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .piece {
        width: 100%;
        height: 100%;
    }

    .draggable {
        cursor: grab;
    }

    .draggable:active {
        cursor: grabbing;
    }

    .dark {
        background-color: #a07958;
        color: #f0d9b5;
    }

    .light {
        background-color: #f0d9b5;
        color: #a07958;
    }


    .dark-highlighted {
        background-color: #aaa23a;
    }

    .light-highlighted {
        background-color: #cdd26a;
    }

    .label-coord {
        position: absolute;
        bottom: 2px;
        right: 3px;
        font-size: small;
    }
</style>
