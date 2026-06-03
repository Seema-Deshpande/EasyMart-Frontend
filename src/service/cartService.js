import api from './api';

export const getCart = async () => {
    const res = await api.get('/cart');
    return res.data.data;
};

export const addToCart = async (productId, quantity) => {
    const res = await api.post('/cart', { productId, quantity });
    return res.data.data;
};

export const updateCartItem = async (itemId, quantity) => {
    const res = await api.put(`/cart/${itemId}`, { quantity });
    return res.data.data;
};

export const removeCartItem = async (itemId) => {
    const res = await api.delete(`/cart/${itemId}`);
    return res.data.data;
};

export const clearCart = async () => {
    const res = await api.delete('/cart');
    return res.data.data;
};
