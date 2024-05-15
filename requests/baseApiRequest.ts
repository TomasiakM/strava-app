export default <TResponse = undefined>(
  request: Parameters<typeof $fetch<TResponse>>[0],
  opts: Parameters<typeof $fetch<TResponse>>[1] = {}
) => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();
  const athleteStore = useAthleteStore();

  return $fetch<TResponse>(request, {
    method: "GET",
    ...opts,
    baseURL: baseApiUrl,
    headers: {
      Authorization: `Bearer ${athleteStore.accessToken}`,
      ...opts.headers,
    },
  });
};
