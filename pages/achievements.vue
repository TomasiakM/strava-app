<template>
  <div class="p-2 grid grid-cols-1 gap-2">
    <h3 class="text-xl text-primary font-semibold mb-2">Osiągnięcia</h3>
    <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2"
    >
      <div
        v-for="achievement in achievements"
        :key="achievement.achievementType"
      >
        <div
          class="rounded shadow text-center relative"
          :class="achievement.currentLevel !== 0 ? 'bg-white' : 'bg-black/5'"
        >
          <AchievementLevelBadge
            :level="achievement.currentLevel"
            :max-level="achievement.thresholds.length"
          />
          <div class="p-2 pt-4 overflow-hidden relative">
            <AchievementComplitedBadge
              v-if="achievement.currentLevel === achievement.thresholds.length"
            />

            <div class="grid grid-cols-1 justify-items-center overflow-hidden">
              <SvgFire class="w-8 h-8" />
              <div class="overflow-hidden">
                {{ achievement.achievementType }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { achievements } = storeToRefs(useAchievementsStore());
</script>
