<script>
    import { onMount } from "svelte";
    import Chessboard from "../components/Chessboard.svelte";
    import { Chess } from 'chess.js';

    import stockfish_img from "../assets/stockfish_img.png";
    import wasm_img from "../assets/wasm.png";

    let chessboard;
    let currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    let game = new Chess(currentFen);
    let playerColor = game.turn();

    const stockfish = new Worker("stockfish.js");

    function prepareMove(fen) {
        stockfish.postMessage("position fen " + fen);
        stockfish.postMessage("go depth 10");
        stockfish.postMessage("go movetime 1000");
    }

    stockfish.postMessage("uci");
    stockfish.postMessage("ucinewgame");
    stockfish.postMessage("position startpos");

    stockfish.onmessage = (event) => {
        if (event.data.includes("bestmove")) {
            try {
                const bestMove = event.data.split(" ")[1];
                const move = chessboard.makeMove(bestMove.slice(0, 2), bestMove.slice(2, 4));
            }
            catch (e) {
            }
        }
    };

    $ : {
        
        if (!game.isGameOver() && game.turn() !== playerColor) {
            prepareMove(game.fen());
        }
    }

</script>

<div class="container">
    <div class="name-opponent">
        <img src={stockfish_img} alt="stockfish" width="50px" height="50px" />
        <span>
            <b>Stockfish</b>
            <span class="tag">
                >3500 Elo
            </span>
            with
        </span>
        <img src={wasm_img} alt="wasm" width="40px" height="40px" />
        
    </div>
    <div class="border">
        <Chessboard bind:this={chessboard} bind:chess={game} />
    </div>
</div>

<style scoped>
    .container {
        margin: 40px 0;
        background-color: #262421;
        padding: 20px;
        border-radius: 5px;
    }

    .border {
        border: 4px solid #6c513b;
    }

    img {
        margin: 0 10px;
    }

    .name-opponent{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        font-size: 1.1rem;
    }

    .tag {
        background-color: #333;
        font-size: small;
        border-radius: 5px;
        padding: 5px;
        margin: 10px 5px;
    }

</style>
