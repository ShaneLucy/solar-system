<script lang="ts">
  import { loadingStatus, loadingMessage, loadingPercent } from '../store';
  import { fade } from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';
</script>

{#if $loadingStatus}
  <div transition:fade={{ duration: 1_250, easing: sineInOut }}>
    <label for="progress">{$loadingMessage} {$loadingPercent}%</label>
    <progress id="progress" value={$loadingPercent} max="100">{$loadingPercent}</progress>
  </div>
{/if}

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 700;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
  }

  label {
    text-transform: capitalize;
  }

  progress {
    width: 70%;
    height: 2rem;
  }

  @media screen and (min-width: 600px) {
    progress {
      width: 33%;
      height: 2.5rem;
    }
  }
</style>
