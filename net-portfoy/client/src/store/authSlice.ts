import api from '@/services/api';
import { Feature } from '@/types/type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  phone?: string;
  isPhoneVerified: boolean;
  features: Feature[];
}

interface AuthState {
  user: User | null;
  isLoading?: boolean;
  isError?: boolean;
  message?: string;
}

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const initialState: AuthState = {
  user: userFromStorage,
};

export const login = createAsyncThunk(
  'auth/login',
  async (userData: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', userData);
      
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Giriş başarısız';
      return rejectWithValue(msg);
    }
  }
);

export const verifyPhoneAction = createAsyncThunk(
  'auth/verifyPhone',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-phone', { code });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    updateUserFeatures: (state, action: PayloadAction<Feature[]>) => {
      if (state.user) {
        state.user.features = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload; 
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      .addCase(verifyPhoneAction.fulfilled, (state, action) => {
        if (state.user) {
          state.user.isPhoneVerified = true;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      });
  },
});

export const { setCredentials, logout, updateUserFeatures } = authSlice.actions;
export default authSlice.reducer;