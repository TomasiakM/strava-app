import type { IAthlete } from "~/types/services/athletes";

export default () => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();

  const athleteStore = useAthleteStore();

  const getInitData = () => {
    return $fetch<IAthlete>("api/athlete", {
      method: "GET",
      baseURL: baseApiUrl,
      headers: {
        Authorization: `Bearer ${athleteStore.accessToken}`,
      },
    });
  };

  return { getInitData };
};
