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

type Classification = 'Star' | 'Planet' | 'Dwarf Planet' | 'Moon' | 'Satellite';

export enum ClassificationEnum {
  Star = 'Star',
  Planet = 'Planet',
  DwarfPlanet = 'Dwarf Planet',
  Moon = 'Moon',
  Satellite = 'Satellite'
}

export interface CelestialObject {
  name: string;
  childObjects: Array<AdditionalObject> | [];
  distanceFromPrimary: number;
  radius: number;
  classification: Classification;
  theta: number;
  dTheta: number;
}

export type AdditionalObject = Omit<CelestialObject, 'childObjects'>;

export interface PreparedOject {
  data: Object3D;
  theta: number;
  dTheta: number;
  startX: number;
}

export type NavDirection = 'column' | 'row';
