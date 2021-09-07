import type { CelestialObject, AdditionalObject } from './types/index';

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
    additionalObjects: null,
    classification: 'Star',
    distanceFromPrimary: 0,
    radius: 6960
  },
  {
    name: 'mercury',
    additionalObjects: null,
    classification: 'Planet',
    distanceFromPrimary: 502500,
    radius: 31.855
  },
  {
    name: 'venus',
    additionalObjects: null,
    classification: 'Planet',
    distanceFromPrimary: 1082089,
    radius: 31.855
  },
  {
    name: 'earth',
    additionalObjects: [
      // {
      //   name: 'iss',
      //   distanceFromPrimary: 3.54,
      //   radius: 31.855,
      //   classification: 'Man Made Satelite'
      // },
      {
        name: 'luna',
        distanceFromPrimary: 4_056,
        radius: 17.4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet',
    distanceFromPrimary: 1_495_978,
    radius: 63.78
  },
  {
    name: 'mars',
    additionalObjects: [
      {
        name: 'odyssey',
        distanceFromPrimary: 2_000,
        radius: 1,
        classification: 'Man Made Satelite'
      },
      {
        name: 'maven',
        distanceFromPrimary: 4_000,
        radius: 1,
        classification: 'Man Made Satelite'
      },
      {
        name: 'deimos',
        distanceFromPrimary: 5_000,
        radius: 1,
        classification: 'Moon'
      },
      {
        name: 'phobos',
        distanceFromPrimary: 7_000,
        radius: 1,
        classification: 'Moon'
      }
    ],
    classification: 'Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'jupiter',
    additionalObjects: [
      {
        name: 'juno',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Man Made Satelite'
      },
      {
        name: 'callisto',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'europa',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'ganymede',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'io',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'saturn',
    additionalObjects: [
      {
        name: 'cassini',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Man Made Satelite'
      },
      {
        name: 'enceladus',
        distanceFromPrimary: 6_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'titan',
        distanceFromPrimary: 7_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'dione',
        distanceFromPrimary: 8_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'hyperion',
        distanceFromPrimary: 9_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'lapetus',
        distanceFromPrimary: 10_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'mimas',
        distanceFromPrimary: 11_000,
        radius: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'uranus',
    additionalObjects: [
      {
        name: 'ariel',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'oberon',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'titania',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      },
      {
        name: 'umbriel',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'neptune',
    additionalObjects: [
      {
        name: 'triton',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'pluto',
    additionalObjects: [
      {
        name: 'charon',
        distanceFromPrimary: 5_000,
        radius: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Dwarf Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'ceres',
    additionalObjects: null,
    classification: 'Dwarf Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'makemake',
    additionalObjects: null,
    classification: 'Dwarf Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'haumea',
    additionalObjects: null,
    classification: 'Dwarf Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  },
  {
    name: 'eris',
    additionalObjects: null,
    classification: 'Dwarf Planet',
    distanceFromPrimary: 35.4,
    radius: 31.855
  }
];

/**
 * Sets the starting theta and dTheta values for each planet
 */
const setThetas = (
  value: CelestialObject | AdditionalObject
): Array<number> => {
  const dTheta = (2 * Math.PI) / value.distanceFromPrimary;

  return [dTheta, 0];
};

/**
 * Sets the completed array of celestial objects
 */
const config = (): Array<CelestialObject> => {
  celestialObjects.forEach((value, index) => {
    if (value.additionalObjects !== null) {
      value.additionalObjects.forEach((val, idx) => {
        [
          celestialObjects[index].additionalObjects[idx].dTheta,
          celestialObjects[index].additionalObjects[idx].theta
        ] = setThetas(val);
      });
    }

    [celestialObjects[index].dTheta, celestialObjects[index].theta] = setThetas(
      value
    );
  });
  return celestialObjects;
};

export const completedCelestialObjects: Array<CelestialObject> = config();
