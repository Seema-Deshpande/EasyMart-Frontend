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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button 
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button 
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {activeTab === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={errors.password ? 'error' : ''}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {activeTab === 'register' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}

          <div className="auth-actions">
            <button type="submit" className="submit-auth-btn">
              {activeTab === 'login' ? 'Login' : 'Create Account'}
            </button>
            <button type="button" className="cancel-auth-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
