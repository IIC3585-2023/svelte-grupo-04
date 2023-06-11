
<script>
	import { store } from '../hooks/auth';
  import { navigate } from 'svelte-routing'
  async function logout() {
        $store = null
        navigate("/")
  }
</script> 
   <nav class="navbar">
    <div class="navbar-links" >
      <a class="navbar-title"  href="/">
        <i class="fas fa-chess"></i> InstaChess
      </a>
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
     <div class="navbar-links" >
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
      display: flex;
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
     }
</style>