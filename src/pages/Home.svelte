<script>
    import Puzzle from '../components/Puzzle.svelte'

    let postsData = [];

    const userId = parseInt(localStorage.getItem('userId'));

    async function getPosts() {
        const response = await fetch('https://sveltebackendv2.onrender.com/posts')
        postsData = await response.json();
        console.log(postsData)
	}
    getPosts();

    async function checkLike(postId) {
        const response = await fetch(`https://sveltebackendv2.onrender.com/posts/likes/${userId}`);
        const likes = await response.json();
        if (likes.includes(postId)){
            const isLiked = true;
            return true;
        } else {
            const isLiked = false;
            return false;
        }
    }

    async function deleteLike(postId){
        const response = await fetch(`https://sveltebackendv2.onrender.com/posts/${postId}/unlike`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userId": userId
        }),
        });
        console.log(response);
        if (response.status === 200) {
            console.log("unlike");    
            const isLiked = false;
            await getPosts();
        } else {
            console.log("error");
        }
    }

    async function giveLike(postId) {
        const response = await fetch(`https://sveltebackendv2.onrender.com/posts/${postId}/like`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userId": userId
        }),
        });
        if (response.status === 200) {
            console.log("like");    
            const isLiked = true;
            checkLike(userId);
            await getPosts();
        } else {
            console.log("error");
        }
    }

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
            {#await checkLike(post.id)}
                <p>Verificando...</p>
            {:then isLiked}
                {#if isLiked === true}
                    <button on:click={() => deleteLike(post.id)}>
                        <span class="tag-likes">{post.likes} Likes</span>
                        Dislike
                    </button>
                {:else}
                    <button on:click={() => giveLike(post.id)}>
                        <span class="tag-likes">{post.likes} Likes</span>
                        Like
                    </button>
                {/if}
            {:catch error}
                <p>Error: {error.message}</p>
            {/await}
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

    .tag-likes {
        background-color: #333;
        font-size: small;
        border-radius: 5px;
        padding: 5px;
        margin: 10px 5px;
    }

</style>
