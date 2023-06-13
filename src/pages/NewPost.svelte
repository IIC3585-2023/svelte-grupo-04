<script>
  import { store } from "../hooks/auth";
  import { navigate } from "svelte-routing";

  let pgn = "";
  let description = "";
  let solution = "";
  let tags = "";
  let error = "";

  async function sendNewPost() {
    const response = await fetch("https://sveltebackendv2.onrender.com/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: $store,
        pgn: pgn,
        puzzle: {
          solution: solution.split(","),
        },
        description: description,
        tags: tags.split(","),
      }),
    });
    if (response.status === 200) {
      navigate("/");
    } else {
      console.log("error");
    }
  }
</script>

<form on:submit|preventDefault={sendNewPost} class="flex mx-auto col-6">
  <h3>
    <i class="fas fa-upload" />
    Upload Puzzle
  </h3>
  <div>
    <label for="pgn"> PGN </label>
    <input type="text" id="pgn" bind:value={pgn} />
  </div>

  <div>
    <label for="description">Description</label>
    <input type="text" id="description" bind:value={description} />
  </div>

  <div>
    <label for="solution">Solution (csv format)</label>
    <textarea id="solution" bind:value={solution} />
  </div>

  <div>
    <label for="tags">Tags (csv format)</label>
    <input type="text" id="tags" bind:value={tags} />
  </div>

  <button type="submit">Submit</button>
  <div id="error_message">
    <small>{error}</small>
  </div>
</form>

<style scoped>
  #error_message {
    color: red;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    padding: 10px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: #262421;
    gap: 10px;
    padding: 40px;
    margin: 50px 0;
    border-radius: 0.5rem;
  }

  button {
    margin: 20px 0;
  }
</style>
