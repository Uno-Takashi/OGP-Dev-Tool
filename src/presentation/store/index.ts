import { configureStore } from '@reduxjs/toolkit';
import ogpReducer from './ogpSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    ogp: ogpReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
