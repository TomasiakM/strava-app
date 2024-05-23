<template>
  <div
    class="flex flex-col justify-center text-center bg-white p-2 rounded shadow"
  >
    <div class="text-sm font-semibold mb-2">
      <slot />
    </div>
    <div class="font-semibold">
      <slot name="body" />
    </div>
  </div>
</template>
