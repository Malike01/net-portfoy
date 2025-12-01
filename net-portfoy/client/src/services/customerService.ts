import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import { CustomerItem } from "@/types/type";

export const getCustomers = createAsyncThunk(
  'customers/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/customers');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Veri çekilemedi');
    }
  }
);

export const createCustomer = createAsyncThunk(
  'customers/create',
  async (customerData: Partial<CustomerItem>, { rejectWithValue }) => {
    try {
      const response = await api.post('/customers', customerData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async ({ id, data }: { id: number | string; data: Partial<CustomerItem> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/customers/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/delete',
  async (id: number | string, { rejectWithValue }) => {
    try {
      await api.delete(`/customers/${id}`);
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);