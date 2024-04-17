<template>
  <div class="min-h-screen grid grid-cols-12">
    <aside
      class="bg-primary text-white col-span-2 flex flex-col justify-between"
    >
      <NuxtLink to="/">
        <div class="p-2 font-semibold text-2xl">Logo</div>
      </NuxtLink>
      <div class="grid">
        <AsideLink to="/">
          <SvgGlobe class="w-6 h-6" />
          <div>Mapa</div>
        </AsideLink>

        <AsideLink to="/activities">
          <SvgFolder class="w-6 h-6" />
          <div>Aktywności</div>
        </AsideLink>
      </div>
      <div class="p-1 flex justify-center bg-white">
        <NuxtLink to="https://strava.com">
          <SvgPowerByStrava />
        </NuxtLink>
      </div>
    </aside>
    <main class="col-span-10">
      <NuxtPage />
    </main>
  </div>
</template>
