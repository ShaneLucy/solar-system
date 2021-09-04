<script lang="ts">
  export let camera;
  export let renderer;

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
</script>

<svelte:window on:resize={() => handleResize()} />
