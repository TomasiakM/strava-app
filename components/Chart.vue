<template>
  <ClientOnly>
    <div class="bg-white rounded shadow">
      <VueApexCharts
        v-if="series.length"
        class="m-2"
        :height="400"
        :options="options"
        :series="series"
      />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";

interface IProps {
  id: string;
  title: string;
  series: { name: string; data: number[] }[];
  xAxisFormatter?: (e: any) => string;
  yAxisFormatter?: (e: any) => string;
  tooltipFormatter?: (e: any) => string;
}

const props = defineProps<IProps>();

const options = {
  title: { text: props.title },
  chart: {
    id: props.id,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  stroke: {
    width: 2,
    curve: "monotoneCubic",
    lineCap: "round",
  },
  markers: {
    size: 4,
  },
  xaxis: {
    tooltip: {
      enabled: false,
    },
    labels: {
      formatter: props.xAxisFormatter,
    },
  },
  yaxis: {
    labels: {
      formatter: props.yAxisFormatter,
    },
  },
  tooltip: {
    inverseOrder: true,
    y: {
      formatter: props.tooltipFormatter,
    },
  },
};
</script>
