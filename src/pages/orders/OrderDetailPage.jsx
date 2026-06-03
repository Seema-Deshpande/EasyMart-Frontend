import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderById, cancelOrder, clearCurrentOrder } from '../../store/ordersSlice';

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
        <div>
          <Link to="/orders" className="text-decoration-none text-muted mb-2 d-inline-block">
            <i className="bi bi-arrow-left me-1"></i> Back to Orders
          </Link>
          <h1 className="fw-bold mb-0">Order #{order._id}</h1>
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
          <button className="btn btn-outline-primary">Download Invoice</button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {/* Order Tracker */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Tracker</h5>
              {order.status === 'Cancelled' ? (
                <div className="alert alert-danger mb-0">This order has been cancelled.</div>
              ) : (
                <div className="d-flex justify-content-between position-relative pt-4 pb-2">
                  <div className="position-absolute bg-light" style={{ height: '4px', width: '100%', top: '35px', left: 0, zIndex: 0 }}></div>
                  <div className="position-absolute bg-primary" style={{ height: '4px', width: `${(currentStepIndex / (steps.length - 1)) * 100}%`, top: '35px', left: 0, zIndex: 1, transition: 'width 0.3s ease' }}></div>
                  
                  {steps.map((step, index) => (
                    <div key={step} className="text-center position-relative" style={{ width: '80px', zIndex: 2 }}>
                      <div className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center ${index <= currentStepIndex ? 'bg-primary text-white' : 'bg-white border text-muted'}`} style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                        {index < currentStepIndex ? <i className="bi bi-check"></i> : index + 1}
                      </div>
                      <span className={`small fw-bold ${index <= currentStepIndex ? 'text-primary' : 'text-muted'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Items</h5>
              <div className="table-responsive">
                <table className="table align-middle">
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item._id || item.id}>
                        <td style={{ width: '80px' }}>
                          <img 
                            src={(item.images && item.images[0]) || item.image || 'https://via.placeholder.com/60x60'} 
                            alt={item.name} 
                            className="rounded" 
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                            onError={(e) => e.target.src = 'https://via.placeholder.com/60x60?text=P'}
                          />
                        </td>
                        <td>
                          <h6 className="mb-0 fw-bold">{item.name}</h6>
                          <small className="text-muted">${item.price.toFixed(2)}</small>
                        </td>
                        <td className="text-center">Qty: {item.quantity}</td>
                        <td className="text-end fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Shipment Details</h5>
              {order.shippingAddress ? (
                <>
                  <p className="mb-1 fw-bold">{order.shippingAddress.fullName}</p>
                  <p className="text-muted mb-3">
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                  </p>
                </>
              ) : (
                <p className="text-muted mb-3">No shipping address provided.</p>
              )}
              <hr />
              <h6 className="fw-bold mb-3">Payment Method</h6>
              <div className="d-flex align-items-center">
                <i className="bi bi-credit-card fs-4 me-2"></i>
                <span className="text-muted">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="bg-white" />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
