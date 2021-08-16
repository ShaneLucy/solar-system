<script lang="ts">
	import {
		additionalLoadingStatus,
		loadingMessage,
		loadingPercent,
		loadedObjects,
		objectsToLoad
	} from '../store';
</script>

{#if $additionalLoadingStatus}
	<div>
		<ol>
			{#each $loadedObjects as loadedObject}
				<li>{loadedObject}</li>
			{/each}
		</ol>
		<p>{$loadingMessage} {$loadingPercent}%</p>
		<ol>
			{#each $objectsToLoad as objectToload}
				<li class="to-load">{objectToload}</li>
			{/each}
		</ol>
	</div>
{/if}

<style>
	div {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 700;
		display: flex;
		flex-direction: column;
		width: max-content;
		height: max-content;
		justify-content: center;
		background-color: black;
		color: white;
		padding: 2rem;
	}

	.to-load {
		color: gray;
	}
</style>
