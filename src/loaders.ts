import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Planet } from './types/index';
import { errors, loadingPercent, backgroundTexture } from './store';
import { CubeTextureLoader } from 'three';
import { backgroundImagePaths } from './config';

const gltfLoader = new GLTFLoader();
const cubeLoader = new CubeTextureLoader();

export const loadModel = async (url: string): Promise<GLTF> => {
	try {
		return await gltfLoader.loadAsync(url, (xhr) => {
			loadingPercent.set(Math.round((xhr.loaded / xhr.total) * 100));
		});
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

/**
 * Generates the background texture
 */
export const setBackgroundTexture = (): void => {
	backgroundTexture.set(cubeLoader.load(backgroundImagePaths));
};
