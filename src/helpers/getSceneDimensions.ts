import type { AdditionalObject, CelestialObject } from '../types';
import { completedCelestialObjects } from '../scene-config';

const filterObjectsByname = (name: string) => {
  let isAdditional: AdditionalObject | undefined;
  const isCelestial = completedCelestialObjects.find((object) => {
    if (isAdditional === undefined) {
      isAdditional = object?.additionalObjects.find(
        (element) => element.name === name
      );
    }

    return object.name === name ? name : false;
  });

  let result: AdditionalObject | CelestialObject = {
    name: '',
    distanceFromPrimary: 0,
    radius: 0,
    classification: 'Star',
    theta: 0,
    dTheta: 0
  };

  if (isCelestial === undefined && isAdditional !== undefined) {
    result = isAdditional;
  }

  if (isAdditional === undefined && isCelestial !== undefined) {
    result = isCelestial;
  }

  return result;
};

export const getMaxSize = (name: string, isSolarSystem: boolean) => {
  const totalBuffer = 1.3;

  const singleObjectBuffer = 3;

  const filteredObjects = filterObjectsByname(name);

  let maxDistance = 0;
  if (
    'additionalObjects' in filteredObjects &&
    filteredObjects.additionalObjects.length > 0
  ) {
    const distances = filteredObjects.additionalObjects.map(
      (value) => value.distanceFromPrimary
    );
    maxDistance = Math.max.apply(null, distances);
  } else {
    maxDistance = filteredObjects.radius * singleObjectBuffer;
  }

  if (isSolarSystem) {
    const lastIndex = completedCelestialObjects.length - 1;
    maxDistance = completedCelestialObjects[lastIndex].distanceFromPrimary;
  }

  const sceneSize = maxDistance * totalBuffer;

  return sceneSize;
};

export const getMinSize = (name: string): number => {
  const buffer = 1.25;
  const filteredObjects = filterObjectsByname(name);
  const minSize = filteredObjects.radius * buffer;

  return minSize;
};
