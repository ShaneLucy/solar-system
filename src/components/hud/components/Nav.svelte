<script lang="ts">
	import { Link } from 'svelte-routing';
	import { sineInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { completedCelestialObjects } from '../../../config';
	import { showNavBar } from '../../../store';
</script>

<aside transition:fly={{ x: -200, easing: sineInOut, duration: 1_250 }}>
	<header>
		<svg
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			on:click={() => showNavBar.set(!$showNavBar)}
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
	</header>
	{#each completedCelestialObjects as object}
		<Link to={`/${object.name}`}>
			{object.name}
		</Link>
		{#if object.additionalObjects !== null}
			{#each object.additionalObjects as additionalObject}
				<Link to={`/${additionalObject.name}`}>
					{additionalObject.name}
				</Link>
			{/each}
		{/if}
	{/each}
</aside>

<style>
	aside {
		display: flex;
		flex-direction: column;
		left: 0;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}

	header {
		justify-content: flex-start;
	}
</style>
