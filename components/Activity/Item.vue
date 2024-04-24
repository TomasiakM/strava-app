<template>
  <div class="bg-white rounded overflow-hidden shadow">
    <div class="aspect-video">
      <LeafletStaticMap :polyline="activity.polyline" />
    </div>
    <div class="p-2 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div class="hidden md:block">{{ activity.sportType }}</div>

        <div>
          <NuxtLink
            :to="`/activities/${activity.stravaId}`"
            class="lg:text-lg font-semibold text-secondary"
          >
            {{ activity.name }}
          </NuxtLink>
          <div class="font-semibold text-xs text-gray-600">
            {{ useDate(activity.startDateLocal).date }}
          </div>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-2">
        <div class="font-semibold" v-if="activity.distance">
          {{ useDistance(activity.distance) }} km
        </div>
        <div class="flex flex-col items-end" v-else>
          <div class="font-semibold">
            {{ useDuration(activity.movingTime) }}
          </div>
          <div
            v-if="activity.movingTime !== activity.elapsedTime"
            class="font-semibold text-xs text-gray-600"
          >
            ({{ useDuration(activity.elapsedTime) }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IActivity } from "@/types/services/activities";

interface IProps {
  activity: IActivity;
}

defineProps<IProps>();
</script>
