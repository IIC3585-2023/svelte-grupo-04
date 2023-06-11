<script>
    import Navbar from '../components/Navbar.svelte';
    import Chessboard from '../components/Chessboard.svelte';


    let postsData = [];

    async function getPosts() {
        const response = await fetch('https://sveltebackendv2.onrender.com/posts')
        postsData = await response.json();
        // console.log(postsData[0])
	}
    getPosts()
</script>

<main>
    {#each postsData as post, index (post.id)}
        <h2>{post.username}</h2>
        <h2>{post.description}</h2>
        <Chessboard pgn={post.pgn} />
        <h2>{post.tags}</h2>
        
    {/each}
</main>


<style scoped>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

</style>
