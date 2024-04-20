<template>
  <div class="bg-white rounded overflow-hidden shadow">
    <div class="aspect-video">
      <LMap
        ref="map"
        :zoom="2"
        :center="[0, 0]"
        :options="{
          attributionControl: false,
          zoomControl: false,
          doubleClickZoom: false,
          dragging: false,
          scrollWheelZoom: false,
        }"
        @ready="onReady"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />
        <LPolyline
          ref="polyline"
          :lat-lngs="latLngs"
          :color="primaryPolyline"
          :weight="3"
          :interactive="false"
        />
      </LMap>
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
            {{ getDistance(activity.distance) }} km
          </div>
        </div>
      </div>
      <div class="hidden md:flex flex-col items-end">
        <div class="font-semibold">{{ getTime(activity.movingTime) }}</div>
        <div class="font-semibold text-sm text-gray-600">
          ({{ getTime(activity.elapsedTime) }})
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { decode } from "@googlemaps/polyline-codec";
import type { IActivity } from "@/types/services/activities";

interface IProps {
  activity: IActivity;
}

const props = defineProps<IProps>();

const {
  public: { primaryPolyline },
} = useRuntimeConfig();

const map = ref();
const polyline = ref();

const latLngs = computed(() => {
  return decode(props.activity.polyline);
});

const onReady = () => {
  const bounds = (polyline.value?.leafletObject as L.Polyline).getBounds();
  (map.value?.leafletObject as L.Map).fitBounds(bounds);
};

const getDistance = (distance: number) => {
  return (distance / 1000).toFixed(2);
};

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
