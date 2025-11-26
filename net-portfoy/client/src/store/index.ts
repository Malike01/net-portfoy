import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import portfoliosSlice from './portfoliosSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    portfolios: portfoliosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;