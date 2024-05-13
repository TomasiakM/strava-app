<template>
  <LPolygon
    ref="polygon"
    :lat-lngs="latLngs"
    :weight="3"
    :color="'#1679AB'"
    :fill="false"
    :interactive="false"
  />
</template>

<script lang="ts" setup>
interface IProps {
  latLngs: L.LatLngExpression[];
}

defineProps<IProps>();

const polygon = ref();

nextTick(() => {
  const polygonObject: L.Polygon | null = polygon.value?.leafletObject;

  if (polygonObject) {
    polygonObject.bringToFront();
  }
});
</script>
