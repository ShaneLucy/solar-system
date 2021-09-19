import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { CubeTextureLoader, sRGBEncoding } from 'three';
import { loadingPercent, backgroundTexture } from '../store';
import { backgroundImages } from '../scene-config';

const gltfLoader = new GLTFLoader();
gltfLoader.setPath('assets/models/');

const cubeLoader = new CubeTextureLoader();
cubeLoader.setPath('assets/backgrounds/');

const totalPercent = 100;

export const loadModel = async (name: string): Promise<GLTF> => {
  const model = await gltfLoader.loadAsync(`${name}.glb`, (xhr) => {
    loadingPercent.set(Math.round((xhr.loaded / xhr.total) * totalPercent));
  });

  return model;
};

/**
 * Generates the background texture and saves it in a store
 */
export const setBackgroundTexture = (): void => {
  const texture = cubeLoader.load(backgroundImages);
  texture.encoding = sRGBEncoding;
  backgroundTexture.set(texture);
};
