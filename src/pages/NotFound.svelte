<script>
    import { Link } from 'svelte-routing';
</script>

<div class="container">
    <h1>What are you doing here? 🤔</h1>
    <h3>You don't have permission to access this page 🤕.</h3>
    <h4>
        Go back to 
        <button>
            <Link to="/" style="all: unset;">Home page</Link>
        </button>
    </h4>
</div>

<style scoped>

    h3, h4 {
        font-weight: 400;
    }

    .container {
        padding: 20px; 
        background-color: #262421;
        margin: 40px 0;
        max-width: 400px;
    }
</style>