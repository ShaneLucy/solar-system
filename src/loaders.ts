import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { CubeTextureLoader } from 'three';
import type { Planet } from './types/index';
import { errors, loadingPercent, backgroundTexture } from './store';
import { backgroundImages } from './config';

const gltfLoader = new GLTFLoader();
gltfLoader.setPath('assets/models/');

const cubeLoader = new CubeTextureLoader();
cubeLoader.setPath('assets/backgrounds/');

export const loadModel = async (name: string): Promise<GLTF> => {
  let model;
  try {
    model = gltfLoader.loadAsync(`${name}.glb`, (xhr) => {
      loadingPercent.set(Math.round((xhr.loaded / xhr.total) * 100));
    });
  } catch (error) {
    errors.update((val) => [...val, error]);
  }
  return model;
};

export const setPlanets = async (
  celestialObjects: Array<string>
): Promise<Array<Planet>> => {
  const setObjects = await Promise.all(
    celestialObjects.map(async (celestialObject) => {
      const object = {
        data: await loadModel(celestialObject),
        name: celestialObject
      };
      return object;
    })
  );
  return setObjects;
};

/**
 * Generates the background texture
 */
export const setBackgroundTexture = (): void => {
  backgroundTexture.set(cubeLoader.load(backgroundImages));
};
