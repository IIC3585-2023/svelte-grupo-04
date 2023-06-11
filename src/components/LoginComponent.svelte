<script>
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
            $store = username
            navigate('/')
        }
		else {
            error = "Bad username or password"
        }
	}

</script>

<form on:submit|preventDefault={login} class="flex mx-auto col-6">

	<div >
		<label for="username" >Username</label>
		<input id="username" bind:value={username} />
	</div>

	<div >
		<label for="password" >Password</label>
		<input type="password"  id="password" bind:value={password} />
	</div>

	<button type="submit" >Submit</button>
	<div id="error_message" >
		<small>{error}</small>
	</div>

</form>