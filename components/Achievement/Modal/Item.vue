<template>
  <div class="relative rounded shadow border border-primary">
    <AchievementLevelBadge
      :level="level"
      :max-level="achievement.thresholds.length"
      :is-complited="achievement.currentLevel >= level"
    />
    <div class="relative overflow-hidden p-1 font-semibold">
      <AchievementComplitedBadge v-if="achievement.currentLevel >= level" />

      <div class="mt-4 grid grid-cols-1 justify-items-center">
        <SvgFire class="w-10 h-10" />

        <div>
          {{ threshold }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IAchievement } from "@/types/services/achievements";

interface IProps {
  threshold: any;
  level: number;
  achievement: IAchievement;
}

defineProps<IProps>();
</script>
