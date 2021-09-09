import type { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default (
  camera: PerspectiveCamera,
  rendererDomElement: HTMLCanvasElement,
  minSize: number,
  maxSize: number
): OrbitControls => {
  const controls = new OrbitControls(camera, rendererDomElement);
  controls.maxDistance = maxSize;
  controls.minDistance = minSize;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;

  return controls;
};
