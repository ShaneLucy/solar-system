import type { Object3D } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export interface Planet {
  data: GLTF;
  name: string;
  startX?: number;
  theta?: number;
  dTheta?: number;
  scale?: number;
}

type Classification =
  | 'Star'
  | 'Planet'
  | 'Dwarf Planet'
  | 'Moon'
  | 'Man Made Satelite';

export interface CelestialObject {
  name: string;
  additionalObjects: Array<AdditionalObject> | null;
  distanceFromPrimary?: number;
  radius?: number;
  classification: Classification;
  theta?: number;
  dTheta?: number;
}

export type AdditionalObject = Omit<CelestialObject, 'additionalObjects'>;

export interface PreparedOject {
  data: Object3D;
  theta: number;
  dTheta: number;
  startX: number;
}
