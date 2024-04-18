import type { ILoginResponse } from "@/types/services/auth/ILoginResponse";

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

  const refresh = () => {
    return $fetch<IRefreshResponse>("api/auth/refresh", {
      method: "POST",
      baseURL: baseApiUrl,
      credentials: "include",
    });
  };

  return { login, refresh };
};
