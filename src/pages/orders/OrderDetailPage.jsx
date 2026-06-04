import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderById, cancelOrder, clearCurrentOrder } from '../../store/ordersSlice';
import { getProductImage, generatePlaceholderImage } from '../../utils/imageHelper';

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, id]);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(cancelOrder(id));
    }
  };

  if (loading) return <div className="container py-5 text-center">Loading order details...</div>;
  if (error) return <div className="container py-5 text-center text-danger">{error}</div>;

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h2>Order not found</h2>
        <Link to="/orders" className="btn btn-primary mt-3">Back to Orders</Link>
      </div>
    );
  }

  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="w-75">
          <Link to="/orders" className="text-decoration-none text-muted mb-2 d-inline-block">
            <i className="bi bi-arrow-left me-1"></i> Back to Orders
          </Link>
          <h1 className="fw-bold mb-0 text-truncate">Order #{order._id}</h1>
        </div>
        <div className="d-flex gap-2">
          {order.status === 'Pending' && (
            <button 
              className="btn btn-outline-danger" 
              onClick={handleCancel}
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {/* Visual Status Tracker */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Status</h5>
              {order.status === 'Cancelled' ? (
                <div className="alert alert-danger mb-0">This order has been cancelled.</div>
              ) : (
                <div className="d-flex justify-content-between position-relative pt-4 pb-2">
                  <div className="position-absolute bg-light" style={{ height: '4px', width: '100%', top: '35px', left: 0, zIndex: 0 }}></div>
                  <div className="position-absolute bg-primary" style={{ height: '4px', width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%`, top: '35px', left: 0, zIndex: 1, transition: 'width 0.3s ease' }}></div>
                  
                  {steps.map((step, index) => (
                    <div key={step} className="text-center position-relative" style={{ width: '80px', zIndex: 2 }}>
                      <div className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center ${index <= currentStepIndex ? 'bg-primary text-white border-primary' : 'bg-white border text-muted'}`} style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                        {index <= currentStepIndex ? <i className="bi bi-check-lg"></i> : index + 1}
                      </div>
                      <span className={`small fw-bold d-block ${index <= currentStepIndex ? 'text-primary' : 'text-muted'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Items List */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Items</h5>
              <div className="table-responsive">
                <table className="table align-middle">
                  <tbody>
                    {(order.orderItems || []).map(item => (
                      <tr key={item._id || item.id}>
                        <td style={{ width: '80px' }}>
                          <img 
                            src={getProductImage(item.product || item)} 
                            alt={item.name} 
                            className="rounded me-3" 
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                            onError={(e) => e.target.src = generatePlaceholderImage(item.name || 'Product', 80, 80)}
                          />
                        </td>
                        <td>
                          <h6 className="mb-0 fw-bold">{item.name}</h6>
                          <small className="text-muted">{item.quantity} x ${item.price?.toFixed(2)}</small>
                        </td>
                        <td className="text-end fw-bold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Shipping Address</h5>
              {order.shippingAddress ? (
                <>
                  <p className="mb-1 fw-bold">{order.shippingAddress.fullName}</p>
                  <p className="mb-1 text-muted">{order.shippingAddress.address}</p>
                  <p className="mb-1 text-muted">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p className="mb-0 text-muted">{order.shippingAddress.country} - {order.shippingAddress.zipCode}</p>
                </>
              ) : (
                <p className="text-muted mb-0">No shipping address recorded.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Order Summary */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${((order.totalAmount || order.total || 0) - (order.taxPrice || 0) - (order.shippingPrice || 0)).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tax</span>
                <span>${(order.taxPrice || 0).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span className={order.shippingPrice === 0 ? 'text-success fw-bold' : ''}>
                  {order.shippingPrice === 0 ? 'Free' : `$${(order.shippingPrice || 0).toFixed(2)}`}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-0 h5 fw-bold">
                <span>Total</span>
                <span className="text-primary">${(order.totalAmount || order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Payment Method</h5>
              <div className="d-flex align-items-center">
                <div className="bg-light rounded p-2 me-3">
                  <i className="bi bi-credit-card h4 mb-0 text-primary"></i>
                </div>
                <div>
                  <p className="mb-0 fw-bold text-capitalize">{order.paymentMethod || 'Credit Card'}</p>
                  <small className={`badge ${order.isPaid ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {order.isPaid ? 'Paid' : 'Pending Payment'}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
