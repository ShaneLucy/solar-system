import { writable } from 'svelte/store';
import type { CubeTexture } from 'three';

// TODO type errors object
export const errors = writable<Array<any>>([]);

export const loadingPercent = writable<number>(0);
export const loadingStatus = writable<boolean>(true);
export const loadingMessage = writable<string>('Downloading Textures');

export const additionalLoadingComplete = writable<boolean>(true);
export const loadedObjects = writable<Array<string>>([]);
export const objectsToLoad = writable<Array<string>>([]);

export const showAdditionalLoader = writable<boolean>(false);

export const backgroundTexture = writable<CubeTexture>();

export const showNavBar = writable<boolean>(false);
