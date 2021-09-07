import { PerspectiveCamera } from 'three';

export default (z: number): PerspectiveCamera => {
  const camera = new PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    2_000_000
  );

  camera.position.setZ(z);

  return camera;
};
