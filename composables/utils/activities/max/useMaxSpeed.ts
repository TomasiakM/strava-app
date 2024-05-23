import type { IActivity } from "@/types/services/activities";

export default () => {
  const { activities } = storeToRefs(useActivitiesStore());

  return computed(() => {
    return activities.value.reduce((prev, curr) => {
      if (!prev || curr.averageSpeed > prev.averageSpeed) {
        return curr;
      }

      return prev;
    }, null as IActivity | null);
  });
};
