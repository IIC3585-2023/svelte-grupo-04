<script>
  import { onMount, afterUpdate } from 'svelte';
  import piecesjson from '../utils/pieces.json';

  export let piece;

  let pic = '';
  let color = '';

  function assignPieceInfo() {
    color = piece[1];
    pic = piecesjson[piece];
  }

  onMount(() => {
    assignPieceInfo();
  });

  $: {
    if (piece) {
      assignPieceInfo();
    }
  }
</script>

<img src={pic} class="piece" alt="" />

<style>
  .piece {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    pointer-events: none;
  }
</style>
