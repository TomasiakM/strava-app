export default () => {
  return computed(() => {
    const activitiesByYear = useGroupedByYearActivities();

    const bestYear = activitiesByYear.value.reduce((prev, curr) => {
      const distanceByYear = curr.activities.reduce((distance, activity) => {
        return distance + activity.distance;
      }, 0);

      if (!prev || distanceByYear > prev.distance) {
        return { distance: distanceByYear, year: curr.year };
      }

      return prev;
    }, null as { distance: number; year: number } | null);

    return bestYear;
  });
};
