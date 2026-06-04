import api from './api';

export const getProfile = async () => {
    const res = await api.get('/auth/me');
    return res.data.data;
};

export const updateProfile = async (updates) => {
    const res = await api.put('/auth/me', updates);
    return res.data.data;
};

export const getAddresses = async () => {
    const res = await api.get('/users/addresses');
    return res.data.data;
};

export const addAddress = async (address) => {
    const res = await api.post('/users/addresses', address);
    return res.data.data;
};

export const updateAddress = async (id, address) => {
    const res = await api.put(`/users/addresses/${id}`, address);
    return res.data.data;
};

export const deleteAddress = async (id) => {
    const res = await api.delete(`/users/addresses/${id}`);
    return res.data.data;
};

export const setDefaultAddress = async (id) => {
    const res = await api.put(`/users/addresses/${id}/default`);
    return res.data.data;
};

export const getAllUsers = async () => {
    const res = await api.get('/admin/users');
    return res.data.data;
};
