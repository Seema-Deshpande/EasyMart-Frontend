import useOrder from '../../context/useOrder';
import { MOCK_PRODUCTS } from '../../data/products';

const AdminDashboardPage = () => {
    const { orders } = useOrder();
    
    const lowStockProducts = MOCK_PRODUCTS.filter(p => p.stock < 10);

    const stats = [
        { 
            label: 'Total Revenue', 
            value: `$${orders.filter(o => o.status === 'Delivered').reduce((acc, o) => acc + o.total, 0).toFixed(2)}`, 
            icon: 'bi-briefcase-fill', 
            bg: '#198754' 
        },
        { 
            label: 'Total Orders', 
            value: orders.length, 
            icon: 'bi-receipt', 
            bg: '#0d6efd' 
        },
        { 
            label: 'Total Products', 
            value: MOCK_PRODUCTS.length, 
            icon: 'bi-box-seam', 
            bg: '#ffc107' 
        },
        { 
            label: 'Low Stock Items', 
            value: lowStockProducts.length, 
            icon: 'bi-exclamation-triangle-fill', 
            bg: '#dc3545' 
        }
    ];

    return (
        <div className="admin-dashboard-container">
            <h3 className="fw-normal mb-4" style={{ letterSpacing: '-0.5px' }}>
                Dashboard — <span className="text-muted fs-6">Welcome, admin</span>
            </h3>
            
            {/* KPI Cards */}
            <div className="row g-3 mb-4">
                {stats.map(stat => (
                    <div key={stat.label} className="col-md-6 col-xl-3">
                        <div className="card border-0 shadow-sm h-100 text-white text-center py-4 rounded-3" style={{ backgroundColor: stat.bg }}>
                            <div className="card-body p-0 d-flex flex-column align-items-center justify-content-center">
                                <i className={`bi ${stat.icon} fs-1 mb-2 d-block`}></i>
                                <h2 className="fw-bold mb-0">{stat.value}</h2>
                                <p className="mb-0 small opacity-75 fw-medium text-uppercase">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-3">
                {/* Recent Orders Table */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-bottom-0 pt-3 pb-0 ps-4">
                            <h6 className="fw-bold text-dark">Recent Orders (last 10)</h6>
                        </div>
                        <div className="card-body px-0">
                            <div className="table-responsive">
                                <table className="table table-white align-middle mb-0">
                                    <thead className="bg-light text-muted small text-uppercase">
                                        <tr>
                                            <th className="ps-4 fw-bold py-3" style={{ fontSize: '0.75rem' }}>Order ID</th>
                                            <th className="fw-bold py-3" style={{ fontSize: '0.75rem' }}>Items</th>
                                            <th className="fw-bold py-3" style={{ fontSize: '0.75rem' }}>Total</th>
                                            <th className="pe-4 fw-bold py-3" style={{ fontSize: '0.75rem' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length > 0 ? (
                                            orders.slice(0, 10).map(order => (
                                                <tr key={order._id}>
                                                    <td className="ps-4 py-3"><span className="small text-muted">{order._id || order.id}</span></td>
                                                    <td>{order.items?.length || 0}</td>
                                                    <td className="py-3 text-dark fw-bold">${(order.total || 0).toFixed(2)}</td>
                                                    <td className="pe-4 py-3">
                                                        <span className="badge bg-secondary text-white px-3 py-2 rounded-2" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                                                            {order.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="ps-4 py-3"><span className="small text-muted">ORD-EXAMPLE-001</span></td>
                                                <td>1</td>
                                                <td className="py-3 text-dark fw-bold">$93.98</td>
                                                <td className="pe-4 py-3">
                                                    <span className="badge bg-secondary text-white px-3 py-2 rounded-2" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                                                        Cancelled
                                                    </span>
                                                </td>
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
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-bottom-0 pt-3 pb-0 ps-4 d-flex align-items-center">
                            <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                            <h6 className="fw-bold text-danger mb-0">Low Stock</h6>
                        </div>
                        <div className="card-body">
                            {lowStockProducts.length === 0 ? (
                                <p className="text-center text-muted py-4 small">Inventory levels are healthy.</p>
                            ) : (
                                <div className="list-group list-group-flush border-top">
                                    {lowStockProducts.slice(0, 5).map(product => (
                                        <div key={product._id || product.id} className="list-group-item px-0 d-flex align-items-center justify-content-between py-3">
                                            <span className="text-dark small fw-medium pe-2 text-truncate" style={{ maxWidth: '200px' }}>{product.name}</span>
                                            <span className="badge bg-danger rounded-pill px-2 py-1" style={{ fontSize: '0.65rem' }}>
                                                {product.stock} left
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
