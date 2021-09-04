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
  sizeDiffFromPrimary?: number;
  classification: Classification;
  theta?: number;
  dTheta?: number;
}

export type AdditionalObject = Omit<CelestialObject, 'additionalObjects'>;

export interface PreparedOject {
  data: GLTF;
  theta: number;
  dTheta: number;
  distanceFromPrimary: number;
}
