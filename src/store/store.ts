import { configureStore } from '@reduxjs/toolkit';
import { settingsSlice } from './settings';

export const store = configureStore({
  reducer: {
    [settingsSlice.name]: settingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
