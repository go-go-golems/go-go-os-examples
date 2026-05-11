import { configureStore } from '@reduxjs/toolkit';
import { controlPanelApi } from '../services/controlPanelApi';

export const createAppStore = () =>
  configureStore({
    reducer: {
      [controlPanelApi.reducerPath]: controlPanelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(controlPanelApi.middleware),
  });

export const store = createAppStore();

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
