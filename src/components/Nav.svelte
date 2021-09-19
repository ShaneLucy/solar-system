<script lang="ts">
  import { Link } from 'svelte-routing';
  import { completedCelestialObjects } from '../scene-config';

  export let toggleNavBar: () => void;

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

<nav>
  <Link on:click={toggleNavBar} to="/">
    <span class:active={window.location.pathname === '/'}>
      Solar System</span
    ></Link
  >

  {#each classifications as classification}
    <div>
      <h4>{classification}</h4>

      {#each completedCelestialObjects as object}
        {#if classification === object.classification}
          <Link on:click={toggleNavBar} to={`/${object.name}`}>
            <span
              class:active={window.location.pathname.slice(1) === object.name}
            >
              {object.name}
            </span>
          </Link>
        {/if}
        {#if object.childObjects.length > 0}
          {#each object.childObjects as additionalObject}
            {#if classification === additionalObject.classification}
              <Link on:click={toggleNavBar} to={`/${additionalObject.name}`}>
                <span
                  class:active={window.location.pathname.slice(1) ===
                    additionalObject.name}
                >
                  {additionalObject.name}
                </span>
              </Link>
            {/if}
          {/each}
        {/if}
      {/each}
    </div>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    flex-direction: var(--nav-direction);
    align-items: baseline;
    padding: 1.25rem 2rem;
    justify-content: space-evenly;
  }

  div {
    display: flex;
    flex-direction: var(--div-direction);
  }

  .active {
    color: var(--activeLink);
  }
</style>
