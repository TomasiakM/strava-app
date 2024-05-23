import type { ITileDetails } from "@/types/services/tiles";

export default () => {
  const { activities } = storeToRefs(useActivitiesStore());
  const { activitiesTiles } = storeToRefs(useTilesStore());

  return computed(() => {
    const maxActivityNewClusters = activitiesTiles.value.reduce(
      (prev, curr) => {
        if (
          !prev ||
          curr.newClusterTiles.length > prev.newClusterTiles.length
        ) {
          return curr;
        }

        return prev;
      },
      null as ITileDetails | null
    );

    const activity = activities.value.find(
      (e) => e.stravaId == maxActivityNewClusters?.stravaActivityId
    );

    return {
      size: maxActivityNewClusters?.newClusterTiles.length || 0,
      activity,
    };
  });
};
