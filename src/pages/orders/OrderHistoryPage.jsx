import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders, cancelOrder } from '../../store/ordersSlice';
import { getProductImage } from '../../utils/imageHelper';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const handleCancelOrder = async (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(cancelOrder(id));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-warning text-dark';
      case 'processing': return 'bg-info text-dark';
      case 'shipped': return 'bg-primary';
      case 'delivered': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading orders...</p>
      </div>
    );
  }

  if (error) return <div className="container py-5 text-center text-danger">{error}</div>;

  // Ensure orders is an array - handle case where API returns object with orders property
  const orderList = Array.isArray(orders) ? orders : (orders?.orders || []);

  if (!orderList || orderList.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5">
          <i className="bi bi-bag-x display-1 text-muted mb-4"></i>
          <h2 className="fw-bold">No Orders Yet</h2>
          <p className="text-muted mb-4">You haven't placed any orders yet.</p>
          <a href="/products" className="btn btn-primary px-5 fw-bold">Start Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Order History</h1>
      <div className="row g-4">
        {orderList.map(order => {
          // Get first product for preview
          const firstProduct = order.orderItems?.[0];
          const productImage = firstProduct ? getProductImage(firstProduct.product || firstProduct) : null;
          const productName = firstProduct?.product?.name || firstProduct?.name || 'Product';
          
          return (
            <div key={order._id} className="col-12">
              <div className="card order-card border-0 shadow-sm overflow-hidden h-100">
                <div className="card-body p-0">
                  <div className="row g-0 h-100">
                    {/* Product Image Preview */}
                    <div className="col-md-2 product-preview-wrapper">
                      <img 
                        src={productImage} 
                        alt={productName}
                        className="product-preview-img"
                      />
                      {order.orderItems?.length > 1 && (
                        <div className="items-count-badge">
                          +{order.orderItems.length - 1}
                        </div>
                      )}
                    </div>

                    {/* Order Info */}
                    <div className="col-md-10 p-4">
                      <div className="row align-items-start mb-3">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <small className="text-muted text-uppercase d-block mb-1">Order ID</small>
                            <span className="fw-bold text-truncate d-block">{order._id}</span>
                          </div>
                          <div className="mb-3">
                            <small className="text-muted text-uppercase d-block mb-1">First Item</small>
                            <span className="fw-bold text-truncate d-block">{productName}</span>
                          </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <div className="mb-2">
                            <small className="text-muted text-uppercase d-block mb-1">Date</small>
                            <span className="fw-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted text-uppercase d-block mb-1">Status</small>
                            <span className={`badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="row align-items-end">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted text-uppercase d-block mb-1">Items</small>
                              <span className="fw-bold fs-5">{order.orderItems?.length || 0}</span>
                            </div>
                            <div className="col-6">
                              <small className="text-muted text-uppercase d-block mb-1">Total</small>
                              <span className="fw-bold fs-5 text-primary">${(order.totalPrice || 0).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 text-md-end">
                          <a 
                            href={`/orders/${order._id}`}
                            className="btn btn-sm btn-primary me-2"
                          >
                            View Details
                          </a>
                          {order.status === 'Pending' && (
                              <button 
                                className="btn btn-sm btn-outline-danger" 
                                onClick={() => handleCancelOrder(order._id)}
                              >
                                Cancel
                              </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
