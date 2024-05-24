<template>
  <div>
    <aside
      class="fixed top-0 right-full md:right-auto md:left-0 z-[99999] h-screen w-[250px] md:w-[25%] xl:w-[16.6666%]"
    >
      <div
        class="md:sticky bg-primary text-white h-full flex flex-col justify-between duration-300"
        :class="
          isOpen ? ' translate-x-full' : ' translate-x-0 md:translate-x-0'
        "
      >
        <div class="absolute md:hidden left-full top-1/2 -translate-y-1/2">
          <button
            class="z-[99999] bg-secondary w-6 h-10 flex justify-center items-center rounded-r-full"
            @click="isOpen = !isOpen"
          >
            <SvgChevron
              class="w-5 h-5 mr-1 duration-100"
              :class="isOpen ? 'rotate-180' : 'rotate-0'"
            />
          </button>
        </div>
        <NuxtLink to="/">
          <div class="p-2 font-semibold text-2xl">Logo</div>
        </NuxtLink>
        <div>
          <div v-if="athlete" class="px-4 mb-6 flex items-center gap-2">
            <img
              :src="athlete.profileMedium"
              :alt="athlete.username"
              class="rounded-full"
            />
            <div class="font-semibold">
              <div>{{ athlete.firstname }} {{ athlete.lastname }}</div>
            </div>
          </div>
          <div class="grid mb-32">
            <AsideLink to="/">
              <SvgGlobe class="w-6 h-6" />
              <div>Mapa</div>
            </AsideLink>

            <AsideLink to="/activities">
              <SvgFolder class="w-6 h-6" />
              <div>Aktywności</div>
            </AsideLink>

            <AsideLink to="/statistics">
              <SvgStatistics class="w-6 h-6" />
              <div>Statystyki</div>
            </AsideLink>
          </div>
        </div>
        <div class="p-1 flex justify-center bg-white">
          <NuxtLink to="https://strava.com">
            <SvgPowerByStrava />
          </NuxtLink>
        </div>
      </div>
    </aside>
    <div class="z-40 grid grid-cols-12 min-h-screen">
      <div class="hidden md:block md:col-span-3 xl:col-span-2"></div>
      <main class="col-span-12 md:col-span-9 xl:col-span-10">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { athlete } = storeToRefs(useUserStore());

const isOpen = ref(false);

watch(
  () => route.path,
  () => {
    isOpen.value = false;
  }
);
</script>
