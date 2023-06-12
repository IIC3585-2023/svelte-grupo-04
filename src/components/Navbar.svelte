
<script>
	import { store } from '../hooks/auth';
  import { navigate } from 'svelte-routing'


  // if width of screen is less than 768px, navbar will be hidden
  let displayNav = window.innerWidth > 768 ? 'flex' : 'none'
  let displayButton = window.innerWidth > 768 ? 'none' : 'inline'

  async function logout() {
        $store = null
        navigate("/")
  }

  function toggleNavbar() {
    displayNav = displayNav === 'flex' ? 'none' : 'flex'
  }

  // event listener to innerWidth

  window.onresize = () => {
    displayNav = window.innerWidth > 768 ? 'flex' : 'none'
    displayButton = window.innerWidth > 768 ? 'none' : 'inline'
  }

  $ : {
    displayNav = window.innerWidth > 768 ? 'flex' : 'none'
    displayButton = window.innerWidth > 768 ? 'none' : 'inline'
  }

  
</script> 



<nav class="navbar">
  <div class="navbar-title">
    <button class="navbar-toggle" style="display: {displayButton}" on:click={toggleNavbar}>
      <i class="fas fa-bars"></i>
    </button>
    <a href="/">
      <i class="fas fa-chess"></i> InstaChess
    </a>
  </div>
  <div class="navbar-links" style="display: {displayNav}">
    <a href="/puzzles">
      <i class="fas fa-puzzle-piece"></i>
      Puzzles
    </a>
    <a href="/stockfish">
      <i class="fas fa-robot"></i>
      Stockfish
    </a>
    {#if $store}
    <a href="/new_post">
      <i class="fas fa-plus"></i>
      New post
    </a>
      {/if}
  </div>
  <div class="navbar-links" style="display: {displayNav}">
    {#if $store === null}
    <a href="/login">
      <i class="fas fa-sign-in-alt"></i>
      Login
    </a>
    {:else}
      <button on:click={logout}>
        <i class="fas fa-sign-out-alt"></i>
        Logout
      </button>
    {/if}
  </div>
</nav>
   
   
<style scoped>

    button {
      all: unset;
    }

    a, button {
      cursor: pointer;
      text-decoration: none;
      color: #fafafa;
      font-weight: 600;
      padding: 15px 20px;
    }

    a:hover, button:hover {
      color: #cacaca;
      background-color: #2a2926;
    }

    .navbar-title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .navbar-links {
      display: none;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
    }

    .navbar {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      background-color: #373531;
      box-shadow: inset 0px -10px 10px 0px rgba(0,0,0,0.1), 0px 0px 10px 0px rgba(0,0,0,0.75);
      height: 64px;
     }

     @media (max-width: 768px) {
      .navbar {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
      }
      .navbar-links {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
      }
    }
</style>