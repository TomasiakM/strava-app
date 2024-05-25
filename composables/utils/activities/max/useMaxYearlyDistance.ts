export default () => {
  return computed(() => {
    const { statistics } = storeToRefs(useStatisticsStore());

    const bestYearDistance = Object.entries(statistics.value).reduce(
      (prev, [year, curr]) => {
        const yearDistance = Object.entries(curr).reduce(
          (sum, [_, monthStats]) => {
            return sum + monthStats.distance;
          },
          0
        );

        if (!prev || yearDistance > prev.distance) {
          return { distance: yearDistance, year: Number(year) };
        }

        return prev;
      },
      null as { distance: number; year: number } | null
    );

    return bestYearDistance;
  });
};
