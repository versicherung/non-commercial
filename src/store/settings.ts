import { createSlice } from '@reduxjs/toolkit';
import defaultSettings from '@/settings';
import { RootState } from './store';

interface SettingsState {
  colorWeek: boolean;
  navbar: boolean;
  menu: boolean;
  footer: boolean;
  themeColor: string;
  menuWidth: number;
}

const initialState: SettingsState = defaultSettings;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
});

export const selectSettings = (state: RootState) => state.settings;
