import { AmbientLight } from 'three';

export default (): AmbientLight => {
  const light = new AmbientLight();

  return light;
};
