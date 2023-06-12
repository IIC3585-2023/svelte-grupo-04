<script>
    import {puzzleIds} from '../utils/puzzles.js';
    import Puzzle from '../components/Puzzle.svelte'
    import { onMount } from 'svelte';

    let randomPuzzle;
    let postsData = [];
    let pgnData = "";
    let solutionData = "";
    let tagsData = [];

    async function getPuzzle() {
        randomPuzzle = puzzleIds[Math.floor(Math.random() * puzzleIds.length)];
        const response = await fetch(`https://lichess.org/api/puzzle/${randomPuzzle}`)
        postsData = await response.json();
        pgnData = postsData["game"]["pgn"];
        solutionData = postsData["puzzle"]["solution"]
        tagsData = postsData["puzzle"]["themes"];
	}

    function handleClick() {
        postsData = [];
        tagsData = [];
        pgnData = "";
        solutionData = "";
        getPuzzle();
    }
    onMount(async () => {

        await getPuzzle();
    });
</script>

<main>
    <div>
        <div class="container">
            {#if pgnData === ''}
                <div class="loading-spinner"></div>
            {:else}
                <Puzzle pgn={pgnData} key={randomPuzzle.toString()} solution={solutionData}/>
                <div class="tags-container">
                    {#each tagsData as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                    <button class="button-random" on:click={handleClick}>
                        Get Other Puzzle
                    </button>
                </div>
            {/if}
        </div>
    </div>
</main>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #262421;
        padding: 10px;
        margin: 20px 0;
        border-radius: 0.5rem;
    }

    .tags-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        flex-wrap: wrap;
    }

    .tag {
        background-color: #333;
        font-size: small;
        border-radius: 5px;
        padding: 5px;
        margin: 10px 5px;
    }

    .button-random {
    justify-self: auto;
    /* background-color: rgb(49, 166, 216); */
    background-color: #333;
    color: white;
    width: 100%;
    padding: 3px 0;
    margin: 0.5rem 0;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    }
    .button-random:hover {
    filter: brightness(1.2);
    }

    .button-random:focus {
    outline: none;
    }

    .loading-spinner {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid #ccc;
    border-top-color: #333;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }}

</style>