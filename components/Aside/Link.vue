<template>
  <NuxtLink
    :to="to"
    class="px-4 py-1 font-semibold hover:bg-black/10 duration-200 flex gap-2 items-center"
    active-class="bg-black/25 pointer-events-none"
  >
    <slot> Empty link </slot>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

interface IProps {
  to: RouteLocationRaw;
}
defineProps<IProps>();
</script>
