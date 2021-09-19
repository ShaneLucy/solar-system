import type { CelestialObject, AdditionalObject } from '../../types/index';
import { ClassificationEnum } from '../../types/index';

export const backgroundImages: Array<string> = [
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
];

/**
 * Going to use a 100,000 to one scale
 */
const celestialObjects: Array<CelestialObject> = [
  {
    name: 'sun',
    childObjects: [],
    classification: ClassificationEnum.Star,
    distanceFromPrimary: 0,
    radius: 6_960,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'mercury',
    childObjects: [],
    classification: ClassificationEnum.Planet,
    distanceFromPrimary: 502_500,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'venus',
    childObjects: [],
    classification: ClassificationEnum.Planet,
    distanceFromPrimary: 1082089,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'earth',
    childObjects: [
      {
        name: 'iss',
        distanceFromPrimary: 4.15,
        radius: 0.001,
        classification: ClassificationEnum.Satellite,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'luna',
        distanceFromPrimary: 4_056,
        radius: 17.4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      }
    ],
    classification: ClassificationEnum.Planet,
    distanceFromPrimary: 1_495_978,
    radius: 63.78,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'mars',
    childObjects: [
      {
        name: 'odyssey',
        distanceFromPrimary: 2_000,
        radius: 1,
        classification: ClassificationEnum.Satellite,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'maven',
        distanceFromPrimary: 4_000,
        radius: 1,
        classification: ClassificationEnum.Satellite,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'deimos',
        distanceFromPrimary: 5_000,
        radius: 1,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'phobos',
        distanceFromPrimary: 5_000,
        radius: 1,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      }
    ],
    classification: ClassificationEnum.Planet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'jupiter',
    childObjects: [
      {
        name: 'juno',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Satellite,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'callisto',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'europa',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'ganymede',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'io',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      }
    ],
    classification: ClassificationEnum.Planet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'saturn',
    childObjects: [
      {
        name: 'cassini',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Satellite,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'enceladus',
        distanceFromPrimary: 6_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'titan',
        distanceFromPrimary: 7_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'dione',
        distanceFromPrimary: 8_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'hyperion',
        distanceFromPrimary: 9_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'lapetus',
        distanceFromPrimary: 10_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'mimas',
        distanceFromPrimary: 11_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      }
    ],
    classification: ClassificationEnum.Planet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'uranus',
    childObjects: [
      {
        name: 'ariel',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'oberon',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'titania',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      },
      {
        name: 'umbriel',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      }
    ],
    classification: ClassificationEnum.Planet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'neptune',
    childObjects: [
      {
        name: 'triton',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      }
    ],
    classification: ClassificationEnum.Planet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'pluto',
    childObjects: [
      {
        name: 'charon',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: ClassificationEnum.Moon,
        theta: 0,
        dTheta: 0
      }
    ],
    classification: ClassificationEnum.DwarfPlanet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'ceres',
    childObjects: [],
    classification: ClassificationEnum.DwarfPlanet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'makemake',
    childObjects: [],
    classification: ClassificationEnum.DwarfPlanet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'haumea',
    childObjects: [],
    classification: ClassificationEnum.DwarfPlanet,
    distanceFromPrimary: 35.4,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  },
  {
    name: 'eris',
    childObjects: [],
    classification: ClassificationEnum.DwarfPlanet,
    distanceFromPrimary: 140_000_000,
    radius: 31.855,
    theta: 0,
    dTheta: 0
  }
];

/**
 * Sets the starting theta and dTheta values for each planet
 */
const setDTheta = (distanceFromPrimary: number): number => {
  const dTheta = (2 * Math.PI) / distanceFromPrimary;

  return dTheta;
};

/**
 * Sets the completed array of celestial objects
 */
const config = (): Array<CelestialObject> => {
  const completedObjects: Array<CelestialObject> = celestialObjects.map(
    (value) => {
      let completedAdditionalObject: Array<AdditionalObject> = [];
      completedAdditionalObject = value.childObjects.map((val) => {
        const childDTheta = setDTheta(val.distanceFromPrimary);
        const childResult = { ...val, dTheta: childDTheta };

        return childResult;
      });

      const dTheta = setDTheta(value.distanceFromPrimary);
      const result = { ...value, dTheta };

      result.childObjects = [...completedAdditionalObject];

      return result;
    }
  );

  return completedObjects;
};

export const completedCelestialObjects = config();
