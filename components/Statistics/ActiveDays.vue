<template>
  <div class="bg-white p-2 rounded shadow w-fit max-w-full">
    <div class="flex justify-end mb-2">
      <select v-model="year">
        <option v-for="y in listOfYears" :value="y">{{ y }}</option>
      </select>
    </div>
    <div class="overflow-x-auto">
      <table class="h-20 mx-auto">
        <tbody class="grid gap-[1px]">
          <tr
            v-for="(value, key) in getSelectedYearElements"
            class="flex gap-[1px] h-[10px]"
          >
            <td class="w-[30px] h-[10px] text-xs relative">
              <div class="absolute top-1/2 -translate-y-1/2">
                {{ idxToDayOfWeek(key as string) }}
              </div>
            </td>
            <td v-for="day in value" class="w-[10px] h-[10px] p-0">
              <div
                v-if="day"
                class="rounded-xs w-full h-full"
                :class="getDayColor(day.distance)"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-end gap-[2px] mt-2">
      <div class="w-[10px] h-[10px] rounded-xs bg-background"></div>
      <div class="w-[10px] h-[10px] rounded-xs bg-primary/25"></div>
      <div class="w-[10px] h-[10px] rounded-xs bg-primary/50"></div>
      <div class="w-[10px] h-[10px] rounded-xs bg-primary/75"></div>
      <div class="w-[10px] h-[10px] rounded-xs bg-primary"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IActivity } from "@/types/services/activities";

const { activities } = storeToRefs(useActivitiesStore());
const year = ref(new Date().getFullYear());

const getDayColor = (distance: number) => {
  if (maxDistanceDay.value > 0) {
    if (distance >= maxDistanceDay.value * 0.75) return "bg-primary";
    if (distance >= maxDistanceDay.value * 0.5) return "bg-primary/75";
    if (distance >= maxDistanceDay.value * 0.3) return "bg-primary/50";
    if (distance > 0) return "bg-primary/25";
  }

  return "bg-background";
};

const firstYear = computed(() => {
  return activities.value.reduce((prev, curr) => {
    const year = new Date(curr.startDate).getFullYear();

    if (year < prev) {
      return year;
    }

    return prev;
  }, new Date().getFullYear());
});

const listOfYears = computed(() => {
  const currentYear = new Date().getFullYear();
  if (firstYear.value === currentYear) {
    return [currentYear];
  }

  let years: number[] = [];
  for (let i = firstYear.value; i <= currentYear; i++) {
    years = [...years, i];
  }

  return years.reverse();
});

const maxDistanceDay = computed(() =>
  Object.values(getSelectedYearElements.value).reduce((prev, curr) => {
    const max = curr.reduce((previous, current) => {
      if (!current) return previous;

      if (current.distance > previous) {
        return current.distance;
      }

      return previous;
    }, 0);

    if (max > prev) {
      return max;
    }
    return prev;
  }, 0)
);

const groupedActivitiesByDate = computed(() =>
  activities.value.reduce(
    (groups, curr) => {
      const date = new Date(curr.startDate).toDateString();

      if (!groups[date]) {
        groups[date] = { distance: 0, activities: [] };
      }

      groups[date].distance += curr.distance;
      groups[date].activities = [...groups[date].activities, curr];

      return groups;
    },
    {} as {
      [key: string]: {
        distance: number;
        activities: IActivity[];
      };
    }
  )
);

const getSelectedYearElements = computed(() => {
  const first = new Date(`1/1/${year.value}`);
  const last = new Date(`12/31/${year.value}`);

  let days = [] as Date[];
  for (let i = new Date(first); i <= last; i.setDate(i.getDate() + 1)) {
    days = [...days, new Date(i)];
  }

  const firstDay = days[0].getDay() === 0 ? 7 : days[0].getDay();
  const datesByDayOfWeek = days.reduce((prev, curr) => {
    let currDayOfWeek = curr.getDay() === 0 ? 7 : curr.getDay();

    if (!prev[currDayOfWeek]) {
      prev[currDayOfWeek] = [];

      if (currDayOfWeek < firstDay) {
        prev[currDayOfWeek] = [null];
      }
    }

    return {
      ...prev,
      [currDayOfWeek]: [
        ...prev[currDayOfWeek],
        {
          day: curr,
          activities:
            groupedActivitiesByDate.value[curr.toDateString()]?.activities ||
            [],
          distance:
            groupedActivitiesByDate.value[curr.toDateString()]?.distance || 0,
        },
      ],
    };
  }, {} as { [key: string]: ({ day: Date; activities: IActivity[]; distance: number } | null)[] });

  return datesByDayOfWeek;
});

const idxToDayOfWeek = (key: string) => {
  switch (key) {
    case "1":
      return "Pon";
    case "2":
      return "Wt";
    case "3":
      return "Śr";
    case "4":
      return "Czw";
    case "5":
      return "Pt";
    case "6":
      return "Sob";
    default:
      return "Ndz";
  }
};
</script>
