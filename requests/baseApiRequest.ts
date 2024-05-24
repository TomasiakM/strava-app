import type { IRefreshResponse } from "@/types/services/auth/IRefreshResponse";

const requestsAllowed401Repsonse = ["api/auth/login", "api/auth/refresh"];

export default async <TResponse>(
  request: Parameters<typeof $fetch<TResponse>>[0],
  opts: Parameters<typeof $fetch<TResponse>>[1] = {}
): Promise<TResponse> => {
  try {
    const response = await fetchRequest<TResponse>(request, opts);

    return response;
  } catch (err: any) {
    if (
      err?.response?.status === 401 &&
      !requestsAllowed401Repsonse.some((e) => err.response.url.includes(e))
    ) {
      const userStore = useUserStore();
      const isRefreshSuccessful = await userStore.refresh();

      if (isRefreshSuccessful) {
        return await fetchRequest<TResponse>(request, opts);
      }
    }

    throw err;
  }
};

const fetchRequest = <TResponse = undefined>(
  request: Parameters<typeof $fetch<TResponse>>[0],
  opts: Parameters<typeof $fetch<TResponse>>[1] = {}
): Promise<TResponse> => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();
  const userStore = useUserStore();

  return $fetch<TResponse>(request, {
    method: "GET",
    ...opts,
    baseURL: baseApiUrl,
    headers: {
      Authorization: `Bearer ${userStore.accessToken}`,
      ...opts.headers,
    },
  });
};
