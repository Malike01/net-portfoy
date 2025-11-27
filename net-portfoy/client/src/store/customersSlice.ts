import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customers {
    isCustomerModalOpen: boolean;
}

const initialState: Customers = {
    isCustomerModalOpen: false,
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setIsCustomerModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isCustomerModalOpen = action.payload;
        },
    },
});

export const { setIsCustomerModalOpen } = customersSlice.actions;
export default customersSlice.reducer;