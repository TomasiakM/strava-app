import type { IActivity } from "@/types/services/activities";

export default () => {
  const { activities } = storeToRefs(useActivitiesStore());

  return computed(() => {
    const groupedActivities = activities.value.reduce((prev, curr) => {
      if (!prev[curr.sportType]) {
        prev[curr.sportType] = [];
      }

      prev[curr.sportType] = [...prev[curr.sportType], curr];

      return prev;
    }, {} as { [key: string]: IActivity[] });

    return Object.entries(groupedActivities).reduce((prev, curr) => {
      if (!prev || curr[1].length > prev.count) {
        return { count: curr[1].length, sportType: curr[1][0].sportType };
      }

      return prev;
    }, null as { count: number; sportType: string } | null);
  });
};
