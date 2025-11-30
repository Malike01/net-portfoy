import { fetchDbNotifications, markNotificationRead } from '@/services/notificationService';
import { DbNotification } from '@/types/type';
import { createSlice } from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'open';

interface NotificationState {
  items: DbNotification[];
  unreadCount: number;
}
const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    items: [] as DbNotification[],
    unreadCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDbNotifications.fulfilled, (state, action) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
    });
    builder.addCase(markNotificationRead.fulfilled, (state, action) => {
      const item = state.items.find(n => n._id === action.payload);
      if (item && !item.isRead) {
        item.isRead = true;
        state.unreadCount -= 1;
      }
    });
  },
});

export default notificationSlice.reducer;