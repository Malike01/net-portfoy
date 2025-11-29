import { createPortfolio, deletePortfolio, fetchPortfolioById, fetchPortfolios, updatePortfolio } from '@/services/portfolioService';
import { PortfolioItem } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Portfolio {
    isPortfolioModalOpen: boolean;
    items: PortfolioItem[];
    currentItem: PortfolioItem | null; 
    isLoading: boolean;
    isError: boolean;
}

const initialState: Portfolio = {
    isPortfolioModalOpen: false,
    items: [],
    currentItem: null,
    isLoading: false,
    isError: false,
};

const portfoliosSlice = createSlice({
    name: 'portfolios',
    initialState,
    reducers: {
        setIsPortfolioModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isPortfolioModalOpen = action.payload;
        },
        clearCurrentItem: (state) => {
             state.currentItem = null;
       },
       setLocalPortfolios: (state, action: PayloadAction<PortfolioItem[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchPortfolios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPortfolios.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPortfolios.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // Fetch One
      .addCase(fetchPortfolioById.pending, (state) => {
        state.isLoading = true;
        state.currentItem = null;
      })
      .addCase(fetchPortfolioById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentItem = action.payload;
      })
      // Create
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.items.unshift(action.payload); 
      })
      // Update
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => (p._id) === (action.payload._id));
        if (index !== -1) state.items[index] = action.payload;
        state.currentItem = null;
      })
      // Delete
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => (p._id ) !== action.payload);
      });
  },
});

export const { setIsPortfolioModalOpen, clearCurrentItem, setLocalPortfolios } = portfoliosSlice.actions;
export default portfoliosSlice.reducer;