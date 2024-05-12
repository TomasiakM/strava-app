<template>
  <LControl
    position="topright"
    class="rounded bg-white m-2 p-2"
    :class="size === 'small' ? 'text-xs p-1' : 'text-base px-4 py-2'"
    v-if="activityTiles && activityTiles.newTiles.length"
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
  size?: "small" | "big";
}

const props = withDefaults(defineProps<IProps>(), {
  size: "small",
});

const { activitiesTiles } = storeToRefs(useTilesStore());

const activityTiles = computed(() =>
  activitiesTiles.value.find((e) => e.stravaActivityId === props.activityId)
);
</script>
