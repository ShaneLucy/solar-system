import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { CubeTextureLoader } from 'three';
import { loadingPercent, backgroundTexture } from '../store';
import { backgroundImages } from '../scene-config';

const gltfLoader = new GLTFLoader();
gltfLoader.setPath('assets/models/');

const cubeLoader = new CubeTextureLoader();
cubeLoader.setPath('assets/backgrounds/');

export const loadModel = async (name: string): Promise<GLTF> => {
  const totalPercent = 100;
  const model = await gltfLoader.loadAsync(`${name}.glb`, (xhr) => {
    loadingPercent.set(Math.round((xhr.loaded / xhr.total) * totalPercent));
  });

  return model;
};

/**
 * Generates the background texture
 */
export const setBackgroundTexture = (): void => {
  backgroundTexture.set(cubeLoader.load(backgroundImages));
};
