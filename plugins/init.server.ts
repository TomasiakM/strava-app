const REFRESH_TOKEN_NAME = "X-Refresh-Token";

export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();
  const refreshCookie = useCookie(REFRESH_TOKEN_NAME);

  if (refreshCookie.value) {
    const headers = useRequestHeaders();

    await userStore.init(headers);
  }
});
