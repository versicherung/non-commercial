import defaultConfig from '@/config.json';

interface AppState {
  theme: string;
  colorWeek: boolean;
  navbar: boolean;
  menu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  [key: string]: unknown;
}

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultConfig }),

  getters: {
    getCurrentConfig(state: AppState): AppState {
      return { ...state };
    },
  },

  actions: {
    // Update app settings
    updateMenuCollapse(collapse: boolean) {
      this.menuCollapse = collapse;
    },

    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
  },
});

export default useAppStore;
