import { scaledDistances } from './scaledDistances';
import { setPlanets } from './planetLoader';
import type { Planet } from './global';

const solarSystemObjectPaths = [
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

export const configPlanets = async (): Promise<Array<Planet>> => {
	return await setPlanets(solarSystemObjectPaths);
};

export const setPlanetDistances = async (planets: Array<Planet>): Promise<Array<Planet>> => {
	planets.forEach((planet, index) => {
		scaledDistances.forEach((distance) => {
			if (planet.name === distance.name) {
				planets[index].startX = distance.distance;
				planets[index].data.scene.position.x = distance.distance;
			}
		});
	});
	return planets;
};

export const config = async (): Promise<Array<Planet>> => {
	return await setPlanetDistances(await configPlanets());
};
