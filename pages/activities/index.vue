<template>
  <div class="p-2">
    <DataContainer
      :is-loading="isLoading"
      :is-error="isError"
      @refresh="fetchAllActivities()"
    >
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
