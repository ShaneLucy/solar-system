import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default (camera, rendererDomElement): OrbitControls => {
  const controls = new OrbitControls(camera, rendererDomElement);
  controls.maxDistance = 50_000;
  // controls.minDistance = 5_00;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;

  return controls;
};
