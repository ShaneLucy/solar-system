import type { BaseScales, Planet, ScaledDistance, ScaledDiameter } from './global';

const baseAverageScales: Array<BaseScales> = [
	{ name: 'sun', distance: 0, radius: 695_508 },
	{ name: 'mercury', distance: 58_000_000, radius: 2_439 },
	{ name: 'venus', distance: 108_000_000, radius: 6_052 },
	{ name: 'earth', distance: 146_000_000, radius: 6_371 },
	{ name: 'moon', distance: 146_384_000, radius: 1_737 },
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
export const setPlanetDistances = (planets: Array<Planet>): Array<Planet> => {
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
/**
 * 
 // suns scale on graph is 10
// suns diamater is 2 * 695508 === 1391016
// suns scale on graph / suns diameter = 0.000007189
// suns diamater * 0.000007189 === 10
// multiply each planets diamater by the scaling factor 0.000007189
 */
const sizeScalingfactor = (): number => {
	const sunsDiamater = baseAverageScales[0].radius * 2;
	return 10 / sunsDiamater;
};

export const setPlanetScales = (planets: Array<Planet>): Array<Planet> => {
	planets.forEach((planet) => {
		scaledDiameter.forEach((diameter) => {
			if (planet.name === diameter.name) {
				planet.data.scene.scale.x = planet.scale = diameter.diameter * sizeScalingfactor();
				planet.data.scene.scale.y = planet.scale = diameter.diameter * sizeScalingfactor();
				planet.data.scene.scale.z = planet.scale = diameter.diameter * sizeScalingfactor();
			}
		});
	});
	return planets;
};
