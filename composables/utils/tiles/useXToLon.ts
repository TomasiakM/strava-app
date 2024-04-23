export default (xTile: number, z: number) => {
  return (xTile / Math.pow(2, z)) * 360.0 - 180.0;
};
