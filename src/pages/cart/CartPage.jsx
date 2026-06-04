import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../store/cartSlice';
import { getProductImage, generatePlaceholderImage } from '../../utils/imageHelper';
import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items: cartItems = [], totalPrice = 0 } = useSelector((state) => state.cart || {});
  const navigate = useNavigate();

  const shipping = totalPrice > 100 ? 0 : 5.99;
  const total = totalPrice + shipping;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5">
          <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
          <h2 className="fw-bold">Your cart is empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="btn btn-primary px-5 fw-bold">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container py-5">
      <h1 className="fw-bold mb-4">Shopping Cart</h1>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3 border-0">Product</th>
                      <th className="py-3 border-0">Price</th>
                      <th className="py-3 border-0">Quantity</th>
                      <th className="py-3 border-0">Total</th>
                      <th className="py-3 border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item._id}>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center">
                            <img 
                              src={getProductImage(item)} 
                              alt={item.name} 
                              className="rounded me-3" 
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                              onError={(e) => e.target.src = generatePlaceholderImage(item.name || 'Product', 80, 80)}
                            />
                            <div>
                                <h6 className="mb-0 fw-bold">{item.name}</h6>
                                <small className="text-muted">{item.category}</small>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">${item.price.toFixed(2)}</td>
                        <td className="py-3">
                          <div className="input-group input-group-sm" style={{ width: '100px' }}>
                            <button 
                              className="btn btn-outline-secondary" 
                              onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: item.quantity - 1 }))}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="input-group-text bg-white px-3">{item.quantity}</span>
                            <button 
                              className="btn btn-outline-secondary" 
                              onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: item.quantity + 1 }))}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-3 fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-3 text-end px-4">
                          <button 
                            className="btn btn-sm btn-outline-danger border-0" 
                            onClick={() => dispatch(removeCartItem(item._id))}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span className={shipping === 0 ? "text-success" : ""}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold mb-0">Total</h5>
                <h5 className="fw-bold mb-0 text-primary">${total.toFixed(2)}</h5>
              </div>
              <button 
                className="btn btn-primary w-100 fw-bold py-3"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn btn-link w-100 text-muted mt-2 text-decoration-none">
                <i className="bi bi-arrow-left me-2"></i> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
