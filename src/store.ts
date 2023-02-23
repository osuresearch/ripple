import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './features/settings';
import commentsReducer from './features/comments';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    comments: commentsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type RippleDispatch = typeof store.dispatch;
