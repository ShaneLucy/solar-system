<script lang="ts">
  import {
    additionalLoadingComplete,
    objectsToLoad,
    showAdditionalLoader,
    showNavBar
  } from '../../store';

  import { fade } from 'svelte/transition';
  import AdditionalLoadingScreen from './components/AdditionalLoadingScreen.svelte';
  import Nav from './components/Nav.svelte';
</script>

{#if !$showNavBar}
  <svg
    class="left-menu-icon"
    fill="none"
    stroke="currentColor"
    on:click={() => showNavBar.set(!$showNavBar)}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ><path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h7"
    /></svg
  >
{:else}
  <Nav />
{/if}

{#if !$additionalLoadingComplete}
  {#if !$showAdditionalLoader}
    <svg
      class="right-menu-icon"
      fill="none"
      transition:fade
      stroke="currentColor"
      on:click={() => showAdditionalLoader.set(!$showAdditionalLoader)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16m-7 6h7"
      /></svg
    >
  {:else}
    <AdditionalLoadingScreen />
  {/if}
{/if}

{#if $additionalLoadingComplete && !$showAdditionalLoader && $objectsToLoad.length > 0}
  <p transition:fade>Scene Fully Generated!</p>
{/if}

<style>
  svg {
    color: white;
    z-index: 500;
    position: absolute;
  }

  .right-menu-icon {
    padding-right: 0.45rem;
    right: 0;
  }

  .left-menu-icon {
    padding-left: 0.45rem;
    left: 0;
  }

  p {
    padding-top: 0.45rem;
    padding-right: 0.45rem;
    position: absolute;
    right: 0;
    color: white;
    z-index: 500;
    font-size: 1.25rem;
  }
</style>
