export default defineStore("demo", {
  state: () => ({
    isDemoMode: false,
  }),
  actions: {
    setPageToDemoMode() {
      this.isDemoMode = true;
    },
    removeDemoMode() {
      this.isDemoMode = false;
    },
  },
});
