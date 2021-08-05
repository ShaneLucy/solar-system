<script lang="ts">
	import { Router, Link, Route } from 'svelte-routing';
	import Home from './views/SolarSystem.svelte';
	import Sun from './views/Sun.svelte';

	export let url = '';
</script>

<Router {url}>
	<div>
		<Route path="/sun" component={Sun} />
		<Route path="/"><Home /></Route>
	</div>
</Router>
