/**
 * Calculates orbits
 */
const calcOrbit = (startX: number, theta: number, dTheta: number) => {
  const orbitVal = [
    startX * Math.cos(theta),
    startX * Math.sin(theta),
    theta + dTheta
  ];

  return orbitVal;
};

export default calcOrbit;

/**
 * TODO get orbit lines
 */

// TODO orbital speed calculation
/**
 * Planet Rotations
 *     Mercury – 58.6 days – 87.97 days – 10.83 km/h (6.73 mph) – 47.36 km/s (29.43 mi/s)
  Venus – 243 days – 224.7 days – 6.52 km/h (4.5 mph) – 35.02 km/s (21.76 mi/s)
  Earth – 1 day – 365.26 days – 1,674 km/h (1,040 mph) – 29.78 km/s (18.5 mi/s)
  Mars – 1.03 days – 1.88 years – 866 km/h (538.1 mph) – 24 km/s (14.91 mi/s)
  Jupiter – 0.41 days – 11.86 years – 45,583 km/h (28,324 mph) – 13.07 km/s (8.51 mi/s)
  Saturn – 0.45 days – 29.46 years – 36,840 km/h (22,891.3 mph) – 9.68 km/s (6 mi/s)
  Uranus – 0.72 days – 84.01 years – 14,794 km/h (9,193 mph) – 6.8 km/s (4.225 mi/s)
  Neptune – 0.67 days – 164.79 years – 9,719 km/h (6,039 mph) – 5.43 km/s (3.374 mi/s)
  Pluto (dwarf planet) – 6.39 days – 248.59 years – 123.21 km/h (76.56 mph) – 4.743 km/s (2.947 mi/s)
*/
