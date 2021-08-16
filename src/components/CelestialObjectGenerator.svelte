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
	import {
		loadingStatus,
		loadingMessage,
		loadingPercent,
		additionalLoadingStatus,
		loadedObjects,
		objectsToLoad
	} from '../store';
	import LoadingScreen from './LoadingScreen.svelte';
	import AdditionalLoadingScreen from './AdditionalLoadingScreen.svelte';
	import HeadConfig from './HeadConfig.svelte';
	import { createStar, getModelFilePath, calcOrbit } from '../calculations';
	import ResizeCanvas from './ResizeCanvas.svelte';
	import type { AdditionalObject, PreparedOject } from '../types/index';

	export let name: string;
	export let additionalObjects: Array<AdditionalObject> | null;
	export let classification: string;
	let canvas;

	const scene = new Scene();
	const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 2_000_000);
	const light = new AmbientLight('white');
	const preparedObjects: Array<PreparedOject> = [];

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
		const object3d = new Object3D();

		loadingMessage.set('Generating Scene');

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
			if (preparedObjects.length > 0) {
				preparedObjects.forEach((value) => {
					calcOrbit(value);
				});
			}
		}

		loadingStatus.set(false);
		animate();

		if (additionalObjects !== null) {
			$additionalLoadingStatus = true;
			for (const object of additionalObjects) {
				objectsToLoad.update((val) => [...val, object.name]);
			}

			for (const object of additionalObjects) {
				loadingMessage.set(`Generating ${object.name}`);
				try {
					const model: PreparedOject = {
						data: await loadModel(getModelFilePath(object.name)),
						theta: object.theta,
						dTheta: object.dTheta,
						distanceFromPrimary: object.distanceFromPrimary
					};

					model.data.scene.scale.x = 1 / object.sizeDiffFromPrimary;
					model.data.scene.scale.y = 1 / object.sizeDiffFromPrimary;
					model.data.scene.scale.z = 1 / object.sizeDiffFromPrimary;
					model.data.scene.position.x = diameter + object.distanceFromPrimary;

					preparedObjects.push(model);
					scene.add(model.data.scene);

					loadedObjects.update((val) => [...val, object.name]);
					objectsToLoad.update((val) => val.splice(1));
					if ($objectsToLoad.length === 0) $additionalLoadingStatus = false;
				} catch (error) {
					errors.update((val) => [...val, error]);
				}
			}
		}
	});
</script>

<ResizeCanvas {camera} {renderer} />
<HeadConfig {name} />
<LoadingScreen />

<main>
	<AdditionalLoadingScreen />
	<canvas id="background" bind:this={canvas} />
</main>
