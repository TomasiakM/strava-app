export default (lat: number, lon: number, z: number) => {
  const tilesCount = Math.pow(2, z);
  const x = useLonToX(lon, tilesCount);
  const y = useLatToY(lat, tilesCount);

  return {
    x,
    y,
    z,
  };
};
