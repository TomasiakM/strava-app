<template>
  <div>
    <h4 class="font-semibold mb-3">Progi osiągnięcia</h4>
    <div class="grid grid-cols-4 gap-x-2 gap-y-4">
      <div
        v-for="(threshold, idx) in achievement.thresholds"
        :key="threshold"
        class="relative rounded shadow border border-primary"
        :class="achievement.currentLevel > idx && ''"
      >
        <AchievementLevelBadge
          :level="idx + 1"
          :max-level="achievement.thresholds.length"
          :is-complited="idx < achievement.currentLevel"
        />
        <div class="relative overflow-hidden p-1 font-semibold">
          <AchievementComplitedBadge v-if="achievement.currentLevel > idx" />

          <div class="mt-4 grid grid-cols-1 justify-items-center">
            <SvgFire class="w-10 h-10" />

            <div>
              {{ threshold }}
            </div>
          </div>
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
