import { writable } from 'svelte/store';

export const errors = writable([]);

export const loadingMessage = writable('Downloading Textures');
