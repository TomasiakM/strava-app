<template>
  <div class="flex flex-col items-center rounded bg-white shadow p-3">
    <div class="icon mb-2">
      <slot name="icon" />
    </div>
    <div class="text-center font-semibold text-lg my-auto">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.icon {
  :deep(svg) {
    @apply w-10 h-10 text-secondary;
  }
}
</style>
