import { setPlanetDistancesNotToScale, setPlanetSizeNotToScale } from './scaling';
import { setPlanets } from './planetLoader';
import type { Planet } from './global';
import { loadingMessage } from './store';

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

/**
 * Sets the starting theta and dTheta values for each planet
 */
const setThetas = (planets: Array<Planet>): Array<Planet> => {
	planets.forEach((planet) => {
		planet.dTheta = (2 * Math.PI) / planet.startX;
		planet.theta = 0;
	});
	return planets;
};

/**
 * Returns the completed planet object
 */
export const config = async (): Promise<Array<Planet>> => {
	const planets = await setPlanets(solarSystemObjectPaths);
	loadingMessage.set('Condensing the solar system');

	const sizedPlanets = setPlanetSizeNotToScale(setPlanetDistancesNotToScale(planets));
	loadingMessage.set('Calculating Orbits');

	return setThetas(sizedPlanets);
};
