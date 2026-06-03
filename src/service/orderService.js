import api from './api';

export const createOrder = async (shippingAddress, paymentMethod) => {
    const res = await api.post('/orders', { shippingAddress, paymentMethod });
    return res.data.data;
};

export const getMyOrders = async () => {
    const res = await api.get('/orders/myorders');
    return res.data.data;
};

export const getOrderById = async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data.data;
};

export const cancelOrder = async (id) => {
    const res = await api.put(`/orders/${id}/cancel`);
    return res.data.data;
};
