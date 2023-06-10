<script>
    import { Chess } from 'chess.js';
    import piecesjson from '../utils/pieces.json';

    // props
    export let pgn = null;


    // variables
    let chess = new Chess();
    if (pgn) {
        chess.loadPgn(pgn);
    }
    else {
    }
    let position = chess.board();
    
    let currentTurn = chess.turn();
    let currSourceSquare = null;


    // methods
    function getSquareColor(file_num, rank_num) {
        let isEvenSquare = (file_num + rank_num) % 2 === 0;
        return isEvenSquare ? '#f0d9b5' : '#a07958';
    }

    function handleDragStart(event) {
        currSourceSquare = event.target.dataset.square;
        console.log(currSourceSquare);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const sourceSquare = currSourceSquare;
        const targetSquare = event.target.dataset.square;
        console.log(sourceSquare, targetSquare)
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
        }
        catch (e) {
            console.log("Invalid move");
        }
            
    }


    // watch
    // $: {
    // //     re-render the board when the position changes
    // }
</script>

<div>
    <div class="chessboard">
        <!-- iterate in position -->
        {#each position as row, i}
        {#each row as squareData, j}
        <div
            class="square"
            style="background-color: {getSquareColor(j, i)}"
            data-square="{String.fromCharCode(97 + j)}{8 - i}"
            draggable="false"
            on:dragover={handleDragOver}
            on:drop={handleDrop}
        >
            {#if squareData}
                <img src={piecesjson[squareData.type + squareData.color]}
                data-square="{squareData.square}"
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
    }
    .square {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .piece {
        width: 100%;
        height: 100%;
    }

    .draggable {
        cursor: pointer;
    }
</style>
