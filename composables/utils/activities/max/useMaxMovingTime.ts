import type { IActivity } from "@/types/services/activities";

export default () => {
  const { activities } = storeToRefs(useActivitiesStore());

  return computed(() => {
    return activities.value.reduce((prev, curr) => {
      if (!prev || curr.movingTime > prev.movingTime) {
        return curr;
      }

      return prev;
    }, null as IActivity | null);
  });
};
