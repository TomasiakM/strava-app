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
    getActivityNewSquareTiles(state): (activityId: number) => ITile[] {
      return (activityId: number) =>
        state.activitiesTiles.find((e) => e.stravaActivityId == activityId)
          ?.newSquareTiles || [];
    },

    getNewTilesWithoutNewClusterAndSquareTiles(
      state
    ): (activityId: number) => ITile[] {
      return (activityId: number): ITile[] => {
        const activityTiles = state.activitiesTiles.find(
          (e) => e.stravaActivityId == activityId
        );

        if (!activityTiles) return [];

        return activityTiles.newTiles.filter(
          (tile) =>
            !(
              activityTiles.newClusterTiles.some(
                (t) => t.x === tile.x && t.y === tile.y && t.z === tile.z
              ) ||
              activityTiles.newSquareTiles.some(
                (t) => t.x === tile.x && t.y === tile.y && t.z === tile.z
              )
            )
        );
      };
    },
    getNewTilesWithoutNewSquareTiles(state): (activityId: number) => ITile[] {
      return (activityId: number): ITile[] => {
        const activityTiles = state.activitiesTiles.find(
          (e) => e.stravaActivityId == activityId
        );

        if (!activityTiles) return [];

        return activityTiles.newClusterTiles.filter(
          (tile) =>
            !activityTiles.newSquareTiles.some(
              (t) => t.x === tile.x && t.y === tile.y && t.z === tile.z
            )
        );
      };
    },

    getMainTiles(state) {
      const tiles = state.activitiesTiles.reduce(
        (prev: ITile[], curr: ITileDetails): ITile[] => [
          ...prev,
          ...curr.newTiles,
        ],
        []
      );

      const uniqueTiles = Object.values(
        tiles.reduce(
          (
            acc: { [key: string]: ITile },
            obj: ITile
          ): { [key: string]: ITile } => ({
            ...acc,
            [`${obj.x}/${obj.y}/${obj.z}`]: obj,
          }),
          {}
        )
      );

      const clusters = uniqueTiles.reduce(
        (prev: ITile[], curr: ITile): ITile[] => {
          const isCluster =
            uniqueTiles.find(
              (e) => e.x === curr.x + 1 && e.y === curr.y && e.z === curr.z
            ) &&
            uniqueTiles.find(
              (e) => e.x === curr.x - 1 && e.y === curr.y && e.z === curr.z
            ) &&
            uniqueTiles.find(
              (e) => e.x === curr.x && e.y === curr.y + 1 && e.z === curr.z
            ) &&
            uniqueTiles.find(
              (e) => e.x === curr.x && e.y === curr.y - 1 && e.z === curr.z
            );

          if (isCluster) {
            return [...prev, curr];
          }

          return prev;
        },
        []
      );

      const tilesWithoutClusters = uniqueTiles.filter(
        (tile) =>
          !clusters.some(
            (cluster) =>
              cluster.x == tile.x &&
              cluster.y === tile.y &&
              cluster.z === tile.z
          )
      );

      const square = useFindMaxSquareBox(uniqueTiles);

      return {
        tiles,
        tilesWithoutClusters,
        clusters,
        square,
      };
    },
  },
});
