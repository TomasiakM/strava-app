<template>
  <div>
    <DataContainer
      :is-loading="isLoading"
      :is-error="isError"
      @refresh="fetchAllActivities()"
    >
      <div class="w-full" v-if="activity">
        <div class="aspect-[16/6]">
          <LeafletStaticMap :polyline="activity.polyline">
            <LeafletUnlockedTile
              v-for="tile in getNewTilesWithoutNewClusterAndSquareTiles(
                activity.stravaId
              )"
              :tile="tile"
            />

            <LeafletSquareTile
              v-for="tile in getActivityNewSquareTiles(activity.stravaId)"
              :tile="tile"
            />

            <LeafletClusterTile
              v-for="tile in getNewTilesWithoutNewSquareTiles(
                activity.stravaId
              )"
              :tile="tile"
            />

            <LeafletNewTilesDetails
              :activity-id="activity.stravaId"
              size="big"
            />
          </LeafletStaticMap>
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
                {{ useDate(activity.startDateLocal).dateTime }}
              </div>
            </div>
          </div>

          <ActivityStatisticList :activity="activity" />
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

const {
  getActivityNewSquareTiles,
  getNewTilesWithoutNewClusterAndSquareTiles,
  getNewTilesWithoutNewSquareTiles,
} = storeToRefs(useTilesStore());

const activity = computed(() => {
  if (isLoading.value || isError.value) {
    return null;
  }

  const id = Number(route.params.id);
  if (Number.isNaN(id)) {
    router.replace("/");
    return null;
  }

  const act = activities.value.find((e) => e.stravaId == id);
  if (!act) {
    router.replace("/");
    return null;
  }

  return act;
});
</script>
