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
        {{ maxActivitiesSportType.count }}
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxYearlyDistance">
      <div>Najlepszy rok</div>

      <template #body>
        {{ maxYearlyDistance.year }} -
        {{ useDistance(maxYearlyDistance.distance) }} km
      </template>
    </StatisticsPersonalBestsItem>
    <StatisticsPersonalBestsItem v-if="maxMonthlyDistance">
      <div>Najlepszy miesiąc</div>

      <template #body>
        {{ maxMonthlyDistance.date }} -
        {{ useDistance(maxMonthlyDistance.distance) }} km
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
const { activities } = storeToRefs(useActivitiesStore());

const totalActivities = computed(() => activities.value.length);

const maxYearlyDistance = useMaxYearlyDistance();
const maxMonthlyDistance = useMaxMonthlyDistance();

const maxActivitySpeed = useMaxSpeed();
const maxActivityDistance = useMaxDistance();
const maxActivityMovingTime = useMaxMovingTime();
const maxActivitiesSportType = useMaxSportType();

const maxActivityTiles = useMaxTiles();
const maxActivityNewTiles = useMaxNewTiles();
const maxActivityNewClusters = useMaxNewClusters();
</script>
