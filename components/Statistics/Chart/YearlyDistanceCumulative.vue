<template>
  <Chart
    id="yearly-distance-cumulative-chart"
    title="Łączny dystans na przestrzeni roku"
    :series="series"
    :xAxisFormatter="(e: number) => useChartAxisMonth(e)"
    :yAxisFormatter="(e: number) => useChartAxisDistance(e)"
    :tooltipFormatter="(e: number) => useChartTooltipDistance(e)"
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
          data: [
            ...prev.data,
            (prev.data[prev.data.length - 1] || 0) + distance,
          ],
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
