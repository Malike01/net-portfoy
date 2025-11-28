import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from '@/services/customerApi';
import { CustomerItem } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customers {
    isCustomerModalOpen: boolean;
    customers: CustomerItem[];
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: Customers = {
    isCustomerModalOpen: false,
    customers: [],
    isLoading: false,
    isError: false,
    message: '',
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setIsCustomerModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isCustomerModalOpen = action.payload;
        },
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
    builder
      // GET
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // CREATE
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customers.unshift(action.payload); 
        state.message = 'Müşteri başarıyla oluşturuldu.';
      })
      // UPDATE
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex((c) => c._id === action.payload._id); 
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      // DELETE
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter((c) => (c._id || (c as any)._id) !== action.payload);
      });
  },
});

export const { setIsCustomerModalOpen, reset } = customersSlice.actions;
export default customersSlice.reducer;