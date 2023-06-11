<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import Puzzles from './pages/Puzzles.svelte';
  import Login from './pages/Login.svelte';
  import Navbar from './components/Navbar.svelte';
</script>

<Navbar/>


<Router>
  <Route path="/" component={Home} />
  <Route path="/puzzles" component={Puzzles} />
  <Route path="/login" component={Login} />
</Router>