import type { IAthlete } from "@/types/services/athletes";
import { defineStore } from "pinia";
import useAuthService from "@/requests/auth";
import useAthletesService from "@/requests/athletes";

export default defineStore("athlete", {
  state: () => ({
    athlete: null as IAthlete | null,
    accessToken: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    async login(code: string) {
      const authService = useAuthService();

      try {
        const response = await authService.login(code);

        this.athlete = response.athlete;
        this.accessToken = response.accessToken;

        return true;
      } catch {
        return false;
      }
    },
    async refresh() {
      const authService = useAuthService();

      try {
        const response = await authService.refresh();
        this.accessToken = response.accessToken;

        return true;
      } catch {
        return false;
      }
    },
    async init(headers: Readonly<Record<string, string>>) {
      const authService = useAuthService();
      const athletesService = useAthletesService();

      try {
        const response = await authService.refresh(headers);
        this.accessToken = response.accessToken;

        const athlete = await athletesService.getInitData();
        this.athlete = athlete;

        return true;
      } catch {
        return false;
      }
    },
  },
});
