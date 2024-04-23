<template>
  <div class="h-full">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="center"
      @update:zoom="(e) => (zoom = e)"
      @update:center="(e) => (center = e)"
      @update:bounds="(e) => (bounds = e)"
      @ready="onMapReady"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />

      <LeafletPolyline
        v-for="activity in activities"
        :key="activity.stravaId"
        :activity="activity"
        @selected-polyline="bounds => (map.leafletObject as L.Map).fitBounds(bounds)"
      />

      <LeafletPolylineGridLine v-for="line in tilesGrid" :lat-lngs="line" />
    </LMap>
  </div>
</template>

<script lang="ts" setup>
const { activities } = storeToRefs(useActivitiesStore());

const map = ref<any>();

const zoom = ref(5);
const center = ref<L.PointExpression>([47.31981, 15.95214]);
const bounds = ref<L.LatLngBounds>();

const tilesGrid = useTileGrid(bounds, zoom);

const onMapReady = () => {
  bounds.value = (map.value.leafletObject as L.Map).getBounds();
};
</script>
