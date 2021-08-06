<script lang="ts">
	import { onMount } from 'svelte';
	import { errors } from '../store';
	import { loadModel } from '../planetLoader';
	import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, TextureLoader } from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { loadingStatus, loadingMessage, loadingPercent } from '../store';
	import LoadingScreen from './LoadingScreen.svelte';
	import HeadConfig from './HeadConfig.svelte';
	import { createStar } from '../calculations';

	export let name: string;
	let canvas;
	const lowerCaseName = name.replace(/^\w/, (c) => c.toLowerCase());

	const scene = new Scene();
	const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10_000);
	const light = new AmbientLight('white');
	const space = new TextureLoader().load('assets/images/milky-way.jpg');

	scene.add(light);
	scene.background = space;
	camera.position.setZ(7_50);
	light.position.set(100, 1_000, 100);

	let numStars = 0;
	while (numStars < 300) {
		scene.add(createStar());
		numStars += 1;
	}

	onMount(async () => {
		loadingStatus.set(true);
		loadingMessage.set(`Generating ${name}`);
		loadingPercent.set(0);

		const renderer = new WebGLRenderer({
			canvas: canvas
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		const planet = await loadModel(`assets/models/${lowerCaseName}.glb`);

		loadingMessage.set('Generating Scene');
		try {
			scene.add(planet.scene);
		} catch (error) {
			errors.update((val) => [...val, error]);
		}

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.autoRotate = true;
		controls.autoRotateSpeed = 0.1;
		controls.maxDistance = 7_500;
		controls.minDistance = 5_00;
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.screenSpacePanning = false;

		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
			controls.update();
		}
		loadingStatus.set(false);
		animate();
	});
</script>

<HeadConfig name={lowerCaseName} />
<LoadingScreen />

<main>
	<canvas id="background" bind:this={canvas} />
</main>
