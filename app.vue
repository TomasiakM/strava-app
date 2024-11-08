<template>
  <NuxtLayout />
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const activitiesStore = useActivitiesStore();
const tilesStore = useTilesStore();
const achievementStore = useAchievementsStore();
const settingsStore = useSettingsStore();

const initStores = () => {
  if (userStore.isAuthenticated) {
    activitiesStore.fetchAllActivities();
    tilesStore.fetchAllActivitiesTiles();
    achievementStore.fetchAllAchievements();
    settingsStore.init();
  }
};

onMounted(() => {
  nextTick(() => initStores());
});

watch(
  () => userStore.isAuthenticated,
  () => {
    if (userStore.isAuthenticated) {
      initStores();
    }
  }
);
</script>
