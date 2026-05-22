import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import Notification from '../../component/common/Notification';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setNotification({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({ message: 'Passwords do not match', type: 'error' });
      return;
    }

    // Determine role based on email as per requirements
    const role = email === 'admin@easymart.com' ? 'admin' : 'user';

    login({ email, name, role });
    setNotification({ message: 'Account created and logged in!', type: 'success' });
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h2 className="text-center fw-bold mb-4">Register</h2>
              {notification && (
                <Notification 
                  message={notification.message} 
                  type={notification.type} 
                  onClose={() => setNotification(null)} 
                />
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    name="name"
                    type="text" 
                    className="form-control" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input 
                    name="email"
                    type="email" 
                    className="form-control" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    name="password"
                    type="password" 
                    className="form-control" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input 
                    name="confirmPassword"
                    type="password" 
                    className="form-control" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 fw-bold py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
                <div className="text-center text-muted">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
