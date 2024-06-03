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
            v-for="(dayOfWeekDistances, dayOfWeek) in distancesByDayOfWeek"
            class="flex gap-[1px] h-[10px]"
          >
            <td class="w-[30px] h-[10px] text-xs relative">
              <div class="absolute top-1/2 -translate-y-1/2">
                {{ idxToDayOfWeek(dayOfWeek as string) }}
              </div>
            </td>
            <td v-for="day in dayOfWeekDistances" class="w-[10px] h-[10px] p-0">
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
const { activities } = storeToRefs(useActivitiesStore());
const year = ref(new Date().getFullYear());

const getDayColor = (distance: number) => {
  if (maxDistanceInSelectedYear.value > 0) {
    if (distance >= maxDistanceInSelectedYear.value * 0.75) return "bg-primary";
    if (distance >= maxDistanceInSelectedYear.value * 0.5)
      return "bg-primary/75";
    if (distance >= maxDistanceInSelectedYear.value * 0.3)
      return "bg-primary/50";
    if (distance > 0) return "bg-primary/25";
  }

  return "bg-background";
};

const { statistics } = storeToRefs(useStatisticsStore());

const listOfYears = computed(() => {
  let listOfYears = Object.keys(statistics.value).map((e) => Number(e));

  const today = new Date();
  const currnetYear = today.getFullYear();
  if (!listOfYears.includes(currnetYear)) {
    listOfYears = [...listOfYears, currnetYear];
  }

  return listOfYears.reverse();
});

const maxDistanceInSelectedYear = computed(() => {
  const maxDistance = activities.value.reduce((prev, curr) => {
    const activityYear = new Date(curr.startDate).getFullYear();
    if (year.value !== activityYear) return prev;

    if (curr.distance > prev) return curr.distance;

    return prev;
  }, 0);

  return maxDistance;
});

const activitiesByDay = computed(() => {
  const activitiesByDay = activities.value.reduce(
    (prev, curr) => {
      const date = new Date(curr.startDate);
      const activityYear = date.getFullYear();

      if (year.value !== activityYear) return prev;

      const key = date.toDateString();
      if (!prev[key]) {
        prev[key] = { distance: 0 };
      }

      prev[key] = { distance: prev[key].distance + curr.distance };

      return prev;
    },
    {} as {
      [key: string]: {
        distance: number;
      };
    }
  );

  return activitiesByDay;
});

const distancesByDayOfWeek = computed(() => {
  const first = new Date(`1/1/${year.value}`);
  const last = new Date(`12/31/${year.value}`);

  let days = [] as Date[];
  for (let i = new Date(first); i <= last; i.setDate(i.getDate() + 1)) {
    days = [...days, new Date(i)];
  }

  const firstDay = days[0].getDay() === 0 ? 7 : days[0].getDay();
  const distancesByDayOfWeek = days.reduce((prev, curr) => {
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
          distance: activitiesByDay.value[curr.toDateString()]?.distance || 0,
        },
      ],
    };
  }, {} as { [key: string]: ({ day: Date; distance: number } | null)[] });

  return distancesByDayOfWeek;
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
