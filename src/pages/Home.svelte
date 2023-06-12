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
        <div class="user-container">
            <span class="username">{post.username}</span>
            <p>{post.description}</p>
        </div>
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

    .username {
        font-size: 1.1rem;
        font-weight: bold;
        color: #fff;
    }

    .username, p {
        padding: 0 10px;
    }

    .user-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        width: 100%;
        padding: 15px 0
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #262421;
        padding: 20px;
        margin: 20px 0;
        border-radius: 0.5rem;
    }

    @media (max-width: 768px) {
        .container {
            padding: 20px 10px;
        }
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
