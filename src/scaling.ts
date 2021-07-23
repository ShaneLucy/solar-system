import type { BaseScales, Planet, ScaledDistance, ScaledDiameter } from './global';

const baseAverageScales: Array<BaseScales> = [
	{ name: 'sun', distance: 0, radius: 695_508 },
	{ name: 'mercury', distance: 58_000_000, radius: 2_439 },
	{ name: 'venus', distance: 108_000_000, radius: 6_052 },
	{ name: 'earth', distance: 146_000_000, radius: 6_371 },
	{ name: 'moon', distance: 152_503_000, radius: 1_737 },
	{ name: 'mars', distance: 230_000_000, radius: 3_389 },
	{ name: 'jupiter', distance: 779_000_000, radius: 69_911 },
	{ name: 'saturn', distance: 1_400_000_000, radius: 58_232 },
	{ name: 'uranus', distance: 2_870_900_000, radius: 25_362 },
	{ name: 'neptune', distance: 4_5000_000_000, radius: 24_622 }
];

/**
 * Scales distances from 1 to 10,000
 */
const scaledDistances: Array<ScaledDistance> = baseAverageScales.map((value) => {
	return {
		name: value.name,
		distance: value.distance / 10_000
	};
});

const scaledDiameter: Array<ScaledDiameter> = baseAverageScales.map((value) => {
	return {
		name: value.name,
		diameter: value.radius * 2
	};
});

/**
 * Sets each planets start position
 */
export const setPlanetDistancesToScale = (planets: Array<Planet>): Array<Planet> => {
	planets.forEach((planet) => {
		scaledDistances.forEach((distance) => {
			if (planet.name === distance.name) {
				planet.startX = distance.distance;
				planet.data.scene.position.x = distance.distance;
			}
		});
	});
	return planets;
};

export const setPlanetDistancesNotToScale = (planets: Array<Planet>): Array<Planet> => {
	let distanceBetweenPlanets = 2_000;
	planets.forEach((planet, index) => {
		distanceBetweenPlanets += index * 200;
		planet.startX = distanceBetweenPlanets * index;
		planet.data.scene.position.x = distanceBetweenPlanets * index;
	});
	return planets;
};

/*
 * suns scale on graph is 10
 * suns diamater is 2 * 695508 === 1391016
 * suns scale on graph / suns diameter = 0.000007189
 * suns diamater * 0.000007189 === 10
 * multiply each planets diamater by the scaling factor 0.000007189
 */
const sizeScalingfactor = (): number => {
	const sunsDiamater = baseAverageScales[0].radius * 2;
	return 10 / sunsDiamater;
};

export const setPlanetSizeToScale = (planets: Array<Planet>): Array<Planet> => {
	const scalingFactor = sizeScalingfactor();
	planets.forEach((planet) => {
		scaledDiameter.forEach((diameter) => {
			if (planet.name === diameter.name) {
				planet.data.scene.scale.x = diameter.diameter * scalingFactor;
				planet.data.scene.scale.y = diameter.diameter * scalingFactor;
				planet.data.scene.scale.z = diameter.diameter * scalingFactor;
			}
		});
	});
	return planets;
};

export const setPlanetSizeNotToScale = (planets: Array<Planet>): Array<Planet> => {
	planets.forEach((planet) => {
		planet.data.scene.scale.x = 0.75;
		planet.data.scene.scale.y = 0.75;
		planet.data.scene.scale.z = 0.75;
	});
	planets[0].data.scene.scale.x = 1.5;
	planets[0].data.scene.scale.y = 1.5;
	planets[0].data.scene.scale.z = 1.5;
	return planets;
};
