import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productService from '../service/productService';

export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (params, { rejectWithValue }) => {
        try {
            return await productService.getProducts(params);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            return await productService.getProductById(id);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalProducts: 0
        }
    },
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                // action.payload is now res.data from service
                state.items = action.payload.data || [];
                
                // Set pagination info
                state.pagination = {
                    currentPage: action.payload.page || 1,
                    totalPages: action.payload.pages || 1,
                    totalProducts: action.payload.total || (action.payload.data ? action.payload.data.length : 0)
                };
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
