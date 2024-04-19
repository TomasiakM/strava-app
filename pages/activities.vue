<template>
  <div>
    <div
      v-if="data"
      class="p-2 text-2xl font-semibold text-primary drop-shadow-sm"
    >
      Posiadasz {{ data.length }} aktywności
    </div>
    <div class="p-2 grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4">
      <ActivityItem
        v-for="activity in data"
        :key="activity.stravaId"
        :activity="activity"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useActivitiesService from "@/requests/activities";

const athleteService = useActivitiesService();

const { data, execute } = useAsyncData(() => athleteService.getAll(), {
  server: false,
});
</script>
