export interface ITileDetails {
  stravaUserId: number;
  stravaActivityId: number;
  newSquare: number;
  tiles: ITile[];
  newTiles: ITile[];
  newClusterTiles: ITile[];
}

export interface ITile {
  x: number;
  y: number;
  z: number;
}
