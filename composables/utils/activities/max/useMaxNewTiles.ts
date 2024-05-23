import type { ITileDetails } from "@/types/services/tiles";

export default () => {
  const { activities } = storeToRefs(useActivitiesStore());
  const { activitiesTiles } = storeToRefs(useTilesStore());

  return computed(() => {
    const maxActivityNewTiles = activitiesTiles.value.reduce((prev, curr) => {
      if (!prev || curr.newTiles.length > prev.newTiles.length) {
        return curr;
      }

      return prev;
    }, null as ITileDetails | null);

    const activity = activities.value.find(
      (e) => e.stravaId == maxActivityNewTiles?.stravaActivityId
    );

    return { size: maxActivityNewTiles?.newTiles.length || 0, activity };
  });
};
