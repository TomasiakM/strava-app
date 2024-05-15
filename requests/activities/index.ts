import type { IActivity } from "@/types/services/activities";
import baseApiRequest from "../baseApiRequest";

export default () => {
  const getAll = () => {
    return baseApiRequest<IActivity[]>("api/activity");
  };

  return { getAll };
};
