<template>
  <l-control position="topright">
    <div class="flex justify-end mb-2">
      <button
        @click="isOpen = !isOpen"
        class="bg-secondary rounded shadow text-white p-1"
      >
        <SvgSettings class="w-4 h-4" />
      </button>
    </div>

    <div v-if="isOpen">
      <div class="bg-background rounded p-2 shadow min-w-[150px]">
        <div class="grid grid-cols-1 gap-2">
          <button
            @click="toggleMapActivities"
            class="rounded px-2 py-1 bg-primary text-white"
          >
            Aktywności - {{ mapSettings.showActivities ? "ON" : "OFF" }}
          </button>
          <button
            @click="toggleMapGrid"
            class="rounded px-2 py-1 bg-primary text-white"
          >
            Siatka - {{ mapSettings.showGrid ? "ON" : "OFF" }}
          </button>
          <button
            @click="toggleMapTiles"
            class="rounded px-2 py-1 bg-primary text-white"
          >
            Kwadraty - {{ mapSettings.showTiles ? "ON" : "OFF" }}
          </button>
        </div>
      </div>
    </div>
  </l-control>
</template>

<script lang="ts" setup>
const { map: mapSettings } = storeToRefs(useSettingsStore());

const { toggleMapActivities, toggleMapGrid, toggleMapTiles } =
  useSettingsStore();
const isOpen = ref(false);
</script>
