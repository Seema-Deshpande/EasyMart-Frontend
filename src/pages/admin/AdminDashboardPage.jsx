import useOrder from '../../context/useOrder';
import { MOCK_PRODUCTS } from '../../data/products';

const AdminDashboardPage = () => {
    const { orders } = useOrder();
    
    const stats = [
        { 
            label: 'Total Revenue', 
            value: `$${orders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}`, 
            icon: 'bi-currency-dollar', 
            color: 'primary' 
        },
        { 
            label: 'Total Orders', 
            value: orders.length, 
            icon: 'bi-bag-check', 
            color: 'success' 
        },
        { 
            label: 'Total Products', 
            value: MOCK_PRODUCTS.length, 
            icon: 'bi-box', 
            color: 'info' 
        },
        { 
            label: 'Low Stock', 
            value: MOCK_PRODUCTS.filter(p => p.stock < 5).length, 
            icon: 'bi-exclamation-triangle', 
            color: 'warning' 
        }
    ];

    return (
        <div>
            <h2 className="fw-bold mb-4">Dashboard Overview</h2>
            <div className="row g-4">
                {stats.map(stat => (
                    <div key={stat.label} className="col-md-6 col-xl-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded-circle me-3`}>
                                        <i className={`bi ${stat.icon} text-${stat.color} fs-4`}></i>
                                    </div>
                                    <h6 className="text-muted mb-0">{stat.label}</h6>
                                </div>
                                <h3 className="fw-bold mb-0">{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4 mt-2">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">Recent Orders</h5>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.slice(0, 5).map(order => (
                                            <tr key={order._id}>
                                                <td><small className="fw-bold">#{order._id}</small></td>
                                                <td>{order.user}</td>
                                                <td>${order.total.toFixed(2)}</td>
                                                <td><span className="badge bg-opacity-10 text-primary bg-primary">{order.status}</span></td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4 text-muted">No recent orders.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
