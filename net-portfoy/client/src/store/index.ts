import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import portfoliosSlice from './portfoliosSlice';
import customersSlice from './customersSlice';
import notificationSlice from './notificationSlice';
import dashboardSlice from './dashboardSlice';
import usersSlice from './usersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    portfolios: portfoliosSlice,
    customers: customersSlice,
    notification: notificationSlice,
    dashboard: dashboardSlice,
    users: usersSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;