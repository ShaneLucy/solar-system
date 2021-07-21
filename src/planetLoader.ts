import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Planet } from './global';
import { errors } from './store';

const gltfLoader = new GLTFLoader();

const loadModel = async (url: string): Promise<GLTF> => {
	try {
		return await gltfLoader.loadAsync(url);
	} catch (error) {
		errors.update((val) => [...val, error]);
	}
};

const getPlanetName = (path: string): string => {
	return path.split('\\').pop().split('/').pop();
};

export const setPlanets = async (planetPaths: Array<string>): Promise<Array<Planet>> => {
	return await Promise.all(
		planetPaths.map(async (path) => {
			const planetData = await loadModel(path);
			const planetName = getPlanetName(path).split('.').shift();

			return {
				data: planetData,
				name: planetName
			};
		})
	);
};
