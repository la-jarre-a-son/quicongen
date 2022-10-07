export const degToRad = (deg) => ((deg + 90) / 180) * Math.PI;

export const polarToCartesian = (angle, distance) => {
  const x = Math.cos(degToRad(angle)) * distance;
  const y = Math.sin(degToRad(angle)) * distance;

  return [x, y];
};
