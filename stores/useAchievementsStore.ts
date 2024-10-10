import type { IAchievement } from "@/types/services/achievements";
import { defineStore } from "pinia";
import useAchievementsService from "@/requests/achievements";
import useAchievementsDemoData from "@/composables/utils/demo/useAchievementsDemoData";

export default defineStore("achievements", {
  state: () => ({
    isLoading: true,
    isError: false,
    achievements: [] as IAchievement[],
  }),
  actions: {
    async fetchAllAchievements() {
      const { isDemoMode } = useDemoStore();

      if (isDemoMode) {
        this.achievements = useAchievementsDemoData();
        this.isLoading = false;

        return;
      }

      this.isLoading = true;
      this.isError = false;

      const achievementsService = useAchievementsService();

      try {
        const achievements = await achievementsService.getAll();
        this.achievements = achievements;
      } catch (err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
