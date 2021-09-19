import { Mesh, MeshBasicMaterial, TorusGeometry } from 'three';

export default (startX: number): Mesh<TorusGeometry> => {
  const geometry = new TorusGeometry(startX, 3, 500, 500, 50);
  const material = new MeshBasicMaterial();
  const torusMesh = new Mesh(geometry, material);
  torusMesh.rotateX(1.57);
  return torusMesh;
};
