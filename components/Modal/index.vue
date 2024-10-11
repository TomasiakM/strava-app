<template>
  <div
    class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/25 z-[99999]"
  >
    <div class="absolute w-full h-full" @click="emits('close')"></div>
    <div
      class="rounded shadow bg-white min-w-[250px] max-w-[500px] w-full z-10"
    >
      <div class="flex justify-between items-center p-2">
        <div class="font-semibold text-primary text-xl">
          <slot name="header" />
        </div>

        <button
          class="rounded-full border border-transparent hover:border-secondary duration-200 hover:text-secondary"
          @click="emits('close')"
        >
          <SvgClose class="w-6 h-6" />
        </button>
      </div>
      <div class="p-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IEmits {
  (e: "close"): void;
}
const emits = defineEmits<IEmits>();
</script>
