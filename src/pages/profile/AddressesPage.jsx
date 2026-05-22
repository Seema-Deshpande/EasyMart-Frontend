import { useState } from 'react';
import useAuth from '../../context/useAuth';
import Notification from '../../component/common/Notification';

const AddressesPage = () => {
    const { user, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
    const addresses = user?.addresses || [];
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [notification, setNotification] = useState(null);
    
    const [formData, setFormData] = useState({
        label: 'Home',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        isDefault: false
    });

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateAddress(editingId, formData);
            showNotification('Address updated!', 'success');
        } else {
            addAddress(formData);
            showNotification('New address added!', 'success');
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ label: 'Home', street: '', city: '', state: '', zip: '', country: '', isDefault: false });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleEdit = (address) => {
        const { _id, ...rest } = address;
        setFormData(rest);
        setEditingId(_id);
        setIsAdding(true);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold mb-0">My Addresses</h1>
                {!isAdding && (
                    <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
                        <i className="bi bi-plus-lg me-2"></i> Add New Address
                    </button>
                )}
            </div>

            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

            <div className="row g-4">
                {isAdding && (
                    <div className="col-12">
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">{editingId ? 'Edit Address' : 'Add New Address'}</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Address Label (Home/Work/Other)</label>
                                            <select className="form-select" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})}>
                                                <option>Home</option>
                                                <option>Work</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Street Address</label>
                                            <input type="text" className="form-control" required value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">City</label>
                                            <input type="text" className="form-control" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">State</label>
                                            <input type="text" className="form-control" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Zip Code</label>
                                            <input type="text" className="form-control" required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label">Country</label>
                                            <input type="text" className="form-control" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="defaultAddr" checked={formData.isDefault} onChange={e => setFormData({...formData, isDefault: e.target.checked})} />
                                                <label className="form-check-label" htmlFor="defaultAddr">Set as default address</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2 mt-4">
                                        <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>Cancel</button>
                                        <button type="submit" className="btn btn-primary px-4">{editingId ? 'Update' : 'Save'} Address</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {addresses.length === 0 && !isAdding ? (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted">No addresses saved yet.</p>
                    </div>
                ) : (
                    addresses.map(address => (
                        <div key={address._id} className="col-md-6">
                            <div className={`card h-100 shadow-sm border-0 ${address.isDefault ? 'border-start border-primary border-4' : ''}`}>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <span className="badge bg-light text-primary mb-2">{address.label}</span>
                                            {address.isDefault && <span className="ms-2 badge bg-primary">Default</span>}
                                        </div>
                                        <div className="dropdown">
                                            <button className="btn btn-link text-muted p-0" data-bs-toggle="dropdown">
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                {!address.isDefault && (
                                                    <li><button className="dropdown-item" onClick={() => setDefaultAddress(address._id)}>Set as Default</button></li>
                                                )}
                                                <li><button className="dropdown-item" onClick={() => handleEdit(address)}>Edit</button></li>
                                                <li><button className="dropdown-item text-danger" onClick={() => deleteAddress(address._id)}>Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h6 className="fw-bold mb-1">{address.street}</h6>
                                    <p className="text-muted mb-0">{address.city}, {address.state} {address.zip}</p>
                                    <p className="text-muted mb-0">{address.country}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AddressesPage;
