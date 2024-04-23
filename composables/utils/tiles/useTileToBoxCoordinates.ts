export default (x: number, y: number, z: number): L.LatLngTuple[] => {
  let lon1 = useXToLon(x, z);

  let n1 = Math.PI - (2.0 * Math.PI * y) / Math.pow(2, z);
  let lat1 =
    (180.0 / Math.PI) * Math.atan(0.5 * (Math.exp(n1) - Math.exp(-n1)));

  let lon2 = useXToLon(x + 1, z);

  let n2 = Math.PI - (2.0 * Math.PI * (y + 1)) / Math.pow(2, z);
  let lat2 =
    (180.0 / Math.PI) * Math.atan(0.5 * (Math.exp(n2) - Math.exp(-n2)));

  return [
    [lat1, lon1],
    [lat1, lon2],
    [lat2, lon2],
    [lat2, lon1],
  ];
};
