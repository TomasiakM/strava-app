<template>
  <div
    v-if="activities.length"
    class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1"
  >
    <StatisticsPersonalBestsItem>
      <div>Aktywności</div>

      <template #body>
        {{ totalActivities }}
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxActivitiesSportType">
      <div>Najczęstszy typ aktywności</div>

      <template #body>
        {{ maxActivitiesSportType.sportType }} -
        {{ maxActivitiesSportType.size }}
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="bestYear">
      <div>Najlepszy rok</div>

      <template #body>
        {{ bestYear.year }} - {{ useDistance(bestYear.distance) }} km
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="bestMonth">
      <div>Najlepszy miesiąc</div>

      <template #body>
        {{ bestMonth.date }} - {{ useDistance(bestMonth.distance) }} km
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxActivityDistance">
      <div>Najdłuższa aktywność</div>

      <template #body>
        <NuxtLink
          :to="`activities/${maxActivityDistance.stravaId}`"
          class="hover:underline text-secondary"
        >
          {{ maxActivityDistance.name }}
        </NuxtLink>
        - {{ useDistance(maxActivityDistance.distance) }} km
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxActivityMovingTime">
      <div>Najdłuższa aktywność</div>

      <template #body>
        <NuxtLink
          :to="`activities/${maxActivityMovingTime.stravaId}`"
          class="hover:underline text-secondary"
        >
          {{ maxActivityMovingTime.name }}
        </NuxtLink>
        - {{ useDuration(maxActivityMovingTime.movingTime) }}
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxActivitySpeed">
      <div>Najszybsza aktywność</div>

      <template #body>
        <NuxtLink
          :to="`activities/${maxActivitySpeed.stravaId}`"
          class="hover:underline text-secondary"
        >
          {{ maxActivitySpeed.name }}
        </NuxtLink>
        - {{ useSpeed(maxActivitySpeed.averageSpeed) }} km/h
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxActivityTiles.activity">
      <div>Najwięcej odwiedzonych kwadratów</div>

      <template #body>
        <NuxtLink
          :to="`activities/${maxActivityTiles.activity.stravaId}`"
          class="hover:underline text-secondary"
        >
          {{ maxActivityTiles.activity.name }}
        </NuxtLink>
        - {{ maxActivityTiles.size }}
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxActivityNewTiles.activity">
      <div>Najwięcej nowych kwadratów</div>

      <template #body>
        <NuxtLink
          :to="`activities/${maxActivityNewTiles.activity.stravaId}`"
          class="hover:underline text-secondary"
        >
          {{ maxActivityNewTiles.activity.name }}
        </NuxtLink>
        - {{ maxActivityNewTiles.size }}
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxActivityNewClusters.activity">
      <div>Najwięcej nowych klastrów</div>

      <template #body>
        <NuxtLink
          :to="`activities/${maxActivityNewClusters.activity.stravaId}`"
          class="hover:underline text-secondary"
        >
          {{ maxActivityNewClusters.activity.name }}
        </NuxtLink>
        - {{ maxActivityNewClusters.size }}
      </template>
    </StatisticsPersonalBestsItem>
  </div>
</template>

<script lang="ts" setup>
import type { IActivity } from "@/types/services/activities";
import type { ITileDetails } from "@/types/services/tiles";

const { activities } = storeToRefs(useActivitiesStore());
const { activitiesTiles } = storeToRefs(useTilesStore());

const totalActivities = computed(() => activities.value.length);

const bestMonth = computed(() => {
  const activitiesByMonth = activities.value.reduce((prev, curr) => {
    const date = new Date(curr.startDate);
    const month = `${date.getMonth()}/${date.getFullYear()}`;

    if (!prev[month]) {
      prev[month] = [];
    }

    prev[month] = [...prev[month], curr];

    return prev;
  }, {} as { [key: string]: IActivity[] });

  const activitiesMonthStats = Object.entries(activitiesByMonth).map(
    ([_, monthlyActivities]) => {
      const distance = monthlyActivities.reduce((prev, curr) => {
        return prev + curr.distance;
      }, 0);

      const date = new Date(monthlyActivities[0].startDate);
      let month: number | string = date.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      const stringDate = `${month}/${date.getFullYear()}`;

      return { distance, date: stringDate };
    }
  );

  return activitiesMonthStats.reduce((prev, curr) => {
    if (!prev || curr.distance > prev.distance) {
      return curr;
    }

    return prev;
  }, null as { distance: number; date: string } | null);
});

const bestYear = computed(() => {
  const activitiesByYear = activities.value.reduce((prev, curr) => {
    const date = new Date(curr.startDate);
    const year = date.getFullYear();

    if (!prev[year]) {
      prev[year] = [];
    }

    prev[year] = [...prev[year], curr];

    return prev;
  }, {} as { [key: string]: IActivity[] });

  const activitiesYearStats = Object.entries(activitiesByYear).map(
    ([_, yearlyActivities]) => {
      const distance = yearlyActivities.reduce((prev, curr) => {
        return prev + curr.distance;
      }, 0);

      const year = new Date(yearlyActivities[0].startDate).getFullYear();

      return { distance, year };
    }
  );

  return activitiesYearStats.reduce((prev, curr) => {
    if (!prev || curr.distance > prev.distance) {
      return curr;
    }

    return prev;
  }, null as { distance: number; year: number } | null);
});

const maxActivityDistance = computed(() => {
  return activities.value.reduce((prev, curr) => {
    if (!prev || curr.distance > prev.distance) {
      return curr;
    }

    return prev;
  }, null as IActivity | null);
});

const maxActivitySpeed = computed(() => {
  return activities.value.reduce((prev, curr) => {
    if (!prev || curr.averageSpeed > prev.averageSpeed) {
      return curr;
    }

    return prev;
  }, null as IActivity | null);
});

const maxActivityMovingTime = computed(() => {
  return activities.value.reduce((prev, curr) => {
    if (!prev || curr.movingTime > prev.movingTime) {
      return curr;
    }

    return prev;
  }, null as IActivity | null);
});

const maxActivitiesSportType = computed(() => {
  const groupedActivities = activities.value.reduce((prev, curr) => {
    if (!prev[curr.sportType]) {
      prev[curr.sportType] = [];
    }

    prev[curr.sportType] = [...prev[curr.sportType], curr];

    return prev;
  }, {} as { [key: string]: IActivity[] });

  return Object.entries(groupedActivities).reduce((prev, curr) => {
    if (!prev || curr[1].length > prev.size) {
      return { size: curr[1].length, sportType: curr[1][0].sportType };
    }

    return prev;
  }, null as { size: number; sportType: string } | null);
});

const maxActivityTiles = computed(() => {
  const maxActivityTiles = activitiesTiles.value.reduce((prev, curr) => {
    if (!prev || curr.tiles.length > prev.tiles.length) {
      return curr;
    }

    return prev;
  }, null as ITileDetails | null);

  const activity = activities.value.find(
    (e) => e.stravaId == maxActivityTiles?.stravaActivityId
  );

  return { size: maxActivityTiles?.tiles.length || 0, activity };
});

const maxActivityNewTiles = computed(() => {
  const maxActivityNewTiles = activitiesTiles.value.reduce((prev, curr) => {
    if (!prev || curr.newTiles.length > prev.newTiles.length) {
      return curr;
    }

    return prev;
  }, null as ITileDetails | null);

  const activity = activities.value.find(
    (e) => e.stravaId == maxActivityNewTiles?.stravaActivityId
  );

  return { size: maxActivityNewTiles?.newTiles.length || 0, activity };
});

const maxActivityNewClusters = computed(() => {
  const maxActivityNewClusters = activitiesTiles.value.reduce((prev, curr) => {
    if (!prev || curr.newClusterTiles.length > prev.newClusterTiles.length) {
      return curr;
    }

    return prev;
  }, null as ITileDetails | null);

  const activity = activities.value.find(
    (e) => e.stravaId == maxActivityNewClusters?.stravaActivityId
  );

  return {
    size: maxActivityNewClusters?.newClusterTiles.length || 0,
    activity,
  };
});
</script>
