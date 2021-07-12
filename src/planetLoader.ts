import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const gltfLoader = new GLTFLoader();

const loadModel = async (url: string): Promise<GLTF> => {
	return await gltfLoader.loadAsync(url);
};

const getPlanetName = (path: string): string => {
	return path.split('\\').pop().split('/').pop();
};

// interface p {
// 	[key: string]: {
// 		data: Promise<GLTF>;
// 	};
// }

export const setPlanets = async (planetPaths: string[]): any => {
	return await Promise.all(
		planetPaths.map(async (path) => {
			const planetData = await loadModel(path);
			const planetName = getPlanetName(path).split('.').shift();

			return {
				[`${planetName}`]: {
					data: planetData
				}
			};
		})
	);
};
