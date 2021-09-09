import { PerspectiveCamera } from 'three';

export default (
  fov: number,
  nearPlane: number,
  farPlane: number,
  startZ: number
): PerspectiveCamera => {
  const camera = new PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    nearPlane,
    farPlane
  );

  camera.position.setZ(startZ);

  return camera;
};
