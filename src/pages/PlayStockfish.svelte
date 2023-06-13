<script>
  import { onMount } from "svelte";
  import Chessboard from "../components/Chessboard.svelte";
  import TableOfMoves from "../components/TableOfMoves.svelte";
  import { Chess } from "chess.js";

  import stockfish_img from "../assets/stockfish_img.png";
  import wasm_img from "../assets/wasm.png";
  import win_gif from "../assets/win.gif";
  import loss_gif from "../assets/loss.gif";
  import draw_gif from "../assets/draw.gif";

  let chessboard;
  let currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  let game = new Chess(currentFen);
  let history = game.history();
  let playerColor = game.turn();
  const textsOverlay = {
    draw: {
      title: "Draw!",
      text: "The game ended in a draw. You can do better.",
      src: draw_gif,
    },
    win: {
      title: "Check Mate!",
      text: "Congratulations, you won the game. But remember, this Stockfish does not have his real strength.",
      src: win_gif,
    },
    loss: {
      title: "Check Mate!",
      text: "You lost the game. Do better next time.",
      src: loss_gif,
    },
  };

  let currentOverlayText = textsOverlay.loss;
  let overlayShowing = false;

  function restart() {
    chessboard.restartGame();
    overlayShowing = false;
  }

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
        const move = chessboard.makeMove(
          bestMove.slice(0, 2),
          bestMove.slice(2, 4)
        );
      } catch (e) {}
    }
  };

  $: {
    if (!game.isGameOver() && game.turn() !== playerColor) {
      prepareMove(game.fen());
    }

    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        if (game.turn() === playerColor) {
          currentOverlayText = textsOverlay.loss;
        } else {
          currentOverlayText = textsOverlay.win;
        }
      } else if (game.isDraw()) {
        currentOverlayText = textsOverlay.draw;
      }
      overlayShowing = true;
    }
  }
</script>

<div class="container">
  <div class="name-opponent">
    <img src={stockfish_img} alt="stockfish" width="50px" height="50px" />
    <span>
      <b>Stockfish</b>
      <span class="tag"> >3500 Elo </span>
      with
    </span>
    <img src={wasm_img} alt="wasm" width="40px" height="40px" />
  </div>
  <div class="overlay">
    <div class="overlay-content {overlayShowing ? '' : 'hidden'}">
      <h3>{currentOverlayText.title}</h3>
      <p>{currentOverlayText.text}</p>
      <img src={currentOverlayText.src} alt="gif" class="overlay-gif" />
    </div>
  </div>
  <Chessboard bind:this={chessboard} bind:chess={game} bind:history />
  <div class="bottom-section">
    <TableOfMoves {history} />
    <button on:click={restart}>
      <i class="fas fa-undo" />
      Restart Game
    </button>
  </div>
</div>

<style scoped>
  .container {
    margin: 40px 0;
    background-color: #262421;
    padding: 20px;
    border-radius: 5px;
    position: relative;
  }

  img {
    margin: 0 10px;
  }

  .overlay-gif {
    margin: 20px 0;
    margin-bottom: 30px;
    height: 130px;
    max-width: 200px;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    width: calc(100% - 40px);
    aspect-ratio: 1/1;
    pointer-events: none;
  }

  .overlay-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(72, 72, 72, 0.9);
    border-radius: 1rem;
    padding: 0 20px;
    max-width: 250px;
  }

  .hidden {
    display: none;
  }

  .name-opponent {
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

  button {
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    button {
      width: 100px;
    }
  }

  .bottom-section {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    padding: 20px 0;
  }
</style>
