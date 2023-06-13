<script>
    import { construct_svelte_component } from 'svelte/internal';
	import { store } from '../hooks/auth';
    import { navigate } from 'svelte-routing'

	let username = '';
	let password = '';
	let error = ''

	async function login() {
        const response = await fetch('https://sveltebackendv2.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
            })
        if (response.status === 200){
			saveID(response)
            $store = username
            navigate('/')
        }
		else {
            error = "Bad username or password"
        }
	}

	async function saveID(response){
		const data = await response.json();
		localStorage.setItem('userId', data.user.id)
	}

</script>

<form on:submit|preventDefault={login} class="flex mx-auto col-6">
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

  <button type="submit">Login</button>
  <div id="error_message">
    <small>{error}</small>
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
</style>
