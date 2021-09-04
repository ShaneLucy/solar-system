<script lang="ts">
	import { onMount } from 'svelte';
	import { errors } from '../store';
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
	import { loadingStatus, loadingMessage, loadingPercent } from '../store';
	import LoadingScreen from '../components/LoadingScreen.svelte';
	import { calcOrbit } from '../calculations';
	import ResizeCanvas from '../components/ResizeCanvas.svelte';
	import type { CelestialObject, PreparedOject } from '../types/index';
	import { completedCelestialObjects } from '../config';

	let canvas;

	const scene = new Scene();
	const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 2_000_000);
	const light = new AmbientLight('white');
	const preparedObjects: Array<PreparedOject> = [];

	scene.add(light);
	camera.position.setZ(7_50);
	light.position.set(100, 1_000, 100);

	// let numStars = 0;
	// while (numStars < 2_000) {
	// 	const star = createStar(2_000_000, 400_000);
	// 	if (star) {
	// 		scene.add(star);
	// 		numStars += 1;
	// 	}
	// }
	let renderer;

	onMount(async () => {
		loadingStatus.set(true);
		loadingMessage.set(`Generating Solar System`);
		loadingPercent.set(0);

		renderer = new WebGLRenderer({
			canvas: canvas
		});
		renderer.outputEncoding = sRGBEncoding;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		const sun = await loadModel(completedCelestialObjects[0].name);
		// const planet = await loadModel(getModelFilePath(name));
		const preparedObjects = [];

		// celestialObjects.forEach(async (value) => {
		// 	if (value.additionalObjects !== null) {
		// 		value.additionalObjects.forEach(async (val) => {
		// 			planet = await loadModel(getModelFilePath(val.name));
		// 			objects.push(planet);
		// 		});
		// 	}
		// 	planet = await loadModel(getModelFilePath(value.name));
		// 	objects.push(planet);
		// });

		// loadingMessage.set('Generating Scene');
		const object3d = new Object3D();
		try {
			object3d.add(sun.scene);
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
			// if (preparedObjects.length > 0) {
			// 	preparedObjects.forEach((value) => {
			// 		calcOrbit(value);
			// 	});
			// }
		}

		loadingStatus.set(false);
		animate();

		completedCelestialObjects.forEach(async (object, index) => {
			if (index > 0) {
				try {
					const model = {
						data: await loadModel(object.name)
						// theta: object.theta,
						// dTheta: object.dTheta,
						// distanceFromPrimary: object.distanceFromPrimary
					};

					model.data.scene.scale.x = 1 / object.sizeDiffFromPrimary;
					model.data.scene.scale.y = 1 / object.sizeDiffFromPrimary;
					model.data.scene.scale.z = 1 / object.sizeDiffFromPrimary;
					model.data.scene.position.x = diameter + object.distanceFromPrimary;

					preparedObjects.push(model);

					scene.add(model.data.scene);
				} catch (error) {
					errors.update((val) => [...val, error]);
				}
				if (object.additionalObjects !== null) {
					object.additionalObjects.forEach(async (addObject) => {
						try {
							const model: PreparedOject = {
								data: await loadModel(addObject.name),
								theta: addObject.theta,
								dTheta: addObject.dTheta,
								distanceFromPrimary: addObject.distanceFromPrimary
							};

							model.data.scene.scale.x = 1 / addObject.sizeDiffFromPrimary;
							model.data.scene.scale.y = 1 / addObject.sizeDiffFromPrimary;
							model.data.scene.scale.z = 1 / addObject.sizeDiffFromPrimary;
							model.data.scene.position.x = diameter + addObject.distanceFromPrimary;

							preparedObjects.push(model);

							scene.add(model.data.scene);
						} catch (error) {
							errors.update((val) => [...val, error]);
						}
					});
				}
			}
		});
		// if (additionalObjects !== null) {
		// 	additionalObjects.forEach(async (object) => {
		// try {
		// 	const model: PreparedOject = {
		// 		data: await loadModel(getModelFilePath(object.name)),
		// 		theta: object.theta,
		// 		dTheta: object.dTheta,
		// 		distanceFromPrimary: object.distanceFromPrimary
		// 	};

		// 	model.data.scene.scale.x = 1 / object.sizeDiffFromPrimary;
		// 	model.data.scene.scale.y = 1 / object.sizeDiffFromPrimary;
		// 	model.data.scene.scale.z = 1 / object.sizeDiffFromPrimary;
		// 	model.data.scene.position.x = diameter + object.distanceFromPrimary;

		// 	preparedObjects.push(model);

		// 	scene.add(model.data.scene);
		// } catch (error) {
		// 	errors.update((val) => [...val, error]);
		// }
		// 	});
		// }
	});
</script>

<ResizeCanvas {camera} {renderer} />
<LoadingScreen />

<main>
	<canvas id="background" bind:this={canvas} />
</main>
