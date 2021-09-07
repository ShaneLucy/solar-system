import { Object3D } from 'three';

import { loadModel } from '../loaders';
import scalingFactor from './scaling';
import {
  objectsToLoad,
  loadedObjects,
  errors,
  additionalLoadingComplete,
  showAdditionalLoader
} from '../store';

import type { AdditionalObject, PreparedOject } from '../types/index';

const showLoader = (): void => {
  additionalLoadingComplete.set(false);
  showAdditionalLoader.set(true);
};

const setObjectsToLoad = (childObjects: Array<AdditionalObject>): void => {
  showLoader();

  childObjects.forEach((childObject) => {
    objectsToLoad.update((val) => [...val, childObject.name]);
  });
};

const setLoadedObjects = (name: string): void => {
  loadedObjects.update((val) => [...val, name]);
};

const hideLoader = (): void => {
  additionalLoadingComplete.set(true);
  setTimeout(() => {
    loadedObjects.set([]);
    objectsToLoad.set([]);
  }, 1_500);
};

export default async (
  childObjects: Array<AdditionalObject>
): Promise<Array<PreparedOject>> => {
  setObjectsToLoad(childObjects);

  const preparedObjects: Array<PreparedOject> = await Promise.all(
    childObjects.map(
      async (object): Promise<PreparedOject> => {
        let model;
        try {
          model = await loadModel(object.name);
        } catch (error) {
          errors.update((val) => [...val, error]);
        }
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

        object3d.position.setX(object.distanceFromPrimary);

        setLoadedObjects(object.name);

        return preparedObject;
      }
    )
  );

  hideLoader();
  return preparedObjects;
};
