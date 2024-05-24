<template>
  <Chart
    id="yearly-distance-chart"
    title="Dystans na przestrzeni roku"
    :series="series"
    :xAxisFormatter="(e: number) => useMonth(e - 1)"
    :yAxisFormatter="yDistance"
    :tooltipFormatter="(e: number) => `${useDistance(e)} km`"
  />
</template>

<script lang="ts" setup>
const groupedActivities = useGroupedByMonthActivities();

const distanceByMonths = computed(() =>
  groupedActivities.value.reduce((prev, { year, month, activities }) => {
    const distance = activities.reduce(
      (prevDistance, { distance }) => prevDistance + distance,
      0
    );

    if (!prev[year]) prev[year] = [];

    return { ...prev, [year]: [...prev[year], { month, distance }] };
  }, {} as { [key: string]: { month: number; distance: number }[] })
);

const distanceByMonthsWithEmptyMonths = computed(() => {
  return Object.entries(distanceByMonths.value).reduce(
    (prev, [year, objects]) => {
      let emptyMonths = [] as { month: number; distance: number }[];

      for (let i = 0; i < 12; i++) {
        emptyMonths = [...emptyMonths, { month: i, distance: 0 }];
      }

      prev[year] = [
        ...objects,
        ...emptyMonths.filter(
          (e) => !objects.find((el) => el.month === e.month)
        ),
      ];

      prev[year] = prev[year].sort((a, b) => a.month - b.month);

      return prev;
    },
    {} as { [key: string]: { month: number; distance: number }[] }
  );
});

const series = computed(() => {
  return Object.entries(distanceByMonthsWithEmptyMonths.value).map(
    ([key, value]) => {
      const distances = value.map(({ distance }) => distance);

      return { name: key, data: distances };
    }
  );
});

const yDistance = (e: number) => {
  return (e / 1000).toFixed(0);
};
</script>
