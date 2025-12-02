import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  phone?: string;
}

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await api.get<UserType[]>('/users');
  return response.data;
});

export const addUser = createAsyncThunk('users/add', async (userData: any, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Hata oluştu';
    return rejectWithValue(msg);
  }
});

export const deleteUser = createAsyncThunk('users/delete', async (id: string, { dispatch, rejectWithValue }) => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Silinemedi';
    return rejectWithValue(msg);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [] as UserType[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u._id !== action.payload);
      });
  }
});

export default usersSlice.reducer;