import type { IAthlete } from "~/types/services/athletes";
import baseApiRequest from "../baseApiRequest";

export default () => {
  const getAuthorized = () => {
    return baseApiRequest<IAthlete>("api/athlete");
  };

  return { getAuthorized };
};
