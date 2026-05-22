import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import useCart from '../../context/useCart';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ background: '#667eea' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-bag-fill me-2 fs-3"></i>
          <span className="fw-bold fs-4">EasyMart</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2 gap-lg-3 py-3 py-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-semibold" to="/products">Products</NavLink>
            </li>

            {/* Admin Link - Gold colored when user is admin */}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/admin" style={{ color: '#FFD700' }}>
                  <i className="bi bi-shield-lock me-1"></i> Admin
                </Link>
              </li>
            )}
            
            <li className="nav-item">
              <Link to="/cart" className="nav-link position-relative px-2">
                <i className="bi bi-cart3 fs-5"></i>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            <li className="nav-item dropdown ms-lg-2">
              {!user ? (
                <Link className="btn btn-outline-light px-4 rounded-pill fw-bold" to="/login">
                  Login
                </Link>
              ) : (
                <>
                  <button 
                    className="btn btn-link nav-link dropdown-toggle d-flex align-items-center gap-2" 
                    id="userDropdown" 
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                      <i className="bi bi-person-fill"></i>
                    </div>
                    <span className="fw-semibold">{user.name}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                    <li>
                      <Link className="dropdown-item py-2" to="/profile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/addresses">
                        My Address
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/orders">
                        Order History
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
