import { Outlet, NavLink, Link } from 'react-router-dom';

const AdminLayout = () => {
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/admin/products', label: 'Products', icon: 'bi-box-seam' },
    { path: '/admin/orders', label: 'Orders', icon: 'bi-cart-check' },
    { path: '/admin/users', label: 'Users', icon: 'bi-people' }
  ];

  return (
    <div className="container-fluid pe-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark min-vh-100 d-flex flex-column p-0">
          <div className="p-4 border-bottom border-secondary">
            <h5 className="text-white mb-0 fw-bold">Admin Panel</h5>
          </div>
          <div className="flex-grow-1 py-4">
            {menuItems.map(item => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                end={item.path === '/admin'}
                className={({ isActive }) => 
                  `d-flex align-items-center px-4 py-3 text-decoration-none transition ${isActive ? 'bg-primary text-white' : 'text-secondary hover-bg-secondary'}`
                }
              >
                <i className={`bi ${item.icon} me-3`}></i>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          <div className="p-4 mt-auto border-top border-secondary">
             <Link to="/" className="btn btn-sm btn-outline-light w-100">
                <i className="bi bi-arrow-left me-2"></i> Back to Store
             </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 bg-light p-4 p-lg-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
