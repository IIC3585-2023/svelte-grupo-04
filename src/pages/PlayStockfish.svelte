<script>
    import Chessboard from "../components/Chessboard.svelte";
    import { Chess } from 'chess.js';

    let currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let chess = new Chess(currentFen);
    const playerColor = chess.turn();


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

<div class="container">
    <Chessboard bind:fen={currentFen} />
</div>

<style scoped>
    .container {
        margin: 40px 0;
    }
</style>