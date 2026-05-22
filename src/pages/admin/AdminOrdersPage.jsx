import useOrder from '../../context/useOrder';
import Notification from '../../component/common/Notification';
import { useState } from 'react';

const AdminOrdersPage = () => {
    const { orders, updateStatus } = useOrder();
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleStatusChange = (id, newStatus) => {
        updateStatus(id, newStatus);
        showNotification(`Order status updated to ${newStatus}`, 'success');
    };

    return (
        <div>
            <h2 className="fw-bold mb-4">Orders Management</h2>
            
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th className="text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td className="px-4 py-3 small fw-bold">#{order._id}</td>
                                        <td>{order.user}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="fw-bold text-primary">${order.total.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge bg-opacity-10 ${
                                                order.status === 'Delivered' ? 'bg-success text-success' : 
                                                order.status === 'Shipped' ? 'bg-info text-info' : 
                                                order.status === 'Cancelled' ? 'bg-danger text-danger' : 
                                                'bg-warning text-warning'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <select 
                                                className="form-select form-select-sm d-inline-block w-auto" 
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">No orders to display.</td>
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
