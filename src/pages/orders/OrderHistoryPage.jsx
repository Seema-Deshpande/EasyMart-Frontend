import { useNavigate, Link } from 'react-router-dom';
import useOrder from '../../context/useOrder';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const { orders, cancelOrder } = useOrder();
  const navigate = useNavigate();

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-warning text-dark';
      case 'shipped': return 'bg-info';
      case 'delivered': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5">
          <i className="bi bi-bag-x display-1 text-muted mb-4"></i>
          <h2 className="fw-bold">No orders found</h2>
          <p className="text-muted mb-4">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn btn-primary px-5 fw-bold">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Order History</h1>
      <div className="row g-4">
        {orders.map(order => (
          <div key={order._id} className="col-12">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="card-header bg-light border-0 py-3 px-4">
                <div className="row align-items-center">
                  <div className="col-md-3 text-truncate">
                    <small className="text-muted text-uppercase d-block mb-1">Order #</small>
                    <span className="fw-bold">{order._id}</span>
                  </div>
                  <div className="col-md-2">
                    <small className="text-muted text-uppercase d-block mb-1">Date</small>
                    <span className="fw-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="col-md-2">
                    <small className="text-muted text-uppercase d-block mb-1">Total</small>
                    <span className="fw-bold text-primary">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="col-md-2">
                    <small className="text-muted text-uppercase d-block mb-1">Status</small>
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
                  </div>
                  <div className="col-md-3 text-md-end mt-2 mt-md-0">
                    <button 
                      className="btn btn-sm btn-outline-primary me-2" 
                      onClick={() => navigate(`/orders/${order._id}`)}
                    >
                      View Details
                    </button>
                    {order.status === 'Pending' && (
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => cancelOrder(order._id)}
                        >
                          Cancel Order
                        </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-body px-4">
                <div className="row g-3">
                  {order.items.slice(0, 3).map(item => (
                    <div key={item._id || item.id} className="col-md-4">
                      <div className="d-flex align-items-center">
                        <img 
                          src={(item.images && item.images[0]) || item.image || 'https://via.placeholder.com/60x60?text=Product'} 
                          alt={item.name} 
                          className="rounded me-3"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          onError={(e) => e.target.src = 'https://via.placeholder.com/60x60?text=P'}
                        />
                        <div className="text-truncate">
                          <p className="mb-0 fw-bold small">{item.name}</p>
                          <small className="text-muted">Qty: {item.quantity}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="text-muted small">+{order.items.length - 3} more items</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
