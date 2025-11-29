import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import { PortfolioItem } from "@/types/type";

export const fetchPortfolios = createAsyncThunk<PortfolioItem[], void>(
  'portfolio/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/portfolios');
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Portföyler yüklenemedi');
    }
  }
);

export const fetchPortfolioById = createAsyncThunk<PortfolioItem, string | number>(
  'portfolio/fetchOne',
  async (id: string | number, { rejectWithValue }) => {
    try {
       const response = await api.get(`/portfolios/${id}`);
       return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createPortfolio = createAsyncThunk<PortfolioItem | any>(
  'portfolio/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/portfolios', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updatePortfolio = createAsyncThunk<PortfolioItem, { id: string | number; data: any }>(
  'portfolio/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/portfolios/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePortfolio = createAsyncThunk<string | number, string | number>(
  'portfolio/delete',
  async (id: string | number, { rejectWithValue }) => {
    try {
      await api.delete(`/portfolios/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);