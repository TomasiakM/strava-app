import type { ITileDetails } from "~/types/services/tiles";

export default () => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();
  const athleteStore = useAthleteStore();

  const getAllActivitiesTilesDetails = () => {
    return $fetch<ITileDetails[]>("api/tile", {
      method: "GET",
      baseURL: baseApiUrl,
      headers: {
        Authorization: `Bearer ${athleteStore.accessToken}`,
      },
    });
  };

  return { getAllActivitiesTilesDetails };
};
