<template>
  <div v-if="isLoading" class="flex justify-center my-4">
    <Spinner />
  </div>
  <div v-else-if="isError" class="flex flex-col justify-center items-center">
    <div class="text-danger text-lg font-semibold">
      Coś poszło nie tak spróbój ponownie
    </div>
    <button
      @click="$emit('refresh')"
      class="text-white bg-danger rounded px-2 py-1"
    >
      Spróbuj pownonie
    </button>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  isLoading: boolean;
  isError: boolean;
}

interface IEmits {
  (e: "refresh"): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>
