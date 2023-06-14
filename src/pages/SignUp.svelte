<script>
  import { userStore } from "../store/userStore";
  import { navigate } from "svelte-routing";

  let username = "";
  let password = "";
  let passwordConfirmation = "";
  let error = "";

  if ($userStore) navigate("/");

  async function signup() {
    if (passwordConfirmation !== password) {
      error = "Passwords do not match";
      return;
    }
    const response = await fetch(
      "https://sveltebackendv2.onrender.com/users/register",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    if (response.status === 200) {
      saveUser(response);
      navigate("/");
    } else {
      error = "Bad username or password";
    }
  }

  async function saveUser(response) {
    const data = await response.json();
    userStore.set({ id: data.user.id, username: data.user.username });
  }
</script>

<form on:submit|preventDefault={signup} class="flex mx-auto col-6">
  <div class="box">
    <label for="username">
      <i class="fas fa-user" />
      Username
    </label>
    <input id="username" bind:value={username} />
  </div>

  <div class="box">
    <label for="password">
      <i class="fas fa-lock" />
      Password
    </label>
    <input type="password" id="password" bind:value={password} />
  </div>

  <div class="box">
    <label for="password">
      <i class="fas fa-lock" />
      Password confirmation
    </label>
    <input
      type="password"
      id="password-confirmation"
      bind:value={passwordConfirmation}
    />
  </div>

  <button type="submit">Sign up</button>
  <div id="error_message">
    <small>{error}</small>
  </div>

  <div class="center">
    <a href="/login" class="link">Have an account? Log in</a>
  </div>
</form>

<style scoped>
  #error_message {
    color: red;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 10px;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 10px;
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

  .center {
    display: flex;
    justify-content: center;
  }

  .link {
    color: #ffffff; /* Cambiar a color blanco */
  }
</style>
