import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { fetchCart } from '../../store/cartSlice';
import Notification from '../../component/common/Notification';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setNotification({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      dispatch(fetchCart());
      setNotification({ message: 'Logged in successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setNotification({ message: result.payload || 'Login failed', type: 'error' });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h2 className="text-center fw-bold mb-4">Login</h2>
              {notification && (
                <Notification 
                  message={notification.message} 
                  type={notification.type} 
                  onClose={() => setNotification(null)} 
                />
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 fw-bold py-2 mb-3"
                >
                  Login
                </button>
                <div className="text-center text-muted">
                  Don't have an account? <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
