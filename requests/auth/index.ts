import type { ILoginResponse } from "@/types/services/auth/ILoginResponse";
import type { IRefreshResponse } from "@/types/services/auth/IRefreshResponse";

export default () => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();

  const login = (code: string) => {
    return $fetch<ILoginResponse>("api/auth/login", {
      method: "POST",
      body: { code },
      baseURL: baseApiUrl,
      credentials: "include",
    });
  };

  const refresh = (headers?: Readonly<Record<string, string>>) => {
    return $fetch<IRefreshResponse>("api/auth/refresh", {
      method: "POST",
      baseURL: baseApiUrl,
      credentials: "include",
      headers,
    });
  };

  return { login, refresh };
};
