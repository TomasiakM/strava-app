<template>
  <div>
    <DataContainer
      :is-loading="isLoading"
      :is-error="isError"
      @refresh="fetchAllActivities()"
    >
      <div class="w-full" v-if="activity">
        <div class="aspect-[16/4]">
          <LeafletStaticMap :polyline="activity.polyline" />
        </div>
        <div class="p-2">
          <div class="flex items-center gap-2 mb-3">
            <div>
              {{ activity.sportType }}
            </div>
            <div>
              <h3 class="text-lg md:text-xl text-secondary font-semibold">
                {{ activity.name }}
              </h3>
              <div class="text-sm text-gray-600">
                {{ new Date(activity.startDateLocal).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DataContainer>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const { isLoading, isError, activities } = storeToRefs(useActivitiesStore());
const { fetchAllActivities } = useActivitiesStore();

const activity = computed(() => {
  if (isLoading.value || isError.value) {
    return null;
  }

  const id = Number(route.params.id);
  if (Number.isNaN(id)) {
    router.replace("/404");
    return null;
  }

  const act = activities.value.find((e) => e.stravaId == id);
  if (act === null) {
    router.replace("/404");
    return null;
  }

  return act;
});
</script>
