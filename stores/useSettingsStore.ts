const LOCAL_STOREGE_NAME = "settings";

interface IState {
  map: {
    showTiles: boolean;
    showGrid: boolean;
    showActivities: boolean;
  };
}

export default defineStore("settings", {
  state: (): IState => ({
    map: {
      showTiles: true,
      showGrid: true,
      showActivities: true,
    },
  }),
  actions: {
    toggleMapTiles() {
      this.map.showTiles = !this.map.showTiles;

      this._saveState();
    },
    toggleMapGrid() {
      this.map.showGrid = !this.map.showGrid;

      this._saveState();
    },
    toggleMapActivities() {
      this.map.showActivities = !this.map.showActivities;

      this._saveState();
    },
    init() {
      const json = localStorage.getItem(LOCAL_STOREGE_NAME);

      if (json) {
        const data: IState = JSON.parse(json);

        this.$state = { ...data };
      }
    },
    _saveState() {
      const state = JSON.stringify(this.$state);
      localStorage.setItem(LOCAL_STOREGE_NAME, state);
    },
  },
});
