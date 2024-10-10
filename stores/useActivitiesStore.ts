import type { IActivity } from "@/types/services/activities";
import { defineStore } from "pinia";
import useActivitiesService from "@/requests/activities";

export default defineStore("activities", {
  state: () => ({
    isLoading: true,
    isError: false,
    activities: [] as IActivity[],
  }),
  actions: {
    async fetchAllActivities() {
      const { isDemoMode } = useDemoStore();
      const { updateStatistics } = useStatisticsStore();

      if (isDemoMode) {
        this.activities = useActivitiesDemoData();
        this.isLoading = false;

        updateStatistics();

        return;
      }

      this.isLoading = true;
      this.isError = false;

      const activitiesService = useActivitiesService();

      try {
        this.activities = await activitiesService.getAll();

        updateStatistics();
      } catch (err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
