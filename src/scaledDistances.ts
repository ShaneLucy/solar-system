import type { Distances } from './global';

const baseAverageDistances: Array<Distances> = [
	{ name: 'sun', distance: 0 },
	{ name: 'mercury', distance: 58_000_000 },
	{ name: 'venus', distance: 108_000_000 },
	{ name: 'earth', distance: 146_000_000 },
	{ name: 'moon', distance: 146_384_000 },
	{ name: 'mars', distance: 230_000_000 },
	{ name: 'jupiter', distance: 779_000_000 },
	{ name: 'saturn', distance: 1_400_000_000 },
	{ name: 'uranus', distance: 2_870_900_000 },
	{ name: 'neptune', distance: 4_5000_000_000 }
];

export const scaledDistances: Array<Distances> = baseAverageDistances.map((value) => {
	return {
		name: value.name,
		distance: value.distance / 10_000
	};
});
