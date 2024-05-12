<template>
  <LMap
    ref="map"
    :zoom="4"
    :max-zoom="13"
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
      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
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

    <LeafletPolylineGridLine v-for="line in tilesGrid" :lat-lngs="line" />

    <slot />
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

const zoom = ref(4);
const bounds = ref<L.LatLngBounds>();

const {
  public: { primaryPolyline },
} = useRuntimeConfig();

const latLngs = computed(() => {
  return decode(props.polyline);
});

const tilesGrid = useTileGrid(bounds, zoom);

const onReady = () => {
  const b = (polyline.value.leafletObject as L.Polyline).getBounds();
  (map.value?.leafletObject as L.Map).fitBounds(b);

  bounds.value = (map.value?.leafletObject as L.Map).getBounds();
  zoom.value = (map.value?.leafletObject as L.Map).getZoom();
};
</script>
