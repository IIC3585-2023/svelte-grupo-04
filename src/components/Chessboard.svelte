<script>
    import Piece from "./Piece.svelte";
    import { Chess } from 'chess.js';

    let chess = new Chess();
    let position = chess.board();
    let currSourceSquare = null;

    const RANK = Object.fromEntries([...Array(8)].map((_, i) => [String(i + 1), i]));
    const FILE = Object.fromEntries("abcdefgh".split('').map((c, i) => [c, i]));

    function getSquareColor(file_num, rank_num) {
        let isEvenSquare = (file_num + rank_num) % 2 === 0;
        return isEvenSquare ? '#f0d9b5' : '#a07958';
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
        }
        catch (e) {
            console.log("Invalid move");
        }
            
    }
    $: {
    }
</script>

<div>
    <div class="chessboard">
        <!-- iterate in position -->
        {#each position as row, i}
        {#each row as square, j}
        <div
            class="square"
            style="background-color: {getSquareColor(j, i)}"
            data-square="{String.fromCharCode(97 + j)}{String.fromCharCode(56 - i)}"
            on:dragstart={handleDragStart}
            on:dragover={handleDragOver}
            on:drop={handleDrop}
            draggable="true"
        >
            {#if square}
            <Piece piece={square.type + square.color} />
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
        width: 450px;
        height: 450px;
    }

    .square {
    }
</style>
