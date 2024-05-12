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
  },
});
