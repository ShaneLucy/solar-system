<script lang="ts">
  import { fly } from 'svelte/transition';
  import { showNavBar } from '../../../store';
  import Nav from '../../Nav.svelte';
</script>

<aside transition:fly={{ x: -200, duration: 1_250 }}>
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
  <Nav
    toggleNavBar={() => showNavBar.set(!$showNavBar)}
    --div-direction={'column'}
    --nav-direction={'column'}
  />
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
