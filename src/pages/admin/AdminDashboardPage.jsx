import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { adminGetStats } from '../../service/adminService';

const AdminDashboardPage = () => {
    const { user } = useSelector((state) => state.auth);
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminGetStats();
                setStatsData(data);
                setError(null);
            } catch (err) {
                console.error('Dashboard stats error:', err);
                setError(err.message || 'Failed to load dashboard stats');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-4 text-center">Loading dashboard...</div>;
    if (error) return <div className="alert alert-danger m-4">{error}</div>;

    const kpiCards = [
        { 
            label: 'Total Revenue', 
            value: `$${statsData?.totalRevenue?.toFixed(2) || '0.00'}`, 
            icon: 'bi-currency-dollar', 
            bg: 'bg-success' 
        },
        { 
            label: 'Total Orders', 
            value: statsData?.totalOrders || 0, 
            icon: 'bi-cart-check', 
            bg: 'bg-primary' 
        },
        { 
            label: 'Total Products', 
            value: statsData?.totalProducts || 0, 
            icon: 'bi-box-seam', 
            bg: 'bg-warning' 
        },
        { 
            label: 'Low Stock Items', 
            value: statsData?.lowStockProducts?.length || 0, 
            icon: 'bi-exclamation-triangle', 
            bg: 'bg-danger' 
        }
    ];

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4">Welcome, {user?.name}</h2>
            
            {/* KPI Cards */}
            <div className="row g-4 mb-4">
                {kpiCards.map((card, index) => (
                    <div key={index} className="col-md-6 col-lg-3">
                        <div className={`card ${card.bg} text-white h-100 shadow-sm border-0`}>
                            <div className="card-body d-flex align-items-center">
                                <div className="fs-1 me-3">
                                    <i className={`bi ${card.icon}`}></i>
                                </div>
                                <div>
                                    <h3 className="mb-0 fw-bold">{card.value}</h3>
                                    <p className="card-text mb-0 small opacity-75">{card.label}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                {/* Recent Orders Table */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold">Recent Orders</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statsData?.recentOrders?.map(order => (
                                            <tr key={order._id}>
                                                <td className="small">{order._id}</td>
                                                <td>{order.user?.name || 'Guest'}</td>
                                                <td className="fw-bold">${order.totalAmount?.toFixed(2)}</td>
                                                <td>
                                                    <span className={`badge rounded-pill ${
                                                        order.status === 'Delivered' ? 'bg-success' : 
                                                        order.status === 'Processing' ? 'bg-primary' : 'bg-secondary'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {(!statsData?.recentOrders || statsData.recentOrders.length === 0) && (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4 text-muted">No recent orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold">Low Stock Alerts</h5>
                        </div>
                        <div className="card-body">
                            {statsData?.lowStockProducts?.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {statsData.lowStockProducts.map(product => (
                                        <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <span className="text-truncate me-2">{product.name}</span>
                                            <span className={`badge ${product.stock === 0 ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                                {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-muted py-4">All products are well-stocked.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
