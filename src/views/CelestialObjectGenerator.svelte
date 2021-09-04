<script lang="ts">
	import { onMount } from 'svelte';
	import { loadModel } from '../loaders';
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
		additionalLoadingComplete,
		loadedObjects,
		objectsToLoad,
		showAdditionalLoader,
		errors,
		backgroundTexture
	} from '../store';
	import LoadingScreen from '../components/LoadingScreen.svelte';
	import HeadConfig from '../components/HeadConfig.svelte';
	import { getModelFilePath, calcOrbit } from '../calculations';
	import ResizeCanvas from '../components/ResizeCanvas.svelte';
	import type { AdditionalObject, PreparedOject } from '../types/index';

	import Hud from '../components/hud/Hud.svelte';

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

		scene.background = $backgroundTexture;

		if (additionalObjects !== null) {
			$additionalLoadingComplete = false;
			$showAdditionalLoader = true;
			for (const object of additionalObjects) {
				objectsToLoad.update((val) => [...val, object.name]);
			}

			for (const object of additionalObjects) {
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
					if ($loadedObjects.length === $objectsToLoad.length) {
						$additionalLoadingComplete = true;
						setTimeout(() => {
							$loadedObjects = [];
							$objectsToLoad = [];
						}, 1_500);
					}
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

<Hud />
<main>
	<canvas id="background" bind:this={canvas} />
</main>

<style>
</style>
