import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './features/settings';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type RippleDispatch = typeof store.dispatch;
