<script>
	import { store } from '../hooks/auth';

	let username = '';
	let password = '';
	let error = ''

	async function login() {
        const response = await fetch('https://sveltebackendv2.onrender.com/users/login', {
			method: 'POST',
			body: JSON.stringify({
				username:username,
				password:password
			})
		})
        console.log(response)
		$store = username
	}

</script>

<form on:submit|preventDefault={login} class="flex mx-auto col-6">

	<div class="mb-3">
		<label for="username" class="form-label">Username</label>
		<input class="form-control" id="username" bind:value={username} />
	</div>

	<div class="mb-3">
		<label for="password" class="form-label">Password</label>
		<input type="password" class="form-control" id="password" bind:value={password} />
	</div>

	<button type="submit" class="btn btn-primary">Submit</button>
	<div id="error_message" class="text-danger">
		<small>{error}</small>
	</div>

</form>