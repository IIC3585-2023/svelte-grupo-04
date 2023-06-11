<script>
    import Chessboard from "../components/Chessboard.svelte";
    import { Chess } from 'chess.js';


    // import stockfish 
    const stockfish = new Worker("stockfish.js");
    stockfish.postMessage("uci");
    stockfish.postMessage("ucinewgame");
    stockfish.postMessage("position startpos");
    
    
    let currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    let game = new Chess(currentFen);

    stockfish.onmessage = (event) => {
      if (event.data.includes("bestmove")) {
        const bestMove = event.data.split(" ")[1];
        const move = game.move(bestMove);
        console.log(move);
        // chessboard.setPosition(chess.fen());
      }
      console.log(event.data);
    };



    // async function getStockfishMove(fen) {
    //     this.engineGame().prepareMove()


    //     fen = 


    //     return move;
	// }


    // $ : {
    //     game = new Chess(currentFen);
    //     if (!game.isGameOver()) {
    //         prepareMove();
    //         currentFen = game.fen();
    //     }
    // }

</script>

<div class="container">
    <Chessboard bind:fen={currentFen} />
</div>

<style scoped>
    .container {
        margin: 40px 0;
    }
</style>

<!-- 

        // fen = fen.replaceAll(" ", "%20")
        // const response = await fetch(`https://www.chessdb.cn/cdb.php?action=querybest&board=${fen}`);
        // const data = await response.text();
        // const move = data.split(":")[1]; -->