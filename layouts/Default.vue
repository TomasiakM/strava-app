<template>
  <div class="h-screen grid grid-cols-12">
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
      <div class="p-1 text-center">Power by STRAVA</div>
    </aside>
    <main class="bg-background col-span-10">
      <NuxtPage />
    </main>
  </div>
</template>
