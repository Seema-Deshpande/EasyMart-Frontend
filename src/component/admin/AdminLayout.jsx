import { Outlet, NavLink, Link } from 'react-router-dom';

const AdminLayout = () => {
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
    { path: '/admin/products', label: 'Products', icon: 'bi-box-seam' },
    { path: '/admin/orders', label: 'Orders', icon: 'bi-file-earmark-text' },
    { path: '/admin/users', label: 'Users', icon: 'bi-people' }
  ];

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row g-4">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2">
          <div className="card border-0 shadow-sm overflow-hidden sticky-top" style={{ top: '1rem' }}>
            <div className="p-4 text-center text-white" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}>
              <h5 className="mb-0 fw-bold">Admin Panel</h5>
            </div>
            <div className="list-group list-group-flush py-2">
              {menuItems.map(item => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  end={item.path === '/admin'}
                  className={({ isActive }) => 
                    `list-group-item list-group-item-action border-0 d-flex align-items-center px-4 py-3 transition ${isActive ? 'active shadow-sm' : 'text-dark'}`
                  }
                  style={({ isActive }) => isActive ? { backgroundColor: '#007bff', borderRight: '4px solid #0056b3' } : {}}
                >
                  {({ isActive }) => (
                    <>
                      <i className={`bi ${item.icon} me-3 ${isActive ? 'text-white' : 'text-muted'}`}></i>
                      <span className="fw-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            <div className="p-3 border-top mt-2">
              <Link to="/" className="btn btn-sm btn-outline-dark w-100 rounded-pill">
                <i className="bi bi-arrow-left me-2"></i> Storefront
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
