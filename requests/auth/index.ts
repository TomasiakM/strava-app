import type { ILoginResponse } from "@/types/services/auth/ILoginResponse";
import type { IRefreshResponse } from "@/types/services/auth/IRefreshResponse";
import baseApiRequest from "../baseApiRequest";

export default () => {
  const login = (code: string) => {
    return baseApiRequest<ILoginResponse>("api/auth/login", {
      method: "POST",
      body: { code },
      credentials: "include",
    });
  };

  const refresh = (headers?: Readonly<Record<string, string>>) => {
    return baseApiRequest<IRefreshResponse>("api/auth/refresh", {
      method: "POST",
      credentials: "include",
      headers,
    });
  };

  return { login, refresh };
};
