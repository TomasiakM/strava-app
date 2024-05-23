export default () => {
  return computed(() => {
    const activitiesByMonth = useGroupedByMonthActivities();

    const bestMonth = activitiesByMonth.value.reduce((prev, curr) => {
      const distanceByMonth = curr.activities.reduce((distance, activity) => {
        return distance + activity.distance;
      }, 0);

      if (!prev || distanceByMonth > prev.distance) {
        const month =
          curr.month + 1 < 10 ? `0${curr.month + 1}` : `${curr.month + 1}`;
        return {
          distance: distanceByMonth,
          date: `${month}/${curr.year}`,
        };
      }

      return prev;
    }, null as { distance: number; date: string } | null);

    return bestMonth;
  });
};
