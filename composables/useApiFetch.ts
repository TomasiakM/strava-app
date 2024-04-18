import type { UseFetchOptions } from "nuxt/app";

type Url = string | (() => string);

export default <T>(url: Url, options: UseFetchOptions<T> = {}) => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();

  return useFetch("api/" + url, {
    ...options,
    baseURL: baseApiUrl,
  });
};
