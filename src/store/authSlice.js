import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../service/authService';

// Async thunk — handles the async operation; Redux generates pending/fulfilled/rejected actions
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            return await authService.login(email, password); // returns { token, user }
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            return await authService.register(name, email, password);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        isLoggedIn: !!localStorage.getItem('token'),
        loading: false,
        error: null,
    },
    reducers: {
        // Synchronous action — logout doesn't need an API call
        logout(state) {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        updateProfile(state, action) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        addAddress(state, action) {
            if (state.user) {
                const newAddress = { ...action.payload, _id: Date.now().toString() };
                state.user.addresses = [...(state.user.addresses || []), newAddress];
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        updateAddress(state, action) {
            if (state.user && state.user.addresses) {
                const { id, updates } = action.payload;
                state.user.addresses = state.user.addresses.map(addr => 
                    addr._id === id ? { ...addr, ...updates } : addr
                );
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        deleteAddress(state, action) {
            if (state.user && state.user.addresses) {
                state.user.addresses = state.user.addresses.filter(addr => addr._id !== action.payload);
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        setDefaultAddress(state, action) {
            if (state.user && state.user.addresses) {
                state.user.addresses = state.user.addresses.map(addr => ({
                    ...addr,
                    isDefault: addr._id === action.payload
                }));
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        }
    },
    // extraReducers handle the three states of the async thunk
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, updateProfile, addAddress, updateAddress, deleteAddress, setDefaultAddress } = authSlice.actions;
export default authSlice.reducer;
