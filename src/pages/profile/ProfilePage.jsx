import { useState } from 'react';
import useAuth from '../../context/useAuth';
import Notification from '../../component/common/Notification';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile({ name: formData.name, phone: formData.phone });
    setIsEditing(false);
    showNotification('Profile updated successfully!', 'success');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">My Profile</h2>
                {!isEditing && (
                  <button className="btn btn-outline-primary btn-sm" onClick={() => {
                    setFormData({
                      name: user?.name || '',
                      phone: user?.phone || '',
                      email: user?.email || ''
                    });
                    setIsEditing(true);
                  }}>
                    <i className="bi bi-pencil me-1"></i> Edit
                  </button>
                )}
              </div>

              {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

              <form onSubmit={handleUpdate}>
                <div className="mb-4 text-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <h5 className="fw-bold mb-0">{user?.name}</h5>
                  <p className="text-muted small">{user?.role === 'admin' ? 'Administrator' : 'Valued Customer'}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Email Address</label>
                  <input type="email" className="form-control-plaintext fw-bold" value={user?.email} readOnly />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Full Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="form-control" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                  ) : (
                    <p className="fw-bold mb-0">{user?.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold text-uppercase">Phone Number</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      className="form-control" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                    />
                  ) : (
                    <p className="fw-bold mb-0">{user?.phone || 'Not provided'}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="d-flex gap-2 pt-2">
                    <button type="button" className="btn btn-outline-secondary flex-grow-1" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary flex-grow-1">Save Changes</button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
