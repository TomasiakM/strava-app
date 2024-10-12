<template>
  <div class="absolute -top-2 left-1/2 -translate-x-1/2 font-semibold text-xs">
    <div
      class="rounded border border-primary px-2 py-0.5 text-nowrap"
      :class="isComplited ? 'bg-primary text-white' : 'bg-white text-primary'"
    >
      level
      {{ level + "/" + maxLevel }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  level: number;
  maxLevel: number;
  isComplited: boolean;
}

defineProps<Props>();
</script>
