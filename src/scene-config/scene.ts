import { Scene } from 'three';
import light from './light';
import { backgroundTexture } from '../store';

const configureScene = (): Scene => {
  const scene = new Scene();

  scene.add(light());

  backgroundTexture.subscribe((value) => {
    scene.background = value;
  });

  return scene;
};

export default configureScene();
