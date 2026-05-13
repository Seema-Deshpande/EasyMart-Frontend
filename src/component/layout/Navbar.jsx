import logo from '../../assets/hero.png';

const Navbar = ({ isLoggedIn, user, onLogout, onNavigate, currentPage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center clickable" onClick={() => onNavigate('home')}>
          {/* Using filter: brightness(0) invert(1) ensures the icon is pure white for dark mode */}
          <img 
            src={logo} 
            alt="EasyMart" 
            width="35" 
            height="35" 
            className="d-inline-block align-top me-2" 
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="fw-bold fs-4">EasyMart</span>
        </a>
        
        <div className="ms-auto d-flex align-items-center">
          <ul className="navbar-nav flex-row align-items-center gap-2 gap-sm-3">
            <li className="nav-item">
              <a 
                className={`nav-link px-2 clickable ${currentPage === 'home' ? 'active' : ''}`} 
                onClick={() => onNavigate('home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link px-2 clickable ${currentPage === 'products' ? 'active' : ''}`} 
                onClick={() => onNavigate('products')}
              >
                Products
              </a>
            </li>
            <li className="nav-item ms-lg-3">
              {isLoggedIn ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="navbar-text d-none d-md-inline text-light opacity-75">Hi, {user?.name}</span>
                  <button className="btn btn-outline-warning btn-sm fw-bold border-2" onClick={onLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-warning btn-sm fw-bold px-3 border-2 shadow-sm" 
                  onClick={() => onNavigate('login')}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
