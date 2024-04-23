export default (
  bounds: Ref<L.LatLngBounds | undefined>,
  zoom: Ref<number>
): ComputedRef<L.LatLngExpression[][]> => {
  return computed(() => {
    if (!bounds.value || zoom.value <= 10) return [];

    const z = 14;

    const top = bounds.value.getNorth();
    const bottom = bounds.value.getSouth();
    const left = bounds.value.getWest();
    const right = bounds.value.getEast();

    const topLeftTile = useLatLonToTile(top, left, z);
    const bottomRigthTile = useLatLonToTile(bottom, right, z);

    const topLeftBox = useTileToBoxCoordinates(topLeftTile.x, topLeftTile.y, z);

    const bottomRigthBox = useTileToBoxCoordinates(
      bottomRigthTile.x + 1,
      bottomRigthTile.y + 1,
      z
    );

    let currentXTile = topLeftTile.x + 1;
    const lines = [] as L.LatLngExpression[][];
    do {
      const latTop = topLeftBox[0][0];
      const latBottom = bottomRigthBox[0][0];
      const lon = useXToLon(currentXTile, z);

      lines.push([
        [latTop, lon],
        [latBottom, lon],
      ]);

      currentXTile++;
    } while (currentXTile < bottomRigthTile.x + 1);

    let currentYTile = topLeftTile.y + 1;
    do {
      const lat = useYToLat(currentYTile, z);
      const lotleft = topLeftBox[0][1];
      const lonRight = bottomRigthBox[0][1];

      lines.push([
        [lat, lotleft],
        [lat, lonRight],
      ]);

      currentYTile++;
    } while (currentYTile <= bottomRigthTile.y);

    return lines;
  });
};
