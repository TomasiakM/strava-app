import type { ITile } from "@/types/services/tiles";

export default (tiles: ITile[]) => {
  const tileHashMap: { [key: string]: boolean } = {};

  const findNewSquare = (tile: ITile): ITile[] => {
    let squareTiles = [tile];

    let size = 1;
    let newSquareAvailable = true;
    while (newSquareAvailable) {
      var newSquareSizeTiles: ITile[] = [];

      for (let i = 0; i <= size; i++) {
        const rightTile = tiles.find(
          (e) => e.x === tile.x + size && e.y === tile.y + i && e.z === tile.z
        );
        const bottomTile = tiles.find(
          (e) => e.x === tile.x + i && e.y === tile.y + size && e.z === tile.z
        );

        if (rightTile && bottomTile) {
          newSquareSizeTiles = [...newSquareSizeTiles, rightTile, bottomTile];
          continue;
        }

        newSquareAvailable = false;
        break;
      }

      if (newSquareAvailable) {
        squareTiles = [...squareTiles, ...newSquareSizeTiles];
      }

      size++;
    }

    return squareTiles;
  };

  let square: ITile[] = [];
  tiles.forEach((e) => {
    const tileString = `${e.x}/${e.y}/${e.z}`;
    if (tileHashMap[tileString]) {
      return;
    }

    const foundSquare = findNewSquare(e);
    if (foundSquare.length > square.length) {
      square = foundSquare;
    }
  });

  let squareBox: L.LatLngTuple[] = [];
  if (square.length) {
    const leftTopSquareTile = square.reduce((prev, curr) =>
      prev.x <= curr.x && prev.y <= curr.y ? prev : curr
    );
    const rightTopSquareTile = square.reduce((prev, curr) =>
      prev.x >= curr.x && prev.y <= curr.y ? prev : curr
    );

    const rightBottomSquareTile = square.reduce((prev, curr) =>
      prev.x >= curr.x && prev.y >= curr.y ? prev : curr
    );

    const leftBottomSquareTile = square.reduce((prev, curr) =>
      prev.x <= curr.x && prev.y >= curr.y ? prev : curr
    );

    const leftTop = useTileToBoxCoordinates(
      leftTopSquareTile.x,
      leftTopSquareTile.y,
      leftTopSquareTile.z
    );
    const rightTop = useTileToBoxCoordinates(
      rightTopSquareTile.x,
      rightTopSquareTile.y,
      rightTopSquareTile.z
    );

    const rightBottom = useTileToBoxCoordinates(
      rightBottomSquareTile.x,
      rightBottomSquareTile.y,
      rightBottomSquareTile.z
    );

    const leftBottom = useTileToBoxCoordinates(
      leftBottomSquareTile.x,
      leftBottomSquareTile.y,
      leftBottomSquareTile.z
    );

    squareBox = [leftTop[0], rightTop[1], rightBottom[2], leftBottom[3]];
  }

  return squareBox;
};
