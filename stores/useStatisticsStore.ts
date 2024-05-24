interface IYearlyStatistics {
  [key: string]: IMonthlyStatistics;
}

interface IMonthlyStatistics {
  [key: string]: {
    year: number;
    month: number;
    distance: number;
  };
}

export default defineStore("statistics", {
  state: () => ({
    statistics: {} as IYearlyStatistics,
  }),
  actions: {
    updateStatistics() {
      this.statistics = {};

      const { activities } = useActivitiesStore();

      const emptyStatistics = {
        distance: 0,
        movingTime: 0,
        elapsedTime: 0,
      };

      activities.forEach((activity) => {
        const date = new Date(activity.startDate);

        const month = date.getMonth();
        const year = date.getFullYear();

        if (!this.statistics[year]) {
          this.statistics[year] = {
            [month]: {
              year,
              month,
              ...emptyStatistics,
            },
          };
        }

        if (!this.statistics[year][month]) {
          this.statistics[year][month] = {
            year,
            month,
            ...emptyStatistics,
          };
        }

        const { distance } = activity;

        this.statistics[year][month].distance += distance;
      });

      Object.keys(this.statistics).forEach((year) => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        for (let i = 0; i < 12; i++) {
          if (currentYear === Number(year) && i > currentMonth) break;

          if (!this.statistics[year][i]) {
            this.statistics[year][i] = {
              year: Number(year),
              month: i,
              ...emptyStatistics,
            };
          }
        }
      });
    },
  },
});
