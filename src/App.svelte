<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Puzzles from "./pages/Puzzles.svelte";
  import Login from "./pages/Login.svelte";
  import PlayStockfish from "./pages/PlayStockfish.svelte";
  import Navbar from "./components/Navbar.svelte";
  import NewPost from "./pages/NewPost.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import SignUp from "./pages/SignUp.svelte";
  import { userStore } from "./store/userStore";

  const BASE_URL = "/svelte-grupo-04";
</script>

<Navbar />

<Router>
  <Route path="{BASE_URL}/" component={Home} />
  <Route path="{BASE_URL}/puzzles" component={Puzzles} />
  <Route path="{BASE_URL}/stockfish" component={PlayStockfish} />
  <Route path="{BASE_URL}/login" component={Login} />
  <Route path="{BASE_URL}/signup" component={SignUp} />
  {#if $userStore}
    <Route path="{BASE_URL}/new_post" component={NewPost} />
  {:else}
    <Route path="{BASE_URL}/new_post" component={NotFound} />
  {/if}
</Router>
