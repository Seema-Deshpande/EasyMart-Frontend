const Navbar = ({ isLoggedIn, user, onLogout, onNavigate, currentPage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ background: '#667eea' }}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center clickable" onClick={() => onNavigate('home')}>
          <i className="bi bi-bag-fill me-2 fs-3"></i>
          <span className="fw-bold fs-4">EasyMart</span>
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2 gap-lg-3 py-3 py-lg-0">
            <li className="nav-item">
              <a 
                className={`nav-link fw-bold clickable ${currentPage === 'home' ? 'active' : ''}`} 
                onClick={() => onNavigate('home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link fw-bold clickable ${currentPage === 'products' ? 'active' : ''}`} 
                onClick={() => onNavigate('products')}
              >
                Products
              </a>
            </li>
            <li className="nav-item mt-2 mt-lg-0">
              {!isLoggedIn ? (
                <button 
                  className="btn btn-outline-light px-3 py-1 w-100" 
                  onClick={() => onNavigate('login')}
                >
                  Login / Register
                </button>
              ) : (
                <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
                  <span className="navbar-text text-light opacity-75">Hi, {user?.name}</span>
                  <button className="btn btn-outline-light btn-sm fw-bold w-100" onClick={onLogout}>
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
