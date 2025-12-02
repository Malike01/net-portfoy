import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppProvider } from './provider/AppProvider';
import App from './App';
import { store } from './store';
import { logout } from './store/authSlice';
import { setupInterceptors } from './services/api';

setupInterceptors(store, logout);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);