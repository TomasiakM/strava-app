<template>
  <NuxtLayout />
</template>

<script lang="ts" setup>
const athleteStore = useAthleteStore();
const activitiesStore = useActivitiesStore();
const tilesStore = useTilesStore();

const fetchAllNecessaryData = () => {
  if (athleteStore.isAuthenticated) {
    activitiesStore.fetchAllActivities();
    tilesStore.fetchAllActivitiesTiles();
  }
};

onMounted(() => {
  nextTick(() => fetchAllNecessaryData());
});

watch(
  () => athleteStore.isAuthenticated,
  () => {
    if (athleteStore.isAuthenticated) {
      fetchAllNecessaryData();
    }
  }
);
</script>
