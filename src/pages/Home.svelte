<script>
  import Puzzle from "../components/Puzzle.svelte";
  import { store } from "../hooks/auth";

  let postsData = [];
  let userId = localStorage.getItem("userId");
  let postsLiked = [];
  if (userId) {
    checkLikes(userId);
  }

  async function getPosts() {
    const response = await fetch("https://sveltebackendv2.onrender.com/posts");
    postsData = await response.json();
    postsData = postsData.reverse();
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
    const response = await fetch(
      `https://sveltebackendv2.onrender.com/posts/${postId}/unlike`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId),
        }),
      }
    );
    if (response.status === 200) {
      console.log("disliked");
    } else {
      console.log("error");
    }
  }

  async function giveLike(postId) {
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
    }
  }

  function changeLikesShowing(postId, upOrDown) {
    const likes = document.querySelector(`.likes-id-${postId}`);
    const button = document.querySelector(`.likes-button-id-${postId}`);
    if (upOrDown === "down") {
      postsLiked.pop();
      likes.innerHTML = (parseInt(likes.innerHTML) - 1).toString();
      button.innerHTML = `<i class="far fa-heart"></i>`;
      return;
    }
    postsLiked.push(postId);
    likes.innerHTML = (parseInt(likes.innerHTML) + 1).toString();
    button.innerHTML = `<i class="fas fa-heart" style="color:red;"></i>`;
  }

  function giveOrDeleteLike(postId) {
    if (postsLiked.includes(postId)) {
      changeLikesShowing(postId, "down");
      deleteLike(postId);
    } else {
      changeLikesShowing(postId, "up");
      giveLike(postId);
    }
  }

  $: {
    if ($store) {
      userId = localStorage.getItem("userId");
      checkLikes(userId);
      getPosts();
    }
    if ($store === null) {
      userId = null;
      postsLiked = [];
      getPosts();
    }
  }
</script>

<main>
  {#each postsData as post, index (post.id)}
    <div class="container">
      <div class="upper-container">
        <section class="user-container">
          <span class="username">{post.username}</span>
          <p>{post.description}</p>
        </section>
        <section class="like-section">
          <button
            class="like-button likes-button-id-{post.id}"
            on:click={() => giveOrDeleteLike(post.id)}
            disabled={$store === null}
          >
            {#if postsLiked.includes(post.id)}
              <i class="fas fa-heart" style="color:red;" />
            {:else}
              <i class="far fa-heart" />
            {/if}
          </button>
          <div class="tag">
            +<span class="number-likes likes-id-{post.id}">{post.likes}</span>
          </div>
        </section>
      </div>

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
    text-align: justify;
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
    max-width: 500px;
    box-shadow: inset 0 0 5px #000000;
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

  .upper-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .like-button {
    all: unset;
    cursor: pointer;
    font-size: 1.5rem;
  }
  .like-button:active {
    transform: scale(1.1);
    filter: drop-shadow(0 0 0.2rem red);
  }

  .like-section {
    padding-left: 50px;
  }
</style>
