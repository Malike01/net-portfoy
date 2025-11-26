import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Portfolio {
    isPortfolioModalOpen: boolean;
}

const initialState: Portfolio = {
    isPortfolioModalOpen: false,
};

const portfoliosSlice = createSlice({
    name: 'portfolios',
    initialState,
    reducers: {
        setIsPortfolioModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isPortfolioModalOpen = action.payload;
        },
    },
});

export const { setIsPortfolioModalOpen } = portfoliosSlice.actions;
export default portfoliosSlice.reducer;