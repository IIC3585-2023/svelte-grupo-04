<script>
  import { onMount } from "svelte";

  export let history = [];
  let movesArray = [];

  const SYMBOLS = {
    N: "♞",
    B: "♝",
    R: "♜",
    Q: "♛",
    K: "♚",
    P: "♟",
  };

  function transformMovesInArray(array) {
    let newArray = [];
    // iterate by 2
    for (let i = 0; i < array.length; i += 2) {
      let move = {
        white: transformNotation(array[i]),
        black: transformNotation(array[i + 1]),
      };
      newArray.push(move);
    }
    return newArray;
  }

  function transformNotation(move) {
    if (move === undefined) {
      return "";
    }
    if (move.length === 2 || "O" === move[0]) {
      return move;
    }
    let newMove = "";
    for (let i = 0; i < move.length; i++) {
      if (SYMBOLS[move[i]]) {
        newMove += SYMBOLS[move[i]];
      } else {
        newMove += move[i];
      }
    }
    return newMove;
  }
  onMount(() => {
    movesArray = transformMovesInArray(history);
  });

  $: {
    movesArray = transformMovesInArray(history);
  }
</script>

<table>
  <tbody>
    {#each movesArray as move, index}
      <tr>
        <td class="td-num">{index + 1}</td>
        <td class="td-move">{move.white}</td>
        <td class="td-move">{move.black}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style scoped>
  table {
    border: 2px solid #444;
    border-collapse: collapse;
    margin: 2%;
    max-width: 100px;
  }

  .td-num {
    background-color: #302e2c;
    padding: 5px;
    min-width: 40px;
    text-align: center;
    border: 1px solid #404040;
  }

  .td-move {
    background-color: #262421;
    border: 1px solid #262421;
    margin: 2%;
    padding: 5px;
    padding-left: 10px;
    min-width: 90px;
  }

  @media (max-width: 768px) {
    .td-num {
      min-width: 20px;
    }
    .td-move {
      min-width: 40px;
    }
  }
</style>
