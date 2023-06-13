<script>
  import { Chess } from "chess.js";
  import piecesjson from "../utils/pieces.json";
  import { onMount } from "svelte";
  import DragDropTouch from "svelte-drag-drop-touch";

  // props
  export let pgn = null;
  export let fen = null;
  export let key = Math.random().toString(36).substring(7);
  export let correctPuzzleMove = null;
  export let reset = false;
  export let isGameStopped = false;
  export let chess = new Chess();
  export let history = [];
  export function makeMove(sourceSquare, targetSquare) {
    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
      // After the move, update the component's position and re-render
      position = chess.board();
      fen = chess.fen();
      currentTurn = chess.turn();
      const squares = document.querySelectorAll(`.square-${key}`);
      if (lastMove) {
        highLightSquares(squares, [lastMove.from, lastMove.to], "remove");
      }
      lastMove = chess.history({ verbose: true }).slice(-1)[0];
      highLightSquares(squares, [lastMove.from, lastMove.to]);
      if (pointOfView === "b") {
        position = position.map((row) => row.reverse()).reverse();
      }
      audio_move.play();
      return 1;
    } catch (e) {
      // console.log("Invalid move");
      // console.log(e);
      return 0;
    }
  }
  export function restartGame() {
    chess.reset();
    position = chess.board();
    fen = chess.fen();
    currentTurn = chess.turn();
    history = [];
    lastMove = null;
    removeAllHighlights();
    if (pointOfView === "b") {
      position = position.map((row) => row.reverse()).reverse();
    }
  }

  // check props
  if (pgn && fen) {
    throw new Error("You can only pass one of pgn or fen");
  }

  // variables
  let lastMove = null;
  if (pgn) {
    chess.loadPgn(pgn);
    history = chess.history();
    lastMove = chess.history({ verbose: true }).slice(-1)[0];
  } else if (fen) {
    chess.load(fen);
  } else {
  }
  let position = chess.board();
  let currentTurn = chess.turn();
  let pointOfView = currentTurn;
  if (pointOfView === "b") {
    position = position.map((row) => row.reverse()).reverse();
  }
  let currSourceSquare = null;
  const audio_move = new Audio(piecesjson["audio_move"]);

  // methods

  function resetComponent() {
    const squares = document.querySelectorAll(`.square-${key}`);
    if (lastMove) {
      highLightSquares(squares, [lastMove.from, lastMove.to], "remove");
    }
    chess = new Chess();
    lastMove = null;
    position = [];
    fen = null;
    currentTurn = null;
    pointOfView = null;
    currSourceSquare = null;
    audio_move.pause();
    audio_move.currentTime = 0;
    isGameStopped = false;

    if (pgn) {
      chess.loadPgn(pgn);
      lastMove = chess.history({ verbose: true }).slice(-1)[0];
    } else if (fen) {
      chess.load(fen);
    }

    position = chess.board();
    currentTurn = chess.turn();
    pointOfView = currentTurn;
    if (pointOfView === "b") {
      position = position.map((row) => row.reverse()).reverse();
    }

    highLightSquares(squares, [lastMove?.from, lastMove?.to]);
  }

  const removeAllHighlights = () => {
    const squares = document.querySelectorAll(`.square-${key}`);
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.remove("light-highlighted");
      squares[i].classList.remove("dark-highlighted");
    }
  };

  const getNumCoordsBySquare = (square) => {
    let file = square.charCodeAt(0) - 97;
    let rank = 8 - parseInt(square[1]);
    if (pointOfView === "b") {
      file = 7 - file;
      rank = 7 - rank;
    }
    return [file, rank];
  };

  function getSquareByNumCoords(j, i) {
    if (pointOfView === "b") {
      j = 7 - j;
      i = 7 - i;
    }
    return String.fromCharCode(97 + j) + (8 - i);
  }

  function getSquareColor(file_num, rank_num) {
    let isEvenSquare = (file_num + rank_num) % 2 === 0;

    return isEvenSquare ? "light" : "dark";
  }

  function getLabel(j, i) {
    if (i === 7) {
      j = pointOfView === "w" ? j : 7 - j;
      return String.fromCharCode(97 + j);
    }
    i = pointOfView === "w" ? i : 7 - i;
    return 8 - i;
  }

  function highLightSquares(
    listOfAllSquares,
    squaresToHighlight,
    addOrRemove = "add"
  ) {
    squaresToHighlight.map((square) => {
      let [file, rank] = getNumCoordsBySquare(square);
      let index = 8 * rank + file;
      let classToAdd =
        getSquareColor(file, rank) === "light"
          ? "light-highlighted"
          : "dark-highlighted";
      addOrRemove === "add"
        ? listOfAllSquares[index].classList.add(classToAdd)
        : listOfAllSquares[index].classList.remove(classToAdd);
    });
  }

  function handleDragStart(event) {
    currSourceSquare = event.target.dataset.square;

    // if window is not mobile
    if (typeof screen.orientation !== "undefined") {
      // center image on cursor
      const img = new Image();
      img.src = event.target.src;
      img.width = 50;
      event.dataTransfer.setDragImage(img, 25, 25);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const sourceSquare = currSourceSquare;
    // get targetSquare by position of cursor
    const targetSquare = event.target.dataset.square;
    dropPiece(sourceSquare, targetSquare);
  }

  function dropPiece(sourceSquare, targetSquare) {
    const isValid = makeMove(sourceSquare, targetSquare);
    // se puede mover esto a puzzle pero lo hago aqui, mas rapido
    if (correctPuzzleMove && isValid) {
      let { isCorrect, isSolved, answerSourceSquare, answerTargetSquare } =
        correctPuzzleMove(sourceSquare, targetSquare);
      if (isCorrect) {
        makeMove(answerSourceSquare, answerTargetSquare);
      } else {
        isGameStopped = true;
      }
      if (isSolved) {
        isGameStopped = true;
      }
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
  $: {
    if (reset) {
      resetComponent();
      reset = false;
    }

    if (chess) {
      history = history.concat(chess.history());
      chess = chess;
    }

    if (fen) {
      chess.load(fen);
      position = chess.board();
      if (pointOfView === "b") {
        position = position.map((row) => row.reverse()).reverse();
      }
      currentTurn = chess.turn();
    }
  }
</script>

<div class="game-container">
  <div class="chessboard">
    <!-- iterate in position -->
    <!-- rotate board -->
    {#each position as row, i}
      {#each row as squareData, j}
        <div
          class="square square-{key} {getSquareColor(j, i)}"
          data-square={getSquareByNumCoords(j, i)}
          on:dragover={handleDragOver}
          on:drop={handleDrop}
        >
          {#if i === 7 || j === 7}
            <span class="label-coord">
              {getLabel(j, i)}
            </span>
          {/if}
          {#if squareData}
            <!-- if piece is king add class king -->
            <img
              src={piecesjson[squareData.type + squareData.color]}
              data-square={getSquareByNumCoords(j, i)}
              alt=""
              class="piece {(chess.isCheck() || chess.isCheckmate()) &&
              squareData.type === 'k' &&
              squareData.color === currentTurn
                ? 'check-shadow'
                : ''}
              {currentTurn === squareData.color && !isGameStopped
                ? 'draggable'
                : ''}"
              on:dragstart={handleDragStart}
              draggable={currentTurn === squareData.color && !isGameStopped}
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
  }

  .game-container {
    border: 4px solid #6c513b;
  }

  @media (max-width: 600px) {
    .chessboard {
      width: 100%;
      height: 100%;
    }
  }

  .square {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    -webkit-user-drag: none;
  }

  .piece {
    width: 100%;
    height: 100%;
    touch-action: none;
    -ms-touch-action: none;
  }

  .draggable {
    cursor: grab;
  }

  .draggable:active {
    cursor: grabbing;
  }

  .check-shadow {
    filter: drop-shadow(0 0 0.6rem #ff0000);
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
