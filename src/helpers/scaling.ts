import type { Object3D } from 'three';
import { Box3 } from 'three';

export default (
  object: Object3D,
  actualRadius: number,
  initialScale: number
): [number, number, number] => {
  const boundingBox = new Box3().setFromObject(object);

  const inWorldRadius = boundingBox.max.x;
  const divider = inWorldRadius / actualRadius;
  const scalingFactor = initialScale / divider;

  return [scalingFactor, scalingFactor, scalingFactor];
};
