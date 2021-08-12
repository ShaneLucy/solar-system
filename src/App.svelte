<script lang="ts">
	import { Router, Route } from 'svelte-routing';
	import CelestialObjectGenerator from './components/CelestialObjectGenerator.svelte';
	import SolarSystem from './views/SolarSystem.svelte';
	import type { CelestialObject } from './types/index';
	import { config } from './config';

	export let url = '';
	const celestialObjects: Array<CelestialObject> = config();
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
	<Route path="/">
		<SolarSystem />
	</Route>
	{#each celestialObjects as object}
		<Route path={`/${object.name}`}>
			<CelestialObjectGenerator
				name={object.name}
				additionalObjects={object.additionalObjects}
				classification={object.classification}
			/>
		</Route>
		{#if object.additionalObjects !== null}
			{#each object.additionalObjects as additionalObject}
				<Route path={`/${additionalObject.name}`}>
					<CelestialObjectGenerator
						name={additionalObject.name}
						additionalObjects={null}
						classification={additionalObject.classification}
					/>
				</Route>
			{/each}
		{/if}
	{/each}
</Router>
