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
    let pointOfView = currentTurn;
    if (pointOfView === 'b'){
        position = position.map((row) => row.reverse()).reverse();
    }
    let currSourceSquare = null;


    // methods
    function getSquareColor(file_num, rank_num) {
        let isEvenSquare = (file_num + rank_num) % 2 === 0;
        return isEvenSquare ? '#f0d9b5' : '#a07958';
    }

    function getSquare(j, i){
        if (pointOfView === 'b'){
            j = 7 - j;
            i = 7 - i;
        }
        return String.fromCharCode(97 + j) + (8 - i);
    }

    function getLabel(j, i) {
        if (i === 7) {
            j = pointOfView === 'w' ? j : 7 - j;
            return String.fromCharCode(97 + j);
        }
        i = pointOfView === 'w' ? i : 7 - i;
        return 8 - i;
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

            if (pointOfView === 'b'){
                position = position.map((row) => row.reverse()).reverse();
            }
        }
        catch (e) {
            console.log("Invalid move");
        }
            
    }


    // watch
    // $: {
    // }
</script>

<div>
    <div class="chessboard">
        <!-- iterate in position -->
        <!-- rotate board -->
        {#each position as row, i}
        {#each row as squareData, j}
        <div
            class="square"
            style="background-color: {getSquareColor(j, i)}"
            data-square="{getSquare(j, i)}"
            draggable="false"
            on:dragover={handleDragOver}
            on:drop={handleDrop}
        >
            {#if i === 7 || j === 7}
                <span class="label-coord" style="color:{getSquareColor(j + 1, i)}">
                    {getLabel(j, i)}
                </span>
            {/if}
            {#if squareData}
                <img src={piecesjson[squareData.type + squareData.color]}
                data-square="{getSquare(j, i)}"
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
        position: relative;
    }

    .piece {
        width: 100%;
        height: 100%;
    }

    .draggable {
        cursor: pointer;
    }

    .label-coord {
        position: absolute;
        bottom: 2px;
        right: 3px;
        font-size: small;
    }
</style>
