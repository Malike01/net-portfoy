import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import { DbNotification } from "@/types/type";

export const fetchDbNotifications = createAsyncThunk<DbNotification[], void>(
  'dbNotification/fetch',
  async () => {
    const response = await api.get('/notifications');
    return response.data;
  }
);

export const markNotificationRead = createAsyncThunk(
  'dbNotification/markRead',
  async (id: string) => {
    await api.put(`/notifications/${id}/read`);
    return id;
  }
);