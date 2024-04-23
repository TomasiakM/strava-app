export default (lon: number, tileCounts: number) => {
  return Math.trunc(Math.floor(((lon + 180.0) / 360.0) * tileCounts));
};
