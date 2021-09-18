<script lang="ts">
  import { Link } from 'svelte-routing';
  import { fly } from 'svelte/transition';
  import { completedCelestialObjects } from '../../../scene-config';
  import { showNavBar } from '../../../store';

  const classifications: Array<string> = [];

  completedCelestialObjects.forEach((object) => {
    if (!classifications.includes(object.classification)) {
      classifications.push(object.classification);
    }

    if (object.childObjects.length > 0) {
      object.childObjects.forEach((childObject) => {
        if (!classifications.includes(childObject.classification)) {
          classifications.push(childObject.classification);
        }
      });
    }
  });
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
  <nav>
    <Link on:click={() => showNavBar.set(!$showNavBar)} to="/"
      >Solar System</Link
    >
    {#each classifications as classification}
      <h4>{classification}</h4>

      {#each completedCelestialObjects as object}
        {#if classification === object.classification}
          <Link
            on:click={() => showNavBar.set(!$showNavBar)}
            to={`/${object.name}`}
          >
            {object.name}
          </Link>
        {/if}
        {#if object.childObjects.length > 0}
          {#each object.childObjects as additionalObject}
            {#if classification === additionalObject.classification}
              <Link
                on:click={() => showNavBar.set(!$showNavBar)}
                to={`/${additionalObject.name}`}
              >
                {additionalObject.name}
              </Link>
            {/if}
          {/each}
        {/if}
      {/each}
    {/each}
  </nav>
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

  nav {
    display: flex;
    flex-direction: column;
    padding: 1.25rem 2rem;
  }
</style>
