<template>
  <LPolygon
    :lat-lngs="useTileToBoxCoordinates(tile.x, tile.y, tile.z)"
    color="#379237"
    :weight="1"
    :opacity="0.15"
    :fill-opacity="0.15"
    :interactive="false"
  />
</template>

<script lang="ts" setup>
import type { ITile } from "@/types/services/tiles";

interface IProps {
  tile: ITile;
}

defineProps<IProps>();
</script>
