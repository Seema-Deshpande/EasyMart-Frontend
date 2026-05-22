import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../context/useCart';
import useOrder from '../../context/useOrder';
import useAuth from '../../context/useAuth';
import Notification from '../../component/common/Notification';
import { PAYMENT_METHODS } from '../../utils/ constant';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const { cartItems, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const [shippingData, setShippingData] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'credit-card',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = totalPrice;
  const tax = subtotal * 0.10;
  const shipping_fee = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping_fee;

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!shippingData.fullName || !shippingData.address || !shippingData.city || !shippingData.state || !shippingData.zipCode || !shippingData.country) {
        showNotification('Please fill all shipping fields', 'error');
        return;
      }
    }
    if (step === 2) {
      if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
        showNotification('Please fill all payment fields', 'error');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleQuickFill = (addr) => {
    setShippingData({
      fullName: user?.name || '',
      address: addr.address,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      country: addr.country
    });
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      items: cartItems,
      shippingAddress: shippingData,
      paymentMethod: paymentData.paymentMethod,
      subtotal,
      tax,
      shipping_fee,
      total
    };
    
    const newOrder = placeOrder(orderDetails);
    showNotification('Order placed successfully! Redirecting...', 'success');
    
    setTimeout(() => {
      clearCart();
      navigate(`/orders/${newOrder._id}`);
    }, 1500);
  };

  useEffect(() => {
    if (cartItems.length === 0 && step < 4) {
      navigate('/cart');
    }
  }, [cartItems.length, step, navigate]);

  if (cartItems.length === 0 && step < 4) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <div className="d-flex justify-content-between mb-5">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`d-flex align-items-center ${step >= s ? 'text-primary' : 'text-muted'}`}>
                    <div className={`rounded-circle border border-2 d-flex align-items-center justify-content-center me-2 ${step >= s ? 'border-primary' : 'border-secondary'}`} style={{ width: '30px', height: '30px', fontWeight: 'bold' }}>
                      {s}
                    </div>
                    <span className="fw-bold d-none d-md-inline">{s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}</span>
                    {s < 3 && <div className="mx-2 mx-md-3 bg-secondary opacity-25" style={{ height: '2px', width: '30px' }}></div>}
                  </div>
                ))}
              </div>

              {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

              {step === 1 && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Shipping Information</h4>
                    {user?.addresses?.length > 0 && (
                      <div className="dropdown">
                        <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Quick Fill
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          {user.addresses.map((addr) => (
                            <li key={addr._id}>
                              <button className="dropdown-item" onClick={() => handleQuickFill(addr)}>
                                {addr.address}, {addr.city}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control" value={shippingData.fullName} onChange={e => setShippingData({...shippingData, fullName: e.target.value})} placeholder="John Doe" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input type="text" className="form-control" value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} placeholder="123 Main St" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input type="text" className="form-control" value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} placeholder="City" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">State</label>
                      <input type="text" className="form-control" value={shippingData.state} onChange={e => setShippingData({...shippingData, state: e.target.value})} placeholder="State" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Zip Code</label>
                      <input type="text" className="form-control" value={shippingData.zipCode} onChange={e => setShippingData({...shippingData, zipCode: e.target.value})} placeholder="Zip" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Country</label>
                      <input type="text" className="form-control" value={shippingData.country} onChange={e => setShippingData({...shippingData, country: e.target.value})} placeholder="Country" />
                    </div>
                  </div>
                  <button className="btn btn-primary w-100 mt-4 py-3 fw-bold" onClick={handleNext}>Continue to Payment</button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h4 className="fw-bold mb-4">Payment Details</h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Payment Method</label>
                      <select className="form-select" value={paymentData.paymentMethod} onChange={e => setPaymentData({...paymentData, paymentMethod: e.target.value})}>
                        {PAYMENT_METHODS.map(method => (
                          <option key={method.value} value={method.value}>{method.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Name on Card</label>
                      <input type="text" className="form-control" value={paymentData.cardName} onChange={e => setPaymentData({...paymentData, cardName: e.target.value})} placeholder="John Doe" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Card Number</label>
                      <input type="text" className="form-control" placeholder="0000 0000 0000 0000" value={paymentData.cardNumber} onChange={e => setPaymentData({...paymentData, cardNumber: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Expiry Date</label>
                      <input type="text" className="form-control" placeholder="MM/YY" value={paymentData.expiry} onChange={e => setPaymentData({...paymentData, expiry: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">CVV</label>
                      <input type="text" className="form-control" placeholder="000" value={paymentData.cvv} onChange={e => setPaymentData({...paymentData, cvv: e.target.value})} />
                    </div>
                  </div>
                  <div className="d-flex gap-2 mt-4">
                    <button className="btn btn-outline-secondary flex-grow-1 py-3 fw-bold" onClick={handleBack}>Back</button>
                    <button className="btn btn-primary flex-grow-1 py-3 fw-bold" onClick={handleNext}>Review Order</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h4 className="fw-bold mb-4">Review Your Order</h4>
                  
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6 className="fw-bold text-muted text-uppercase small mb-2">Shipping to:</h6>
                      <p className="mb-0 small text-muted">
                        {shippingData.fullName}<br />
                        {shippingData.address}<br />
                        {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                        {shippingData.country}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold text-muted text-uppercase small mb-2">Payment:</h6>
                      <p className="mb-0 small text-muted">
                        {PAYMENT_METHODS.find(m => m.value === paymentData.paymentMethod)?.label}<br />
                        Card ending in {paymentData.cardNumber.slice(-4) || '****'}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-muted text-uppercase small mb-2">Order Items:</h6>
                    <ul className="list-group list-group-flush mb-3">
                      {cartItems.map(item => (
                        <li key={item._id || item.id} className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent">
                          <span className="small">{item.name} x {item.quantity}</span>
                          <span className="fw-bold small">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-light p-4 rounded-3 mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Subtotal:</span>
                      <span className="fw-bold small">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Tax (10%):</span>
                      <span className="fw-bold small">${tax.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Shipping:</span>
                      <span className="fw-bold small">${shipping_fee.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fs-5 fw-bold text-primary">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button className="btn btn-outline-secondary flex-grow-1 py-3 fw-bold" onClick={handleBack}>Back</button>
                    <button className="btn btn-success flex-grow-1 py-3 fw-bold" onClick={handlePlaceOrder}>Place Order</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
