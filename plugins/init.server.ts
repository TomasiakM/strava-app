const REFRESH_TOKEN_NAME = "X-Refresh-Token";

export default defineNuxtPlugin(async (nuxtApp) => {
  const athleteStore = useAthleteStore();
  const refreshCookie = useCookie(REFRESH_TOKEN_NAME);

  if (refreshCookie.value) {
    const headers = useRequestHeaders();

    await athleteStore.init(headers);
  }
});
