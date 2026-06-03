import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartService from '../service/cartService';

// Thunks
export const fetchCart = createAsyncThunk(
    'cart/fetch',
    async (_, { rejectWithValue }) => {
        try {
            return await cartService.getCart();
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/add',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            return await cartService.addToCart(productId, quantity);
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to add to cart');
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/update',
    async ({ itemId, quantity }, { rejectWithValue }) => {
        try {
            return await cartService.updateCartItem(itemId, quantity);
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to update item');
        }
    }
);

export const removeCartItem = createAsyncThunk(
    'cart/remove',
    async (itemId, { rejectWithValue }) => {
        try {
            return await cartService.removeCartItem(itemId);
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to remove item');
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clear',
    async (_, { rejectWithValue }) => {
        try {
            return await cartService.clearCart();
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to clear cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.loading = true;
            state.error = null;
        };

        const handleFulfilled = (state, action) => {
            state.loading = false;
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice;
        };

        const handleRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload;
        };

        builder
            // fetchCart
            .addCase(fetchCart.pending, handlePending)
            .addCase(fetchCart.fulfilled, handleFulfilled)
            .addCase(fetchCart.rejected, handleRejected)
            // addToCart
            .addCase(addToCart.pending, handlePending)
            .addCase(addToCart.fulfilled, handleFulfilled)
            .addCase(addToCart.rejected, handleRejected)
            // updateCartItem
            .addCase(updateCartItem.pending, handlePending)
            .addCase(updateCartItem.fulfilled, handleFulfilled)
            .addCase(updateCartItem.rejected, handleRejected)
            // removeCartItem
            .addCase(removeCartItem.pending, handlePending)
            .addCase(removeCartItem.fulfilled, handleFulfilled)
            .addCase(removeCartItem.rejected, handleRejected)
            // clearCart
            .addCase(clearCart.pending, handlePending)
            .addCase(clearCart.fulfilled, handleFulfilled)
            .addCase(clearCart.rejected, handleRejected);
    },
});

export default cartSlice.reducer;
