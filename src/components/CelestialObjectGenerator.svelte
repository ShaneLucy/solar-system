<script lang="ts">
	import { onMount } from 'svelte';
	import { errors } from '../store';
	import { loadModel } from '../planetLoader';
	import {
		Scene,
		PerspectiveCamera,
		WebGLRenderer,
		AmbientLight,
		sRGBEncoding,
		Object3D,
		Box3
	} from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { loadingStatus, loadingMessage, loadingPercent } from '../store';
	import LoadingScreen from './LoadingScreen.svelte';
	import HeadConfig from './HeadConfig.svelte';
	import { createStar, getModelFilePath, calcOrbit } from '../calculations';
	import ResizeCanvas from './ResizeCanvas.svelte';
	import type { AdditionalObject, Planet } from '../global';

	export let name: string;
	export let additionalObjects: Array<AdditionalObject> | null;
	export let classification: string;
	let canvas;

	const scene = new Scene();
	const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 2_000_000);
	const light = new AmbientLight('white');

	scene.add(light);
	camera.position.setZ(7_50);
	light.position.set(100, 1_000, 100);

	let numStars = 0;
	while (numStars < 2_000) {
		const star = createStar(2_000_000, 400_000);
		if (star) {
			scene.add(star);
			numStars += 1;
		}
	}
	let renderer;

	onMount(async () => {
		loadingStatus.set(true);
		loadingMessage.set(`Generating ${name}`);
		loadingPercent.set(0);

		renderer = new WebGLRenderer({
			canvas: canvas
		});
		renderer.outputEncoding = sRGBEncoding;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		const planet = await loadModel(getModelFilePath(name));

		loadingMessage.set('Generating Scene');
		const object3d = new Object3D();
		try {
			object3d.add(planet.scene);
			scene.add(object3d);
		} catch (error) {
			errors.update((val) => [...val, error]);
		}

		const boundingBox = new Box3().setFromObject(object3d);

		const boundingSize = boundingBox.getSize(boundingBox.max);
		const diameter = boundingSize.x / 2;
		const controls = new OrbitControls(camera, renderer.domElement);

		controls.maxDistance = 50_000;
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

		additionalObjects.forEach(async (object) => {
			try {
				const model = await loadModel(getModelFilePath(object.name));
				model.scene.scale.x = 1 / object.sizeDiffFromPrimary;
				model.scene.scale.y = 1 / object.sizeDiffFromPrimary;
				model.scene.scale.z = 1 / object.sizeDiffFromPrimary;
				model.scene.position.x = diameter + object.distanceFromPrimary;

				const object3d = new Object3D();
				object3d.add(model.scene);
				scene.add(object3d);
			} catch (error) {
				errors.update((val) => [...val, error]);
			}
		});
	});
</script>

<ResizeCanvas {camera} {renderer} />
<HeadConfig {name} />
<LoadingScreen />

<main>
	<canvas id="background" bind:this={canvas} />
</main>
