import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'open';

interface NotificationPayload {
  key?: string;
  message: string;
  description?: string;
  type?: NotificationType;
  duration?: number;
  progress?: number; 
}

interface NotificationState {
  latestNotification: NotificationPayload | null;
}

const initialState: NotificationState = {
  latestNotification: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationPayload>) => {
      if (!action.payload.key) {
        action.payload.key = Date.now().toString();
      }
      state.latestNotification = action.payload;
    },
  },
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;