<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import CelestialObjectGenerator from './views/CelestialObjectGenerator.svelte';
  import E404 from './components/E404.svelte';
  import { completedCelestialObjects } from './scene-config';
  import { setBackgroundTexture } from './helpers';
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
    <CelestialObjectGenerator
      name={completedCelestialObjects[0].name}
      isSolarSystem={true}
      radius={completedCelestialObjects[0].radius}
      childObjects={completedCelestialObjects}
      classification={completedCelestialObjects[0].classification}
    />
  </Route>
  {#each completedCelestialObjects as object}
    <Route path={`/${object.name}`}>
      <CelestialObjectGenerator
        name={object.name}
        isSolarSystem={false}
        radius={object.radius}
        childObjects={object.childObjects}
        classification={object.classification}
      />
    </Route>
    {#if object.childObjects.length > 0}
      {#each object.childObjects as additionalObject}
        <Route path={`/${additionalObject.name}`}>
          <CelestialObjectGenerator
            name={additionalObject.name}
            isSolarSystem={false}
            radius={additionalObject.radius}
            childObjects={[]}
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
