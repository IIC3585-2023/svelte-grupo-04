
<script>
	import { store } from '../hooks/auth';
  import { navigate } from 'svelte-routing'
  async function logout() {
        localStorage.removeItem("content")
        navigate("/")
  }
  
</script> 
   <div class="navbar">
    <a class="navbar-title"  href="/">
        Website
    </a>
     <div class="navbar-links" >
       <a href="/puzzles"> Puzzles </a>
       <a href="/stockfish"> Stockfish </a>
       {#if $store === null}
        <a href="/login"> Login </a>
       {:else}
       <a href="/new_post"> New post </a>
       <a href="" on:click={logout}>Logout</a>
       {/if}
     </div>
   </div>
   
   
   <style>
     .navbar {
       display: flex;
       align-items: center;
       justify-content: space-between;
       width: 100%;
       top:0;
     }
   </style>