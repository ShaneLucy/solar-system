<script lang="ts">
	import { onMount } from 'svelte';
	import { errors } from '../store';
	import { loadModel } from '../planetLoader';
	import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight } from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { loadingStatus, loadingMessage, loadingPercent } from '../store';
	import LoadingScreen from './LoadingScreen.svelte';
	import HeadConfig from './HeadConfig.svelte';
	import { createStar, getModelFilePath } from '../calculations';
	import ResizeCanvas from './ResizeCanvas.svelte';
	import type { AdditionalObjects } from '../global';

	export let name: string;
	export let additionalObjects: Array<AdditionalObjects> | null;
	let canvas;

	const scene = new Scene();
	const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 50_000);
	const light = new AmbientLight('white');

	scene.add(light);
	camera.position.setZ(7_50);
	light.position.set(100, 1_000, 100);

	let numStars = 0;
	while (numStars < 2_000) {
		scene.add(createStar());
		numStars += 1;
	}
	let renderer;

	onMount(async () => {
		loadingStatus.set(true);
		loadingMessage.set(`Generating ${name}`);
		loadingPercent.set(0);

		renderer = new WebGLRenderer({
			canvas: canvas
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		const planet = await loadModel(getModelFilePath(name));
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

		try {
			additionalObjects.forEach(async (object) => {
				const model = await loadModel(getModelFilePath(object.name));
				model.scene.scale.x = 1 / object.sizeDiff;
				model.scene.scale.y = 1 / object.sizeDiff;
				model.scene.scale.z = 1 / object.sizeDiff;
				model.scene.position.x = object.distanceFrom;
				scene.add(model.scene);
			});
		} catch (error) {
			errors.update((val) => [...val, error]);
		}
	});
</script>

<ResizeCanvas {camera} {renderer} />
<HeadConfig {name} />
<LoadingScreen />

<main>
	<canvas id="background" bind:this={canvas} />
</main>
