import type { IAchievement } from "@/types/services/achievements";
import baseApiRequest from "../baseApiRequest";

export default () => {
  const getAll = () => {
    return baseApiRequest<IAchievement[]>("api/achievement");
  };

  return { getAll };
};
