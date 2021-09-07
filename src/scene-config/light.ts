import { AmbientLight } from 'three';

export default (x: number, y: number, z: number): AmbientLight => {
  const light = new AmbientLight();
  light.position.set(x, y, z);

  return light;
};
