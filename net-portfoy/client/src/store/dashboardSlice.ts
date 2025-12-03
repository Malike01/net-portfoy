import { completeAgendaTask, fetchDashboardStats } from '@/services/dashboardService';
import { DashboardData } from '@/types/type';
import { createSlice } from '@reduxjs/toolkit';

// --- STATE & SLICE ---

export interface DashboardState {
  stats: DashboardData | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: DashboardState = {
  stats: null,
  isLoading: false,
  isError: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      
      // Complete Task
      .addCase(completeAgendaTask.fulfilled, (state, action) => {
       if (state.stats) {
          state.stats.agenda = state.stats.agenda.filter(item => item.id === action.payload);
        }
      });
  },
});

export default dashboardSlice.reducer;