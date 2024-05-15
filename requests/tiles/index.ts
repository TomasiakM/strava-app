import type { ITileDetails } from "~/types/services/tiles";
import baseApiRequest from "../baseApiRequest";

export default () => {
  const getAllActivitiesTilesDetails = () => {
    return baseApiRequest<ITileDetails[]>("api/tile");
  };

  return { getAllActivitiesTilesDetails };
};
