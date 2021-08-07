/// <reference types="svelte" />
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export interface BaseScales {
	name: string;
	distance: number;
	radius: number;
}

export interface ScaledDistance {
	name: string;
	distance: number;
}

export interface ScaledDiameter {
	name: string;
	diameter: number;
}

export interface Planet {
	data: GLTF;
	name: string;
	startX?: number;
	theta?: number;
	dTheta?: number;
	scale?: number;
}

export interface AdditionalObjects {
	name: string;
	distanceFrom: number;
	sizeDiff: number;
}
