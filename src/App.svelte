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
		AxesHelper
	} from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { onMount } from 'svelte';

	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	let canvas;

	const solarSystemObjectPaths: string[] = [
		'assets/models/sun.glb',
		'assets/models/mercury.glb',
		'assets/models/venus.glb',
		'assets/models/earth.glb',
		'assets/models/moon.glb',
		'assets/models/mars.glb',
		'assets/models/jupiter.glb',
		'assets/models/saturn.glb',
		'assets/models/uranus.glb',
		'assets/models/neptune.glb'
	];

	const scene = new Scene();
	const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100000);
	const light = new AmbientLight('white');
	const grid = new GridHelper(100000, 100, 'white', 'white');
	const axes = new AxesHelper(30000);

	// const clock = new Clock(true);
	const space = new TextureLoader().load('assets/images/milky-way.jpg');
	scene.add(light);
	// scene.add(grid);
	scene.add(axes);

	scene.background = space;
	camera.position.setZ(3000);

	const gltfLoader = new GLTFLoader();

	const loadModel = async (url) => {
		return await gltfLoader.loadAsync(url);
	};

	const setPlanets = async () => {
		return await Promise.all(
			solarSystemObjectPaths.map(async (path) => {
				const i = await loadModel(path);
				return i;
			})
		);
	};

	light.position.set(100, 1000, 100);

	const geometry = new RingGeometry(3000, 2000, 3000);
	const material = new MeshBasicMaterial({ color: 0xffff00 });
	const mesh = new Mesh(geometry, material);
	// scene.add(mesh);
	// mesh.position.setX(3000);
	// mesh.rotateX(20);
	// mesh.rotateZ(0);
	// mesh.rotateY(0);
	onMount(async () => {
		const [
			sun,
			mercury
			// venus,
			// earth,
			// moon,
			// mars,
			// jupiter,
			// saturn,
			// uranus,
			// neptune
		] = await setPlanets();

		const renderer = new WebGLRenderer({
			canvas: canvas
		});

		mercury.scene.position.x = 3000;
		sun.scene.scale.x = 1;
		sun.scene.scale.y = 1;
		sun.scene.scale.z = 1;

		scene.add(sun.scene);
		scene.add(mercury.scene);

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		new OrbitControls(camera, renderer.domElement);
		const dTheta = (2 * Math.PI) / 1000;
		let theta = 0;
		function animate() {
			requestAnimationFrame(animate);
			sun.scene.rotation.y += 0.0005;
			mercury.scene.rotation.y += 0.009;

			[mercury.scene.position.x, mercury.scene.position.z, theta] = calcOrbit(3000, theta, dTheta);
			renderer.render(scene, camera);
		}
		animate();
	});

	const calcOrbit = (startX, theta, dTheta) => {
		theta += dTheta;

		const x = startX * Math.cos(theta);
		const z = startX * Math.sin(theta);
		return [x, z, theta];
	};

	function drawOrbitLine() {
		let segmentCount = 32,
			radius = 100;
	}

	/**
	 * Planet Rotations
	 *     Mercury – 58.6 days – 87.97 days – 10.83 km/h (6.73 mph) – 47.36 km/s (29.43 mi/s)
    Venus – 243 days – 224.7 days – 6.52 km/h (4.5 mph) – 35.02 km/s (21.76 mi/s)
    Earth – 1 day – 365.26 days – 1,674 km/h (1,040 mph) – 29.78 km/s (18.5 mi/s)
    Mars – 1.03 days – 1.88 years – 866 km/h (538.1 mph) – 24 km/s (14.91 mi/s)
    Jupiter – 0.41 days – 11.86 years – 45,583 km/h (28,324 mph) – 13.07 km/s (8.51 mi/s)
    Saturn – 0.45 days – 29.46 years – 36,840 km/h (22,891.3 mph) – 9.68 km/s (6 mi/s)
    Uranus – 0.72 days – 84.01 years – 14,794 km/h (9,193 mph) – 6.8 km/s (4.225 mi/s)
    Neptune – 0.67 days – 164.79 years – 9,719 km/h (6,039 mph) – 5.43 km/s (3.374 mi/s)
    Pluto (dwarf planet) – 6.39 days – 248.59 years – 123.21 km/h (76.56 mph) – 4.743 km/s (2.947 mi/s)
	*/
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
