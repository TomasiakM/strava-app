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
const { statistics } = storeToRefs(useStatisticsStore());

const series = computed(() => {
  return Object.values(statistics.value).map((obj) => {
    return Object.values(obj).reduce(
      (prev, { year, distance }) => {
        return {
          name: year.toString(),
          data: [...prev.data, distance],
        };
      },
      { name: new Date().getFullYear().toString(), data: [] } as {
        name: string;
        data: number[];
    }
  );
});
});
</script>
