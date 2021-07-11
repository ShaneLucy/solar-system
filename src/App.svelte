<script lang="ts">
	import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
	import { onMount } from 'svelte';

	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	let canvas;

	const scene = new Scene();
	const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	onMount(() => {
		const renderer = new WebGLRenderer({
			canvas: canvas
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	});

	camera.position.setZ(30);

	const gltfLoader = new GLTFLoader();
	gltfLoader.load('./public/assets/models/moon.glb', (gltf) => {
		const root = gltf.scene;
		scene.add(root);
	});
</script>

<main>
	<canvas id="background" bind:this={canvas} />
</main>

<style>
	canvas {
		top: 0;
		left: 0;
		position: fixed;
	}
</style>
