/**
 * Let's begin by testing out a 10 thousand to 1 scale
 */
const baseDistances = [58_000_000, 108_208_000];

export const scaledDistances = baseDistances.map((distance) => {
	return distance / 10_000;
});
