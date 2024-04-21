<template>
  <div class="grid gap-2 grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
    <ActivityStatisticItem>
      <template #icon>
        <SvgDistance />
      </template>

      <div title="Dystans">{{ (activity.distance / 1000).toFixed(2) }} km</div>
    </ActivityStatisticItem>

    <ActivityStatisticItem>
      <template #icon>
        <SvgTime />
      </template>

      <div title="Czas poruszania">{{ getTime(activity.movingTime) }}</div>
      <div title="Czas całkowity" class="text-xs text-gray-600 font-semibold">
        {{ getTime(activity.elapsedTime) }}
      </div>
    </ActivityStatisticItem>

    <ActivityStatisticItem>
      <template #icon>
        <SvgSpeed />
      </template>

      <div title="Średnia prędkość">
        {{ (activity.averageSpeed * 3.6).toFixed(2) }} km/h
      </div>
      <div
        title="Maksymalna prędkość"
        class="text-xs text-gray-600 font-semibold"
      >
        {{ (activity.maxSpeed * 3.6).toFixed(2) }} km/h
      </div>
    </ActivityStatisticItem>

    <ActivityStatisticItem>
      <template #icon>
        <SvgElevation />
      </template>

      <div title="Elewacja">{{ activity.totalElevationGain }} m</div>
    </ActivityStatisticItem>

    <ActivityStatisticItem v-if="activity.averageCadence">
      <template #icon>
        <SvgCadence />
      </template>

      <div title="Średnia kadencja">{{ activity.averageCadence }} / min</div>
    </ActivityStatisticItem>

    <ActivityStatisticItem v-if="activity.hasHeartrate">
      <template #icon>
        <SvgHeartrate />
      </template>

      <div title="Średnie tętno">{{ activity.averageHeartrate }} / min</div>
      <div title="Maksymalne tętno" class="text-xs text-gray-600 font-semibold">
        {{ activity.maxHeartrate }} / min
      </div>
    </ActivityStatisticItem>

    <ActivityStatisticItem v-if="activity.deviceWatts">
      <template #icon>
        <SvgHeartrate />
      </template>

      <div title="Śrenia moc">{{ activity.averageWatts }} W</div>
      <div title="Maksymalna moc" class="text-xs text-gray-600 font-semibold">
        {{ activity.maxWatts }} W
      </div>
    </ActivityStatisticItem>

    <ActivityStatisticItem>
      <template #icon>
        <SvgFire />
      </template>
      <div title="Kalorie">{{ activity.calories }} cal</div>
    </ActivityStatisticItem>

    <ActivityStatisticItem v-if="activity.kilojoules">
      <template #icon>
        <SvgFire />
      </template>
      <div title="Kilodżule">{{ activity.kilojoules }} kJ</div>
    </ActivityStatisticItem>
  </div>
</template>

<script lang="ts" setup>
import type { IActivity } from "@/types/services/activities";

interface IProps {
  activity: IActivity;
}

defineProps<IProps>();

const getTime = (time: number) => {
  const hours = Math.floor(time / (60 * 60));
  let rest = time % (60 * 60);

  const min = Math.floor(rest / 60);
  rest = rest % 60;

  const sec = rest;
  return `${hours < 10 ? `0${hours}` : hours}:${min < 10 ? `0${min}` : min}:${
    sec < 10 ? `0${sec}` : sec
  }`;
};
</script>
