<script>
    import Navbar from '../components/Navbar.svelte';


    let postsData = [];

    async function getPosts() {
        const response = await fetch('https://sveltebackendv2.onrender.com/posts')
        postsData = await response.json();
	}
    getPosts()
</script>

<Navbar></Navbar>
<div>
    <h1> AQUI ESTÁN LOS POSTS </h1>
    <div>
        {#each postsData as post, index (post.id)}
            <h3>{post.id} - {post.pgn}</h3>
        {/each}
    </div>

</div>
