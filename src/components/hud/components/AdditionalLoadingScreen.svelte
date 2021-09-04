<script lang="ts">
	import {
		loadingPercent,
		loadedObjects,
		objectsToLoad,
		showAdditionalLoader
	} from '../../../store';
	import { sineInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let totalProgressMax: number;

	onMount(() => {
		totalProgressMax = $objectsToLoad.length;
	});
</script>

<aside transition:fly={{ x: 200, easing: sineInOut, duration: 1_250 }} class="container">
	<header>
		<svg
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			on:click={() => showAdditionalLoader.set(!$showAdditionalLoader)}
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
	</header>
	<div class="content">
		<label for="total"
			>Generating Remainder {(($loadedObjects.length / totalProgressMax) * 100).toFixed(0)}%</label
		>
		<progress id="total" max={totalProgressMax} value={$loadedObjects.length}
			>{(($loadedObjects.length / totalProgressMax) * 100).toFixed(0)}%</progress
		>

		<ol>
			{#each $objectsToLoad as objectToLoad, index}
				<li>
					{#if $loadedObjects.length === 0 && index === 0}
						<label for={objectToLoad}>{objectToLoad} {$loadingPercent}%</label>
						<progress id={objectToLoad} value={$loadingPercent} max="100"
							>{$loadingPercent}</progress
						>
					{:else if index < $loadedObjects.length}
						<label for={objectToLoad}>{objectToLoad} 100%</label>
						<progress id={objectToLoad} value="100" max="100">{$loadingPercent}</progress>
					{:else if index === $loadedObjects.length}
						<label for={objectToLoad}>{objectToLoad} {$loadingPercent}%</label>
						<progress id={objectToLoad} value={$loadingPercent} max="100"
							>{$loadingPercent}</progress
						>
					{:else}
						<label for={objectToLoad}>{objectToLoad} 0%</label>
						<progress id={objectToLoad} value="0" max="100">{$loadingPercent}</progress>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
</aside>

<style>
	aside {
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem;
	}

	.content {
		padding: 1.25rem 2rem;
		border-radius: 0.75rem;
	}

	header {
		justify-content: flex-end;
	}

	progress {
		width: 100%;
	}

	li {
		text-transform: capitalize;
		padding: 0.15rem 0;
	}

	ol {
		padding-left: 2ch;
	}
</style>
