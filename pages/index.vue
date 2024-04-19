<template>
  <div class="h-full">
    <LMap ref="map" :zoom="zoom" :center="[53.3439, 23.0622]">
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
    </LMap>
  </div>
</template>

<script lang="ts" setup>
const zoom = ref(4);
const { activities } = storeToRefs(useActivitiesStore());

const map = ref<any>();
</script>
