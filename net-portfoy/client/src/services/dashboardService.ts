import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { CompleteTaskPayload, DashboardData } from '@/types/type';

export const fetchDashboardStats = createAsyncThunk<DashboardData, void>(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get('/dashboard').then(res => res.data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'İstatistikler alınamadı');
    }
  }
);

export const completeAgendaTask = createAsyncThunk(
  'dashboard/completeTask',
  async ({ id, model, type }: CompleteTaskPayload, { rejectWithValue }) => {
    try {

      await api.put(`/dashboard/${id}/complete`, { model, type });
            return id; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'İşlem başarısız');
    }
  }
);