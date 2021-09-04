import type { CelestialObject, AdditionalObject } from './types/index';

export const backgroundImages: Array<string> = [
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
];

const celestialObjects: Array<CelestialObject> = [
  {
    name: 'sun',
    additionalObjects: null,
    classification: 'Star'
  },
  {
    name: 'mercury',
    additionalObjects: null,
    classification: 'Planet'
  },
  {
    name: 'venus',
    additionalObjects: null,
    classification: 'Planet'
  },
  {
    name: 'earth',
    additionalObjects: [
      {
        name: 'iss',
        distanceFromPrimary: 35.4,
        sizeDiffFromPrimary: 31.855,
        classification: 'Man Made Satelite'
      },
      {
        name: 'luna',
        distanceFromPrimary: 40_569,
        sizeDiffFromPrimary: 3.66,
        classification: 'Moon'
      }
    ],

    classification: 'Planet'
  },
  {
    name: 'mars',
    additionalObjects: [
      {
        name: 'odyssey',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Man Made Satelite'
      },
      {
        name: 'maven',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Man Made Satelite'
      },
      {
        name: 'deimos',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'phobos',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet'
  },
  {
    name: 'jupiter',
    additionalObjects: [
      {
        name: 'juno',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Man Made Satelite'
      },
      {
        name: 'callisto',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'europa',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'ganymede',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'io',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet'
  },
  {
    name: 'saturn',
    additionalObjects: [
      {
        name: 'cassini',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Man Made Satelite'
      },
      {
        name: 'enceladus',
        distanceFromPrimary: 6_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'titan',
        distanceFromPrimary: 7_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'dione',
        distanceFromPrimary: 8_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'hyperion',
        distanceFromPrimary: 9_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'lapetus',
        distanceFromPrimary: 10_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'mimas',
        distanceFromPrimary: 11_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet'
  },
  {
    name: 'uranus',
    additionalObjects: [
      {
        name: 'ariel',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'oberon',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'titania',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      },
      {
        name: 'umbriel',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet'
  },
  {
    name: 'neptune',
    additionalObjects: [
      {
        name: 'triton',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Planet'
  },
  {
    name: 'pluto',
    additionalObjects: [
      {
        name: 'charon',
        distanceFromPrimary: 5_000,
        sizeDiffFromPrimary: 4,
        classification: 'Moon'
      }
    ],
    classification: 'Dwarf Planet'
  },
  {
    name: 'ceres',
    additionalObjects: null,
    classification: 'Dwarf Planet'
  },
  {
    name: 'makemake',
    additionalObjects: null,
    classification: 'Dwarf Planet'
  },
  {
    name: 'haumea',
    additionalObjects: null,
    classification: 'Dwarf Planet'
  },
  {
    name: 'eris',
    additionalObjects: null,
    classification: 'Dwarf Planet'
  }
];

/**
 * Sets the starting theta and dTheta values for each planet
 */
const setThetas = (value: CelestialObject | AdditionalObject): void => {
  value.dTheta = (2 * Math.PI) / value.distanceFromPrimary;
  value.theta = 0;
};

/**
 * Sets the completed array of celestial objects
 */
const config = (): Array<CelestialObject> => {
  celestialObjects.forEach((value) => {
    if (value.additionalObjects !== null) {
      value.additionalObjects.forEach((val) => {
        setThetas(val);
      });
    }
    setThetas(value);
  });
  return celestialObjects;
};

export const completedCelestialObjects: Array<CelestialObject> = config();
