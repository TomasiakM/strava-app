import type { IActivity } from "@/types/services/activities";

export default () => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();

  const userStore = useAthleteStore();

  const getAll = () => {
    return $fetch<IActivity[]>("api/activity", {
      method: "GET",
      baseURL: baseApiUrl,
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
  };

  return { getAll };
};
