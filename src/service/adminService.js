import api from './api';

export const adminGetStats = async () => {
    const res = await api.get('/admin/stats');
    return res.data; // KPIs: totalRevenue, totalOrders, totalProducts, totalUsers, recentOrders, lowStockProducts
};

export const adminGetProducts = async () => {
    const res = await api.get('/products?limit=100');
    return res.data.data;
};

export const adminCreateProduct = async (product) => {
    const res = await api.post('/products', product);
    return res.data.data;
};

export const adminUpdateProduct = async (id, updates) => {
    const res = await api.put(`/products/${id}`, updates);
    return res.data.data;
};

export const adminDeleteProduct = async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data.data;
};

export const adminGetOrders = async () => {
    const res = await api.get('/admin/orders');
    return res.data.data;
};

export const adminUpdateOrderStatus = async (id, status) => {
    const res = await api.put(`/admin/orders/${id}/status`, { status });
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
