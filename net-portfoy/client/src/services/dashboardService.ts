import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { DashboardData } from '@/types/type';

export const fetchDashboardStats = createAsyncThunk<DashboardData, void>(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get('/dashboard/stats').then(res => res.data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'İstatistikler alınamadı');
    }
  }
);

export const completeAgendaTask = createAsyncThunk(
  'dashboard/completeTask',
  async (customerId: string, {  rejectWithValue }) => {
    try {
      await api.put(`/customers/${customerId}`,{ id: customerId, data: { status: 'completed' } });
      
      return customerId; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);