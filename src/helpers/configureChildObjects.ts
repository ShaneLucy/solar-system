import { Object3D } from 'three';

import scalingFactor from './scaling';
import { loadModel } from './loaders';

import {
  objectsToLoad,
  loadedObjects,
  additionalLoadingComplete,
  showAdditionalLoader
} from '../store';

import type {
  AdditionalObject,
  CelestialObject,
  PreparedOject
} from '../types/index';

const showLoader = (): void => {
  additionalLoadingComplete.set(false);
  showAdditionalLoader.set(true);
};

const setObjectsToLoad = (
  childObjects: Array<AdditionalObject> | Array<CelestialObject>
): void => {
  showLoader();
  objectsToLoad.set(
    childObjects.flatMap((childObject) => {
      let completedLoad: Array<string> = [];

      completedLoad = [...completedLoad, childObject.name];

      if ('additionalObjects' in childObject) {
        childObject.additionalObjects.forEach((additionalObject) => {
          completedLoad = [...completedLoad, additionalObject.name];
        });
      }
      return completedLoad;
    })
  );
};

const setLoadedObjects = (name: string): void => {
  loadedObjects.update((val) => [...val, name]);
};

const hideLoader = (): void => {
  const transitionDuation = 1_500;
  additionalLoadingComplete.set(true);

  setTimeout(() => {
    loadedObjects.set([]);
    objectsToLoad.set([]);
  }, transitionDuation);
};

const generatePreparedObject = async (
  object: AdditionalObject | CelestialObject
): Promise<PreparedOject> => {
  const model = await loadModel(object.name);
  const object3d = new Object3D();

  object3d.add(model.scene);
  object3d.scale.set(
    ...scalingFactor(object3d, object.radius, model.scene.scale.x)
  );
  object3d.position.setX(object.distanceFromPrimary);

  const preparedObject: PreparedOject = {
    data: object3d,
    theta: object.theta,
    dTheta: object.dTheta,
    startX: object.distanceFromPrimary
  };

  return preparedObject;
};

export default async (
  childObjects: Array<AdditionalObject> | Array<CelestialObject>
): Promise<Array<PreparedOject>> => {
  setObjectsToLoad(childObjects);

  const preparedObjects: Array<PreparedOject> = await Promise.all(
    childObjects.map(
      async (object): Promise<PreparedOject> => {
        const preparedObject = generatePreparedObject(object);

        setLoadedObjects(object.name);

        if ('additionalObjects' in object) {
          object.additionalObjects.map(
            async (additionalObject): Promise<PreparedOject> => {
              const preparedChildObjects = generatePreparedObject(
                additionalObject
              );

              setLoadedObjects(additionalObject.name);

              return preparedChildObjects;
            }
          );
        }

        return preparedObject;
      }
    )
  );

  hideLoader();
  return preparedObjects;
};
