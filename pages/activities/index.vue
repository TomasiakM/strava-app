<template>
  <div class="p-2">
    <DataContainer
      :is-loading="isLoading"
      :is-error="isError"
      @refresh="fetchAllActivities()"
    >
      <div class="grid grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 mb-4">
        <ActivityItem
          v-for="activity in pagedActivities"
          :key="activity.stravaId"
          :activity="activity"
        />
      </div>

      <div class="flex justify-center">
        <Pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :items="activities.length"
          @change-page="onPageChange"
        />
      </div>
    </DataContainer>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const page = Number(route.query.page);
const currentPage = ref(page < 1 ? 1 : page || 1);
const pageSize = ref(12);

const { isLoading, isError, activities } = storeToRefs(useActivitiesStore());

const { fetchAllActivities } = useActivitiesStore();
watch(
  () => activities.value,
  () => {
    if (isLoading.value || isError.value) {
      return;
    }

    const pages = Math.ceil(activities.value.length / pageSize.value);
    if (page > pages) {
      currentPage.value = pages;
      return router.replace({ query: { page: pages } });
    }

    if (page <= 1) {
      return router.replace({ query: { page: undefined } });
    }
  }
);

const pagedActivities = computed(() =>
  activities.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
);

const onPageChange = (page: number) => {
  currentPage.value = page;

  if (page !== 1) {
    router.push({ query: { page } });
  } else {
    router.push({ query: { page: undefined } });
  }
};
</script>
