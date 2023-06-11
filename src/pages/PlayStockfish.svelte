<script>
    import Chessboard from "../components/Chessboard.svelte";
    import { Chess } from 'chess.js';

    let currentFen = "rnbqkbnr/p1p1pppp/8/1p6/2pP4/4P3/PP3PPP/RNBQKBNR w KQkq - 0 4";
    let chess = new Chess(currentFen);
    const playerColor = chess.turn();

    const STOCKFISH = new Worker('stockfish.js');


    async function getStockfishMove(fen) {
        fen = fen.replaceAll(" ", "%20")
        const response = await fetch(`https://www.chessdb.cn/cdb.php?action=querybest&board=${fen}`);
        const data = await response.text();
        const move = data.split(":")[1];
        return move;
	}


    $ : {
        let chess = new Chess(currentFen);
        if (chess.turn() !== playerColor) {
            getStockfishMove(currentFen).then((move) => {
                chess.move(move);
                currentFen = chess.fen();
            })
        }
    }

</script>

<div>
    <Chessboard bind:fen={currentFen} />
</div>