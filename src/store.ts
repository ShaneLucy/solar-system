import { writable } from 'svelte/store';

export const errors = writable([]);

export const loadingPercent = writable(0);
export const loadingStatus = writable(true);
export const loadingMessage = writable('Downloading Textures');

export const additionalLoadingStatus = writable(false);
export const loadedObjects = writable([]);
export const objectsToLoad = writable([]);
