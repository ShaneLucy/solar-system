<script lang="ts">
	import { Router, Link, Route } from 'svelte-routing';
	import Home from '../views/SolarSystem.svelte';
	import Sun from '../views/Sun.svelte';

	export let url = '';
</script>

<Router {url}>
	<nav>
		<Link to="/">Home</Link>
		<Link to="/sun">Sun</Link>
	</nav>
	<div>
		<Route path="/sun" component={Sun} />
		<Route path="/"><Home /></Route>
	</div>
</Router>

<style>
	nav {
		font-size: 2rem;
		display: flex;
		flex-direction: column;
	}
</style>
