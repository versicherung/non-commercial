import defaultSettings from '@/settings.json';

const settingsState = atom({
  key: 'settings',
  default: defaultSettings,
});

export { settingsState };
