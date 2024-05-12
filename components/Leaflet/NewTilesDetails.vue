<template>
  <LControl
    position="topright"
    class="rounded bg-white m-2 p-2 text-xs"
    v-if="activityTiles"
  >
    <div
      v-if="activityTiles.newTiles.length"
      class="flex items-center justify-between"
    >
      <div class="mr-2">New tiles:</div>
      <div class="font-semibold">+{{ activityTiles.newTiles.length }}</div>
    </div>
    <div
      v-if="activityTiles.newClusterTiles.length"
      class="flex items-center justify-between"
    >
      <div class="mr-2">New cluster tiles:</div>
      <div class="font-semibold">
        +{{ activityTiles.newClusterTiles.length }}
      </div>
    </div>
    <div
      v-if="activityTiles.newSquare"
      class="flex items-center justify-between"
    >
      <div class="mr-2">New square size:</div>
      <div class="font-semibold">+{{ activityTiles.newSquare }}</div>
    </div>
  </LControl>
</template>

<script lang="ts" setup>
interface IProps {
  activityId: number;
}

const props = defineProps<IProps>();

const { activitiesTiles } = storeToRefs(useTilesStore());

const activityTiles = computed(() =>
  activitiesTiles.value.find((e) => e.stravaActivityId === props.activityId)
);
</script>
