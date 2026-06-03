import api from './api';

export const adminGetStats = async () => {
    const res = await api.get('/admin/stats');
    return res.data.data;
};

export const adminGetProducts = async (params) => {
    const res = await api.get('/products', { params });
    return res.data.data;
};

export const adminGetOrders = async (params) => {
    const res = await api.get('/admin/orders', { params });
    return res.data.data;
};

export const adminCreateProduct = async (productData) => {
    const res = await api.post('/products', productData);
    return res.data.data;
};

export const adminUpdateProduct = async (id, productData) => {
    const res = await api.put(`/products/${id}`, productData);
    return res.data.data;
};

export const adminDeleteProduct = async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data.data;
};

export const adminUpdateOrderStatus = async (orderId, status) => {
    const res = await api.put(`/admin/orders/${orderId}/status`, { status });
    return res.data.data;
};

export const adminGetUsers = async () => {
    const res = await api.get('/admin/users');
    return res.data.data;
};

export const adminUpdateUserRole = async (userId, role) => {
    const res = await api.put(`/admin/users/${userId}/role`, { role });
    return res.data.data;
};

export const adminDeleteUser = async (userId) => {
    const res = await api.delete(`/admin/users/${userId}`);
    return res.data.data;
};
