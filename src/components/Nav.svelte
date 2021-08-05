<script lang="ts">
	import { Router, Link, Route } from 'svelte-routing';
</script>

<nav>
	<Link to="/">Home</Link>
	<Link to="/sun">Sun</Link>
</nav>

<style>
	nav {
		font-size: 2rem;
		display: flex;
		flex-direction: column;
	}
</style>
