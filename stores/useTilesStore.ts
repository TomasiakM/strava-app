import { defineStore } from "pinia";
import useTileService from "@/requests/tiles";
import type { ITile, ITileDetails } from "@/types/services/tiles";

export default defineStore("tiles", {
  state: () => ({
    isLoading: true,
    isError: false,
    activitiesTiles: [] as ITileDetails[],
  }),
  actions: {
    async fetchAllActivitiesTiles() {
      const { isDemoMode } = useDemoStore();
      if (isDemoMode) {
        this.activitiesTiles = useActivitiesTilesDemoData();
        this.isLoading = false;

        return true;
      }

      this.isLoading = true;
      this.isError = false;

      const tilesService = useTileService();

      try {
        this.activitiesTiles =
          await tilesService.getAllActivitiesTilesDetails();
      } catch {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    getActivityTiles(state): (activityId: number) => {
      [key in "tiles" | "clusters" | "tilesWithoutNewClusters"]: ITile[];
    } {
      return (activityId: number) => {
        const activityTiles = state.activitiesTiles.find(
          (e) => e.stravaActivityId === activityId
        );

        if (!activityTiles) {
          return {
            tiles: [],
            clusters: [],
            tilesWithoutNewClusters: [],
          };
        }

        return {
          tiles: activityTiles.newTiles,
          clusters: activityTiles.newClusterTiles,
          tilesWithoutNewClusters: activityTiles.newTiles.filter(
            (e) =>
              !activityTiles.newClusterTiles.some(
                (t) => t.x === e.x && t.y === e.y && t.z === e.z
              )
          ),
        };
      };
    },
    getMainTiles(state) {
      const tiles = state.activitiesTiles.flatMap((e) => e.tiles);
      const uniqueTiles: ITile[] = [
        ...new Set(tiles.map((i) => JSON.stringify(i))),
      ].map((i) => JSON.parse(i));

      const clusters = state.activitiesTiles.flatMap((e) => e.newClusterTiles);

      const tilesWithoutClusters = uniqueTiles.filter(
        (tile) =>
          !clusters.some(
            (cluster) =>
              cluster.x == tile.x &&
              cluster.y === tile.y &&
              cluster.z === tile.z
          )
      );

      const squareBox = useFindMaxSquareBox(uniqueTiles);

      return {
        tiles,
        tilesWithoutClusters,
        clusters: clusters,
        squareBox,
      };
    },
  },
});
