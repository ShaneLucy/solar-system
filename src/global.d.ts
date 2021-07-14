/// <reference types="svelte" />

export interface Distances {
	name: string;
	distance: number;
}

export interface Planet {
	data: GLTF;
	name: string;
	startX?: number;
}
