import type { IAthlete } from "@/types/services/athletes";

export interface ILoginResponse {
  athlete: IAthlete;
  accessToken: string;
}
