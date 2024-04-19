<template>
  <div class="p-2">
    <DataContainer :is-loading="isLoading" :is-error="isError">
      <div class="mb-3 text-2xl font-semibold text-primary drop-shadow-sm">
        Posiadasz {{ activities.length }} aktywności
      </div>
      <div class="grid grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4">
        <ActivityItem
          v-for="activity in activities"
          :key="activity.stravaId"
          :activity="activity"
        />
      </div>
    </DataContainer>
  </div>
</template>

<script lang="ts" setup>
const { isLoading, isError, activities } = storeToRefs(useActivitiesStore());

const { fetchAllActivities } = useActivitiesStore();
</script>
