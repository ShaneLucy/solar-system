import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Planet } from './types/index';
import { errors, loadingPercent, backgroundTexture } from './store';
import { CubeTextureLoader } from 'three';
import { backgroundImages } from './config';

const gltfLoader = new GLTFLoader();
gltfLoader.setPath('assets/models/');

const cubeLoader = new CubeTextureLoader();
cubeLoader.setPath('assets/backgrounds/');

export const loadModel = async (name: string): Promise<GLTF> => {
	try {
		return await gltfLoader.loadAsync(`${name}.glb`, (xhr) => {
			loadingPercent.set(Math.round((xhr.loaded / xhr.total) * 100));
		});
	} catch (error) {
		errors.update((val) => [...val, error]);
	}
};

export const setPlanets = async (celestialObjects: Array<string>): Promise<Array<Planet>> => {
	return await Promise.all(
		celestialObjects.map(async (celestialObject) => {
			return {
				data: await loadModel(celestialObject),
				name: celestialObject
			};
		})
	);
};

/**
 * Generates the background texture
 */
export const setBackgroundTexture = (): void => {
	backgroundTexture.set(cubeLoader.load(backgroundImages));
};
