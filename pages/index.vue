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
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        layer-type="base"
        name="OpenStreetMap"
      />
      <LeafletPolyline
        v-for="activity in activities"
        :key="activity.stravaId"
        :activity="activity"
        @selected-polyline="bounds => (map.leafletObject as L.Map).fitBounds(bounds)"
      />

      <LeafletUnlockedTile
        v-for="tile in getMainTiles.tilesWithoutClusters"
        :tile="tile"
      />

      <LeafletClusterTile v-for="tile in getMainTiles.clusters" :tile="tile" />

      <LeafletSquareBox :lat-lngs="getMainTiles.squareBox" />

      <LeafletPolylineGridLine v-for="line in tilesGrid" :lat-lngs="line" />
    </LMap>
  </div>
</template>

<script lang="ts" setup>
const { activities } = storeToRefs(useActivitiesStore());
const { getMainTiles } = storeToRefs(useTilesStore());

const map = ref<any>();

const zoom = ref(5);
const center = ref<L.PointExpression>([47.31981, 15.95214]);
const bounds = ref<L.LatLngBounds>();

const tilesGrid = useTileGrid(bounds, zoom);

const onMapReady = () => {
  bounds.value = (map.value.leafletObject as L.Map).getBounds();
};
</script>
