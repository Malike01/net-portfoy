import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
}

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const initialState: AuthState = {
  user: userFromStorage,
};

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
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;