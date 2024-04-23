<template>
  <LPolyline
    :lat-lngs="latLngs"
    color="gray"
    :opacity="0.3"
    :weight="1"
    :interactive="false"
  />
</template>

<script lang="ts" setup>
interface IProps {
  latLngs: L.LatLngExpression[];
}

defineProps<IProps>();
</script>
