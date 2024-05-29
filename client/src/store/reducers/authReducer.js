import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api';

// Thunk for customer registration
export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-register', info);
            return data;
        } catch (error) {
            // Return the error message from server
            return rejectWithValue(error.response.data);
        }
    }
);

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo: "",
        errorMessage: '',
        successMessage: ''
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(customer_register.pending, (state) => {
                state.loader = true;
                state.errorMessage = '';
                state.successMessage = '';
            })
            .addCase(customer_register.fulfilled, (state, action) => {
                state.loader = false;
                state.userInfo = action.payload;
                state.successMessage = 'Registration successful';
            })
            .addCase(customer_register.rejected, (state, action) => {
                state.loader = false;
                state.errorMessage = action.payload;
            });
    }
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
