const Navbar = ({ isLoggedIn, user, onLogout, onNavigate, currentPage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center clickable" onClick={() => onNavigate('home')}>
          <img src="/logo.png" alt="EasyMart" width="30" height="30" className="d-inline-block align-top me-2" />
          EasyMart
        </a>
        <div className="d-flex align-items-center">
          <ul className="navbar-nav flex-row align-items-center gap-3">
            <li className="nav-item">
              <a 
                className={`nav-link clickable ${currentPage === 'home' ? 'active' : ''}`} 
                onClick={() => onNavigate('home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link clickable ${currentPage === 'products' ? 'active' : ''}`} 
                onClick={() => onNavigate('products')}
              >
                Products
              </a>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">Hello, {user?.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button 
                  className="btn btn-outline-light btn-sm" 
                  onClick={() => onNavigate('login')}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
