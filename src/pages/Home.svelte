<script>
    import Puzzle from '../components/Puzzle.svelte'


    let postsData = [];

    async function getPosts() {
        const response = await fetch('https://sveltebackendv2.onrender.com/posts')
        postsData = await response.json();
        console.log(postsData[0])
	}
    getPosts()
</script>

<main>
    {#each postsData as post, index (post.id)}
    <div class="container">
        <h3>{post.username}</h3>
        <p>{post.description}</p>
        <Puzzle pgn={post.pgn} key={index.toString()} solution={post.puzzle.solution}/>
        <div class="tags-container">
            {#each post.tags as tag}
                <span class="tag">{tag}</span>
            {/each}
        </div>
    </div>
    {/each}
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
