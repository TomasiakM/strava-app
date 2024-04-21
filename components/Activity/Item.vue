<template>
  <div class="bg-white rounded overflow-hidden shadow">
    <div class="aspect-video">
      <LeafletStaticMap :polyline="activity.polyline" />
    </div>
    <div class="p-2 flex justify-between">
      <div>
        <NuxtLink
          :to="`/activities/${activity.stravaId}`"
          class="lg:text-lg font-semibold text-secondary"
        >
          {{ activity.name }}
        </NuxtLink>
        <div class="flex items-center gap-2">
          <div>{{ activity.sportType }}</div>
          <div class="font-semibold">
            {{ useDistance(activity.distance) }} km
          </div>
        </div>
      </div>
      <div class="hidden md:flex flex-col items-end">
        <div class="font-semibold">
          {{ useDuration(activity.movingTime) }}
        </div>
        <div class="font-semibold text-sm text-gray-600">
          ({{ useDuration(activity.elapsedTime) }})
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
