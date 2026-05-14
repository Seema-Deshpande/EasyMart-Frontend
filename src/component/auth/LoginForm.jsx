import { useState } from 'react';
import './LoginForm.css';
import { validateEmail } from '../../utils/helper';

const LoginForm = ({ onLogin, onCancel, showNotification }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Errors
  const [errors, setErrors] = useState({});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (activeTab === 'register' && !formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (activeTab === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (activeTab === 'login') {
        const name = formData.email.split('@')[0];
        onLogin({ name, email: formData.email });
        showNotification(`Welcome back, ${name}!`, 'success');
      } else {
        onLogin({ name: formData.fullName, email: formData.email });
        showNotification(`Account created for ${formData.fullName}!`, 'success');
      }
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="auth-card card shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header bg-white pb-0 border-bottom-0 text-center pt-4">
          <h2 className="fw-bold mb-3 text-dark">🛒 EasyMart Account</h2>
          <ul className="nav nav-tabs nav-fill">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => handleTabChange('login')}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => handleTabChange('register')}
              >
                Register
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {activeTab === 'register' && (
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️'}
                </button>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>

            {activeTab === 'register' && (
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️'}
                  </button>
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
              </div>
            )}

            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                {activeTab === 'login' ? 'Login' : 'Create Account'}
              </button>
              <button type="button" className="btn btn-outline-danger" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
