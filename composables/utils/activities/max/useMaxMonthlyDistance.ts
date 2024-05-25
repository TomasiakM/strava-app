export default () => {
  return computed(() => {
    const { statistics } = storeToRefs(useStatisticsStore());

    const bestMonth = Object.values(statistics.value).reduce((prev, curr) => {
      const bestMonthInYear = Object.values(curr).reduce(
        (prevBest, currStats) => {
          if (!prevBest || currStats.distance > prevBest.distance) {
            const month =
              currStats.month + 1 < 10
                ? `0${currStats.month + 1}`
                : `${currStats.month + 1}`;
            return {
              distance: currStats.distance,
              date: `${month}/${currStats.year}`,
            };
          }

          return prevBest;
        },
        null as { distance: number; date: string } | null
      );

      if (
        !prev ||
        (bestMonthInYear && bestMonthInYear.distance > prev.distance)
      ) {
        return bestMonthInYear;
      }

      return prev;
    }, null as { distance: number; date: string } | null);

    return bestMonth;
  });
};
