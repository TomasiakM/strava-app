import type { IAthlete } from "~/types/services/athletes";

export default () => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();

  const userStore = useUserStore();

  const getInitData = () => {
    return $fetch<IAthlete>("api/athlete", {
      method: "GET",
      baseURL: baseApiUrl,
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
  };

  return { getInitData };
};
