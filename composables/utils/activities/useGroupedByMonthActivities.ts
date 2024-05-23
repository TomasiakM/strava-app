import type { IActivity } from "@/types/services/activities";

export default () => {
  const { activities } = storeToRefs(useActivitiesStore());

  return computed(() => {
    return activities.value.reduce((prev, curr) => {
      const date = new Date(curr.startDate);
      const year = date.getFullYear();
      const month = date.getMonth();

      const activitiesByMonth = prev.find(
        (e) => e.year === year && e.month === month
      );

      if (!activitiesByMonth) {
        return [...prev, { month, year, activities: [curr] }];
      }

      activitiesByMonth.activities = [...activitiesByMonth.activities, curr];

      return prev;
    }, [] as { month: number; year: number; activities: IActivity[] }[]);
  });
};
