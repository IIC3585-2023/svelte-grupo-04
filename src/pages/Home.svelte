<script>
  import Puzzle from "../components/Puzzle.svelte";

  let postsData = [];

  const userId = parseInt(localStorage.getItem("userId"));
  console.log(userId);
  let postsLiked = [];
  if (userId) {
    checkLikes(userId);
  }

  async function getPosts() {
    const response = await fetch("https://sveltebackendv2.onrender.com/posts");
    postsData = await response.json();
    // console.log(postsData)
  }
  getPosts();

  async function checkLikes(userId) {
    const response = await fetch(
      `https://sveltebackendv2.onrender.com/posts/likes/${userId}`
    );
    const likes = await response.json();
    if (response.status === 200) {
      postsLiked = likes;
    } else {
      console.log("Error: " + response.status);
      postsLiked = [];
    }
  }

  async function deleteLike(postId) {
    changeLikesShowing(postId, "down");
    const response = await fetch(
      `https://sveltebackendv2.onrender.com/posts/${postId}/unlike`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );
    if (response.status === 200) {
      console.log("disliked");
    } else {
      console.log("error");
      changeLikesShowing(postId, "up");
    }
  }

  async function giveLike(postId) {
    changeLikesShowing(postId, "up");
    const response = await fetch(
      `https://sveltebackendv2.onrender.com/posts/${postId}/like`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );
    if (response.status === 200) {
      console.log("like");
    } else {
      console.log("error");
      changeLikesShowing(postId, "down");
    }
  }

  function changeLikesShowing(postId, upOrDown) {
    const likes = document.querySelector(`.likes-id-${postId}`);
    const button = document.querySelector(`.likes-button-id-${postId}`);
    if (upOrDown === "down") {
      postsLiked.pop();
      likes.innerHTML = (parseInt(likes.innerHTML) - 1).toString();
      button.innerHTML = "Like";
      return;
    }
    postsLiked.push(postId);
    likes.innerHTML = (parseInt(likes.innerHTML) + 1).toString();
    button.innerHTML = "Dislike";
  }

  function giveOrDeleteLike(postId) {
    if (postsLiked.includes(postId)) {
      deleteLike(postId);
    } else {
      giveLike(postId);
    }
  }

</script>

<main>
  {#each postsData as post, index (post.id)}
    <div class="container">
      <div class="user-container">
        <span class="username">{post.username}</span>
        <p>{post.description}</p>
      </div>
      <span class="number-likes likes-id-{post.id}">{post.likes}</span>
      <span>Likes</span>
      <button class="likes-button-id-{post.id}" on:click={() => giveOrDeleteLike(post.id)} disabled={!userId}>
        {#if postsLiked.includes(post.id)}
          Dislike
        {:else}
          Like
        {/if}
      </button>
      
      <Puzzle
        pgn={post.pgn}
        key={index.toString()}
        solution={post.puzzle.solution}
      />
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

  .username,
  p {
    padding: 0 10px;
  }

  .user-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 100%;
    padding: 15px 0;
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
