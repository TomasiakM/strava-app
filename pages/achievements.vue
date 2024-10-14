<template>
  <div class="p-2 grid grid-cols-1 gap-2">
    <h3 class="text-xl text-primary font-semibold mb-2">Osiągnięcia</h3>
    <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2"
    >
      <AchievementItem
        v-for="achievement in sortedAchievemetns"
        :key="achievement.achievementType"
        :achievement="achievement"
        class="cursor-pointer"
        @click="selectedAchievement = achievement"
      />
    </div>

    <Modal v-if="selectedAchievement" @close="selectedAchievement = null">
      <template #header>{{ selectedAchievement.achievementType }} </template>

      <AchievementModalBody :achievement="selectedAchievement" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import type { IAchievement } from "@/types/services/achievements";

const { achievements } = storeToRefs(useAchievementsStore());

const selectedAchievement = ref(null as IAchievement | null);

const sortedAchievemetns = computed(() => {
  return achievements.value.sort((a, b) => {
    if (
      (a.currentLevel === a.thresholds.length &&
        b.currentLevel === b.thresholds.length) ||
      (a.currentLevel === 0 && b.currentLevel === 0)
    ) {
      return b.thresholds.length - a.thresholds.length;
    }

    return (
      b.currentLevel / b.thresholds.length -
      a.currentLevel / a.thresholds.length
    );
  });
});
</script>
