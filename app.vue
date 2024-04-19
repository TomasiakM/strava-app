<template>
  <NuxtLayout />
</template>

<script lang="ts" setup>
const athleteStore = useAthleteStore();
const activitiesStore = useActivitiesStore();

const fetchAllNecessaryData = () => {
  if (athleteStore.isAuthenticated) {
    activitiesStore.fetchAllActivities();
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
