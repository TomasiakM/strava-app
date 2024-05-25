<template>
  <DataContainer>
    <div class="p-2 grid gap-2">
      <h3 class="text-xl text-primary font-semibold">Statystyki</h3>
      <div class="flex justify-center">
        <StatisticsActiveDays />
      </div>

      <StatisticsPersonalBests />

      <StatisticsChartYearlyDistance />

      <StatisticsChartYearlyDistanceCumulative />
    </div>
  </DataContainer>
</template>
