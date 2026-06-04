import api from './api';

export const getProducts = async (params) => {
    const res = await api.get('/products', { params });
    // Return everything so productSlice can handle pagination
    return res.data;
};

export const getProductById = async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data.data;
};
