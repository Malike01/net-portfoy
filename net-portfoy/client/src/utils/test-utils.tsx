import React, { JSX, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
// Reducerlarını import et
import authReducer from '@/store/authSlice';
import notificationReducer from '@/store/notificationSlice';
import portfoliosSlice from '@/store/portfoliosSlice';
import customersSlice from '@/store/customersSlice';
import dashboardSlice from '@/store/dashboardSlice';
import notificationSlice from '@/store/notificationSlice';
i
export const setupStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      notification: notificationReducer,
      portfolio: portfoliosSlice,
      customers: customersSlice,
      dashboard: dashboardSlice,
      dbNotification: notificationSlice,  
    },
    preloadedState,
  });
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: any;
  store?: ReturnType<typeof setupStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <ConfigProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    );
  }

  // Standart render fonksiyonunu bizim wrapper ile sarmalayarak döndür
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}