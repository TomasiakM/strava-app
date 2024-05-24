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

        return true;
      }

      this.isLoading = true;
      this.isError = false;

      const activitiesStore = useActivitiesService();

      try {
        const activities = await activitiesStore.getAll();
        this.activities = activities;

        updateStatistics();
      } catch (err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
