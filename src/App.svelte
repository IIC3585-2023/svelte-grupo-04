<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Puzzles from "./pages/Puzzles.svelte";
  import Login from "./pages/Login.svelte";
  import PlayStockfish from "./pages/PlayStockfish.svelte";
  import Navbar from "./components/Navbar.svelte";
  import NewPost from "./pages/NewPost.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import { userStore } from "./store/userStore";
</script>

<Navbar />

<Router>
  <Route path="/" component={Home} />
  <Route path="/puzzles" component={Puzzles} />
  <Route path="/stockfish" component={PlayStockfish} />
  <Route path="/login" component={Login} />
  {#if $userStore}
    <Route path="/new_post" component={NewPost} />
  {:else}
    <Route path="/new_post" component={NotFound} />
  {/if}
</Router>
