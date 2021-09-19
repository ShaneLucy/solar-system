import { Scene } from 'three';
import light from './light';
import { backgroundTexture } from '../store';

export default (): Scene => {
  const scene = new Scene();

  scene.add(light());

  backgroundTexture.subscribe((value) => {
    scene.background = value;
  });

  return scene;
};
