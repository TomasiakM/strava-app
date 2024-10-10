import type { IAchievement } from "~/types/services/achievements";

export default (): IAchievement[] => {
  return [
    {
      achievementType: "Test 1",
      currentLevel: 0,
      thresholds: [100, 200, 300, 400, 500, 600],
    },
    {
      achievementType: "Test 2",
      currentLevel: 0,
      thresholds: [100, 200, 300, 400, 500],
    },
    {
      achievementType: "Test 3",
      currentLevel: 1,
      thresholds: [100, 200, 300, 400],
    },
    {
      achievementType: "Test 4",
      currentLevel: 4,
      thresholds: [100, 200, 300, 400, 500, 600],
    },
    {
      achievementType: "Test 5",
      currentLevel: 6,
      thresholds: [100, 200, 300, 400, 500, 600],
    },
    {
      achievementType: "Test 6",
      currentLevel: 6,
      thresholds: [100, 200, 300, 400, 500, 600],
    },
    {
      achievementType: "Test 7",
      currentLevel: 8,
      thresholds: [100, 200, 300, 400, 500, 600, 700, 800],
    },
  ];
};
