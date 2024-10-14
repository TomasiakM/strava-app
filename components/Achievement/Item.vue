<template>
  <div
    class="rounded shadow relative"
    :class="achievement.currentLevel !== 0 ? 'bg-white' : 'bg-black/5'"
  >
    <AchievementLevelBadge
      :level="achievement.currentLevel"
      :max-level="achievement.thresholds.length"
      :is-complited="achievement.currentLevel === achievement.thresholds.length"
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
</template>

<script lang="ts" setup>
import type { IAchievement } from "@/types/services/achievements";

interface IProps {
  achievement: IAchievement;
}

defineProps<IProps>();
</script>
