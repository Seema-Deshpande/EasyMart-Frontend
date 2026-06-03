import { useState, useEffect } from 'react';
import { adminGetOrders, adminUpdateOrderStatus } from '../../service/adminService';
import Notification from '../../component/common/Notification';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await adminGetOrders();
            setOrders(data.orders || data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await adminUpdateOrderStatus(id, newStatus);
            setOrders(orders.map(o => (o._id || o.id) === id ? { ...o, status: newStatus } : o));
            showNotification(`Order status updated to ${newStatus}`, 'success');
        } catch (err) {
            showNotification('Failed to update order status', 'error');
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesID = (order._id || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || order.status === statusFilter;
        return matchesID && matchesStatus;
    });

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Orders Management</h2>
            </div>
            
            {/* Filters */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-3">
                    <div className="row g-3">
                        <div className="col-md-8">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0 text-muted">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control border-start-0 ps-0" 
                                    placeholder="Search by Order ID..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-select" 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Filter by Status: All</option>
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0 text-nowrap">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th className="text-end px-4">Update Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order._id}>
                                        <td className="px-4 py-3">
                                            <span className="fw-bold small text-muted">#{order._id}</span>
                                        </td>
                                        <td>
                                            <div className="fw-semibold text-dark">
                                                {order.shippingAddress?.fullName || 'Guest User'}
                                            </div>
                                            <small className="text-muted">{order.items?.length || 0} items</small>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="fw-bold text-primary">${(order.total || 0).toFixed(2)}</td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${
                                                order.status === 'Delivered' ? 'bg-success text-white' : 
                                                order.status === 'Shipped' ? 'bg-info text-white' : 
                                                order.status === 'Cancelled' ? 'bg-danger text-white' : 
                                                order.status === 'Processing' ? 'bg-primary text-white' :
                                                'bg-warning text-dark'
                                            }`} style={{ fontSize: '0.75rem' }}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <select 
                                                className="form-select form-select-sm d-inline-block w-auto border-0 shadow-sm" 
                                                style={{ backgroundColor: '#f8f9fa' }}
                                                value={order.status || 'Pending'}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            >
                                                {statusOptions.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            <i className="bi bi-inbox display-4 mb-3 d-block opacity-25"></i>
                                            {orders.length === 0 ? "You haven't placed any orders yet." : "No orders match your filters."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrdersPage;
