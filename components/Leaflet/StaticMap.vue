<template>
  <LMap
    ref="map"
    :zoom="2"
    :center="[0, 0]"
    :options="{
      attributionControl: false,
      zoomControl: false,
      doubleClickZoom: false,
      dragging: false,
      scrollWheelZoom: false,
    }"
    @ready="onReady"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />
    <LPolyline
      ref="polyline"
      :lat-lngs="latLngs"
      :color="primaryPolyline"
      :weight="3"
      :interactive="false"
    />
  </LMap>
</template>

<script lang="ts" setup>
import { decode } from "@googlemaps/polyline-codec";

interface IProps {
  polyline: string;
}

const props = defineProps<IProps>();

const map = ref();
const polyline = ref();

const {
  public: { primaryPolyline },
} = useRuntimeConfig();

const latLngs = computed(() => {
  return decode(props.polyline);
});

const onReady = () => {
  const bounds = (polyline.value?.leafletObject as L.Polyline).getBounds();
  (map.value?.leafletObject as L.Map).fitBounds(bounds);
};
</script>
