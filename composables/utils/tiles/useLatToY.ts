export default (lat: number, tilesCount: number) => {
  return Math.trunc(
    Math.floor(
      ((1.0 -
        Math.log(
          Math.tan((lat * Math.PI) / 180.0) +
            1.0 / Math.cos((lat * Math.PI) / 180.0)
        ) /
          Math.PI) /
        2.0) *
        tilesCount
    )
  );
};
