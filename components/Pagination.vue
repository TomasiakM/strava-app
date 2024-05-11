<template>
  <div class="flex items-center gap-1" v-if="totalPages > 1">
    <button @click="prevPage" :class="{ disabled: !hasPrevPage }">
      <SvgChevron class="w-5 h-5 rotate-180" />
    </button>

    <div v-if="!pageButtons.includes(1)" class="flex items-center gap-1">
      <button @click="setPage(1)">
        {{ 1 }}
      </button>

      <span>...</span>
    </div>

    <button
      v-for="p in pageButtons"
      :key="p"
      :class="{ active: currentPage === p }"
      @click="setPage(p)"
    >
      {{ p }}
    </button>

    <div
      v-if="!pageButtons.includes(totalPages)"
      class="flex items-center gap-1"
    >
      <span>...</span>

      <button @click="setPage(totalPages)">
        {{ totalPages }}
      </button>
    </div>

    <button @click="nextPage" :class="{ disabled: !hasNextPage }">
      <SvgChevron class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  currentPage: number;
  items: number;
  pageSize: number;
}

interface IEmits {
  (e: "changePage", page: number): void;
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const maxPagesToShow = ref(5);

const totalPages = computed(() => Math.ceil(props.items / props.pageSize));

const hasNextPage = computed(() => {
  return props.currentPage < totalPages.value;
});

const hasPrevPage = computed(() => {
  return props.currentPage > 1;
});

const nextPage = () => {
  if (props.currentPage + 1 > totalPages.value) {
    return;
  }

  emits("changePage", props.currentPage + 1);
};

const prevPage = () => {
  if (props.currentPage - 1 < 1) {
    return;
  }

  emits("changePage", props.currentPage - 1);
};

const setPage = (page: number) => {
  if (page < 1 || page > totalPages.value) {
    return;
  }

  emits("changePage", page);
};

const pageButtons = computed(() => {
  const pages = Math.min(maxPagesToShow.value, totalPages.value);
  let firstPage = props.currentPage - Math.floor(pages / 2);
  firstPage = Math.max(firstPage, 1);
  firstPage = Math.min(firstPage, totalPages.value - pages + 1);

  return [...Array(pages)].map((_, i) => firstPage + i);
});
</script>

<style lang="postcss" scoped>
button {
  @apply w-8 h-8 flex items-center justify-center text-secondary bg-white rounded-full;
}

.active {
  @apply bg-primary text-white pointer-events-none;
}

.disabled {
  @apply text-gray-700 bg-gray-200 pointer-events-none;
}
</style>
