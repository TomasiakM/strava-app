import type { ITileDetails } from "@/types/services/tiles";

export default () => {
  const { activities } = storeToRefs(useActivitiesStore());
  const { activitiesTiles } = storeToRefs(useTilesStore());

  return computed(() => {
    const maxActivityTiles = activitiesTiles.value.reduce((prev, curr) => {
      if (!prev || curr.tiles.length > prev.tiles.length) {
        return curr;
      }

      return prev;
    }, null as ITileDetails | null);

    const activity = activities.value.find(
      (e) => e.stravaId == maxActivityTiles?.stravaActivityId
    );

    return { size: maxActivityTiles?.tiles.length || 0, activity };
  });
};
