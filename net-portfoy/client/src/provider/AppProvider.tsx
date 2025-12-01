import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';
import { ConfigProvider } from 'antd';
import trTR from 'antd/locale/tr_TR';
import NotificationListener from '@/components/NotificationListener';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ConfigProvider
      locale={trTR}
      theme={{
        token: {
          colorPrimary: '#778da9', 
          borderRadius: 8,        
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Button: {
            colorPrimaryHover: '#415a77',
            colorPrimaryBg:'#778da9',
            algorithm: true,
          },
          Input: {
            activeBorderColor: '#778da9',
          }
        },
      }}
    >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NotificationListener/>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
    </ConfigProvider>
  );
};