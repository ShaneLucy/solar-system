<script lang="ts">
	import { Router, Route } from 'svelte-routing';
	import CelestialObject from './components/CelestialObject.svelte';
	import SolarSystem from './views/SolarSystem.svelte';

	export let url = '';
	const objects = [
		'sun',
		'mercury',
		'venus',
		'earth',
		'mars',
		'jupiter',
		'saturn',
		'uranus',
		'neptune'
	];
</script>

<svelte:head>
	<link rel="manifest" href={'assets/favicons/solar-system/site.webmanifest'} />
	<link
		rel="mask-icon"
		href={'assets/favicons/solar-system/safari-pinned-tab.svg'}
		color="#5bbad5"
	/>
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<Router {url}>
	<div>
		<Route path="/">
			<SolarSystem />
		</Route>
		{#each objects as object}
			<Route path={`/${object}`}>
				<CelestialObject name={object} />
			</Route>
		{/each}
	</div>
</Router>
