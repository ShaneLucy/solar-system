<script lang="ts">
	import {
		Scene,
		PerspectiveCamera,
		TextureLoader,
		WebGLRenderer,
		AmbientLight,
		// Clock,
		RingGeometry,
		MeshBasicMaterial,
		GridHelper,
		Mesh,
		AxesHelper,
		SphereGeometry,
		MeshStandardMaterial,
		MathUtils
	} from 'three';
	import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { onMount } from 'svelte';
	import { calcOrbit } from './calculations';
	import { config } from './config';
	import { errors, loadingMessage } from './store';
	import { get } from 'svelte/store';
	import {
		setPlanetSizeToScale,
		setPlanetDistancesToScale,
		setPlanetDistancesNotToScale,
		setPlanetSizeNotToScale
	} from './scaling';

	let canvas;

	const scene = new Scene();
	const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 4_500_000);
	const light = new AmbientLight('white');
	const grid = new GridHelper(100000, 100, 'white', 'white');
	const axes = new AxesHelper(30000);

	// const clock = new Clock(true);
	// const space = new TextureLoader().load('assets/images/milky-way.jpg');
	scene.add(light);
	// scene.add(grid);
	scene.add(axes);

	camera.position.setZ(4_000);

	light.position.set(100, 1000, 100);

	const geometry = new RingGeometry(3000, 2000, 3000);
	const material = new MeshBasicMaterial({ color: 0xffff00 });
	const mesh = new Mesh(geometry, material);
	// scene.add(mesh);
	// mesh.position.setX(3000);
	// mesh.rotateX(20);
	// mesh.rotateZ(0);
	// mesh.rotateY(0);
	let planets;
	onMount(async () => {
		const renderer = new WebGLRenderer({
			canvas: canvas
		});

		planets = await config();

		planets.forEach((planet) => {
			try {
				scene.add(planet.data.scene);
			} catch (error) {
				errors.update((val) => [...val, error]);
			}
		});

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, 5, 0);
		controls.update();

		function animate() {
			requestAnimationFrame(animate);
			planets.forEach((planet) => {
				if (planet.name !== 'sun') {
					calcOrbit(planet);
				}
			});

			renderer.render(scene, camera);
		}
		animate();
		console.log(get(errors));
	});

	let scaledSolarSystem = false;
	async function changeScale() {
		scaledSolarSystem = !scaledSolarSystem;
		scaledSolarSystem
			? setPlanetSizeToScale(setPlanetDistancesToScale(await planets))
			: setPlanetSizeNotToScale(setPlanetDistancesNotToScale(await planets));
	}
</script>

<div class="loading-screen">
	<p>{$loadingMessage}</p>
</div>

<main>
	<button on:click={changeScale}>Change Scale</button>
	<canvas id="background" bind:this={canvas} />
</main>

<style>
	:global(body) {
		padding: 0;
	}

	button {
		position: absolute;
		display: block;
		z-index: 99;
		left: 0;
		top: 0;
		background-color: violet;
	}

	canvas {
		top: 0;
		left: 0;
		position: fixed;
	}

	.loading-screen {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		background-color: black;
		color: white;
	}
</style>
