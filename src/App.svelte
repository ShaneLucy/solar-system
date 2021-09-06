<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import CelestialObjectGenerator from './views/CelestialObjectGenerator.svelte';
  import E404 from './components/E404.svelte';
  import SolarSystem from './views/SolarSystem.svelte';
  import { completedCelestialObjects } from './config';
  import { setBackgroundTexture } from './loaders';
  import { onMount } from 'svelte';

  export let url = '';

  onMount(() => {
    setBackgroundTexture();
  });
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
  {#each completedCelestialObjects as object}
    <Route path={`/${object.name}`}>
      <CelestialObjectGenerator
        name={object.name}
        radius={object.radius}
        additionalObjects={object.additionalObjects}
        classification={object.classification}
      />
    </Route>
    {#if object.additionalObjects !== null}
      {#each object.additionalObjects as additionalObject}
        <Route path={`/${additionalObject.name}`}>
          <CelestialObjectGenerator
            name={additionalObject.name}
            radius={additionalObject.radius}
            additionalObjects={null}
            classification={additionalObject.classification}
          />
        </Route>
      {/each}
    {/if}
  {/each}
  <Route path="*">
    <E404 />
  </Route>
</Router>
