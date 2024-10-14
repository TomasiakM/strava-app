<template>
  <div>
    <h4 class="font-semibold mb-3">Progi osiągnięcia</h4>
    <div class="grid grid-cols-4 gap-x-2 gap-y-4">
      <AchievementModalItem
        v-for="(threshold, idx) in achievement.thresholds"
        :key="threshold"
        :level="idx + 1"
        :threshold="threshold"
        :achievement="achievement"
      />
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
