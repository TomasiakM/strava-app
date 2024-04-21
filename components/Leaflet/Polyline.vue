<template>
  <LPolyline
    ref="polyline"
    :lat-lngs="latLngs"
    :weight="defaultStyles.weight"
    :opacity="defaultStyles.opacity"
    :color="defaultStyles.color"
  >
    <LPopup>
      <NuxtLink
        :to="`activities/${activity.stravaId}`"
        class="inline-block !text-primary font-semibold mb-2"
      >
        {{ activity.name }}
      </NuxtLink>
      <div>
        {{ useDate(activity.startDateLocal).dateTime }}
      </div>
      <div>Dystans: {{ useDistance(activity.distance) }} km</div>
      <div>
        Średnia prędkość:
        {{ useSpeed(activity.averageSpeed) }} km/h
      </div>
      <div>Przewyższenie: {{ activity.totalElevationGain }} m</div>
    </LPopup>
  </LPolyline>
</template>

<script lang="ts" setup>
import { decode } from "@googlemaps/polyline-codec";
import type { IActivity } from "@/types/services/activities";

interface IProps {
  activity: IActivity;
}

interface IEmits {
  (e: "selected-polyline", bounds: L.LatLngBounds): void;
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const {
  public: { primaryPolyline, secondaryPolyline },
} = useRuntimeConfig();

const popupIsVisible = ref(false);
const polyline = ref<any>();

const latLngs = computed(() => decode(props.activity.polyline));

const defaultStyles = {
  color: primaryPolyline,
  weight: 2,
  opacity: 1,
};

const activeStyles = {
  color: secondaryPolyline,
  weight: 4,
  opacity: 1,
};

const hoverStyles = {
  color: primaryPolyline,
  weight: 4,
  opacity: 1,
};

nextTick(() => {
  const polylineObject: L.Polyline | null = polyline.value?.leafletObject;

  if (polylineObject) {
    polylineObject.on("mouseover", (e) => {
      if (!popupIsVisible.value) {
        e.target.setStyle(hoverStyles);
      }
      polylineObject.bringToFront();
    });

    polylineObject.on("mouseout", (e) => {
      if (!popupIsVisible.value) {
        polylineObject.bringToBack();
        e.target.setStyle(defaultStyles);
      }
    });

    polylineObject.on("popupopen", (e) => {
      popupIsVisible.value = true;
      polylineObject.bringToFront();

      e.target.setStyle(activeStyles);

      emits("selected-polyline", polylineObject.getBounds());
    });

    polylineObject.on("popupclose", (e) => {
      popupIsVisible.value = false;
      e.target.setStyle(defaultStyles);
    });
  }
});
</script>
