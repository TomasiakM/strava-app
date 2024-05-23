import type { IActivity } from "@/types/services/activities";

export default () => {
  const { activities } = storeToRefs(useActivitiesStore());

  return computed(() => {
    return activities.value.reduce((prev, curr) => {
      const date = new Date(curr.startDate);
      const year = date.getFullYear();

      const activitiesByYear = prev.find((e) => e.year === year);

      if (!activitiesByYear) {
        return [...prev, { year, activities: [curr] }];
      }

      activitiesByYear.activities = [...activitiesByYear.activities, curr];

      return prev;
    }, [] as { year: number; activities: IActivity[] }[]);
  });
};
