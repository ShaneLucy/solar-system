<script lang="ts">
  import { onMount } from 'svelte';

  import { Object3D, WebGLRenderer } from 'three';

  import LoadingScreen from '../components/LoadingScreen.svelte';
  import HeadConfig from '../components/HeadConfig.svelte';
  import Hud from '../components/hud/Hud.svelte';

  import {
    calcOrbit,
    getMaxSize,
    getMinSize,
    configureChildObjects,
    loadModel,
    scalingFactor
  } from '../helpers';

  import {
    configCamera,
    configRenderer,
    configScene,
    configControls
  } from '../scene-config/index';

  import {
    loadingStatus,
    loadingMessage,
    loadingPercent,
    errors
  } from '../store';

  import type {
    AdditionalObject,
    CelestialObject,
    PreparedOject
  } from '../types/index';

  export let name: string;
  export let isSolarSystem: boolean;
  export let radius: number;
  export let additionalObjects:
    | Array<AdditionalObject>
    | Array<CelestialObject>
    | [];
  export let classification: string;

  let canvas: HTMLCanvasElement;
  let renderer: WebGLRenderer;

  const sceneMaxSize = getMaxSize(name, isSolarSystem);
  const sceneMinSize = getMinSize(name);

  const camera = configCamera(100, 1, 2_000_000, 120);
  const scene = configScene();

  console.log(classification);

  let preparedObjects: Array<PreparedOject> = [];

  onMount(async () => {
    loadingStatus.set(true);
    const initialLoadingMessage = isSolarSystem
      ? `Generateing Solar System`
      : `Generating ${name}`;
    loadingMessage.set(initialLoadingMessage);
    loadingPercent.set(0);

    renderer = configRenderer(canvas);

    const planet = await loadModel(name);
    const object3d = new Object3D();
    loadingMessage.set('Generating Scene');

    try {
      object3d.add(planet.scene);
    } catch (error) {
      errors.update((val) => [...val, error]);
    }

    object3d.scale.set(
      ...scalingFactor(object3d, radius, planet.scene.scale.x)
    );

    scene.add(object3d);

    const controls = configControls(
      camera,
      renderer.domElement,
      sceneMinSize,
      sceneMaxSize
    );

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
      if (preparedObjects.length > 0) {
        preparedObjects.forEach((value) => {
          [
            value.data.position.x,
            value.data.position.z,
            value.theta
          ] = calcOrbit(value.startX, value.theta, value.dTheta);
        });
      }
    }

    loadingStatus.set(false);
    animate();

    if (additionalObjects !== null) {
      preparedObjects = await configureChildObjects(additionalObjects);

      preparedObjects.forEach((childObject) => {
        scene.add(childObject.data);
      });
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
</script>

{#if isSolarSystem}
  <HeadConfig name={'solar-system'} />
{:else}
  <HeadConfig {name} />
{/if}

<LoadingScreen />

<Hud />
<main>
  <canvas id="background" bind:this={canvas} />
</main>

<style>
</style>
