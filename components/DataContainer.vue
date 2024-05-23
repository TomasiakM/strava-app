<template>
  <div
    v-if="isActivityStoreLoading || isTilesStoreLoading"
    class="flex justify-center my-4"
  >
    <Spinner />
  </div>
  <div
    v-else-if="isActivityStoreError || isTilesStoreError"
    class="flex flex-col items-center"
  >
    <div class="text-danger text-lg font-semibold">
      Coś poszło nie tak spróbój ponownie
    </div>
    <button
      @click="refreshStores()"
      class="text-white bg-danger rounded px-2 py-1"
    >
      Spróbuj pownonie
    </button>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { isLoading: isActivityStoreLoading, isError: isActivityStoreError } =
  storeToRefs(useActivitiesStore());
const { isLoading: isTilesStoreLoading, isError: isTilesStoreError } =
  storeToRefs(useTilesStore());

const refreshStores = () => {
  if (!isActivityStoreLoading && isActivityStoreError) {
    const activitiesStore = useActivitiesStore();

    activitiesStore.fetchAllActivities();
  }

  if (!isTilesStoreLoading && isTilesStoreError) {
    const tilesStore = useTilesStore();

    tilesStore.fetchAllActivitiesTiles();
  }
};
</script>
