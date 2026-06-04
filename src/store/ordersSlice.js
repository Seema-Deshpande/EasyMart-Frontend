import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as orderService from '../service/orderService';

export const fetchMyOrders = createAsyncThunk(
    'orders/fetchMy',
    async (_, { rejectWithValue }) => {
        try {
            return await orderService.getMyOrders();
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            return await orderService.getOrderById(id);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch order details');
        }
    }
);

export const placeOrder = createAsyncThunk(
    'orders/place',
    async ({ shippingAddress, paymentMethod }, { rejectWithValue }) => {
        try {
            return await orderService.createOrder(shippingAddress, paymentMethod);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to place order');
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'orders/cancel',
    async (id, { rejectWithValue }) => {
        try {
            return await orderService.cancelOrder(id);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to cancel order');
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        currentOrder: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
                state.orders.unshift(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.map(o => o._id === action.payload._id ? action.payload : o);
                if (state.currentOrder?._id === action.payload._id) {
                    state.currentOrder = action.payload;
                }
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
