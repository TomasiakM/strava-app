export default (yTile: number, z: number) => {
  const n = Math.PI - (2 * Math.PI * yTile) / Math.pow(2, z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
};
