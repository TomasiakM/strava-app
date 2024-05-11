import { defineStore } from "pinia";
import useTileService from "@/requests/tiles";
import type { ITileDetails } from "@/types/services/tiles";

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
    getActivityTiles(state): (activityId: number) => ITileDetails | undefined {
      return (activityId: number) =>
        state.activitiesTiles.find((e) => e.stravaActivityId == activityId);
    },
  },
});
