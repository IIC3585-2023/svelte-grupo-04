<script>
    import {puzzleIds} from '../utils/puzzles.js';
    import Puzzle from '../components/Puzzle.svelte'
    import { onMount } from 'svelte';

    let randomPuzzle = puzzleIds[Math.floor(Math.random() * puzzleIds.length)];
    let postsData = [];
    let pgnData;
    let solutionData;
    let tagsData = [];

    async function getPosts() {
        const response = await fetch(`https://lichess.org/api/puzzle/${randomPuzzle}`)
        postsData = await response.json();
        pgnData = postsData["game"]["pgn"];
        solutionData = postsData["puzzle"]["solution"]
        tagsData = postsData["puzzle"]["themes"];
	}
    onMount(async () => {
        await getPosts();
    });
</script>

<main>
    <div>
        <h1>Aqui deben haber puzzles random</h1>
        <div class="container">
            {#await getPosts()}
                <p>Loading...</p>
            {:then}
                <Puzzle pgn={pgnData} key={randomPuzzle.toString()} solution={solutionData}/>
                <div class="tags-container">
                    {#each tagsData as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            {:catch error}
                <p>Error: {error.message}</p>
            {/await}
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

</style>