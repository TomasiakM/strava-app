<template>
  <NuxtLayout />
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const activitiesStore = useActivitiesStore();
const tilesStore = useTilesStore();
const achievementStore = useAchievementsStore();

const fetchAllNecessaryData = () => {
  if (userStore.isAuthenticated) {
    activitiesStore.fetchAllActivities();
    tilesStore.fetchAllActivitiesTiles();
    achievementStore.fetchAllAchievements();
  }
};

onMounted(() => {
  nextTick(() => fetchAllNecessaryData());
});

watch(
  () => userStore.isAuthenticated,
  () => {
    if (userStore.isAuthenticated) {
      fetchAllNecessaryData();
    }
  }
);
</script>
