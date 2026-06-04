import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/authSlice';
import * as userService from '../../service/userService';
import Notification from '../../component/common/Notification';

const AddressesPage = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        label: 'Home',
        fullName: user?.name || '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isDefault: false
    });

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const data = await userService.getAddresses();
            setAddresses(data || []);
        } catch (err) {
            showNotification('Failed to load addresses', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await userService.updateAddress(editingId, formData);
                showNotification('Address updated!', 'success');
            } else {
                await userService.addAddress(formData);
                showNotification('New address added!', 'success');
            }
            fetchAddresses();
            resetForm();
        } catch (err) {
            showNotification(err.response?.data?.message || 'Action failed', 'error');
        }
    };

    const resetForm = () => {
        setFormData({ 
            label: 'Home', 
            fullName: user?.name || '',
            street: '', 
            city: '', 
            state: '', 
            zipCode: '', 
            country: '', 
            isDefault: false 
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleEdit = (address) => {
        const { _id, ...rest } = address;
        setFormData(rest);
        setEditingId(_id);
        setIsAdding(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await userService.deleteAddress(id);
                showNotification('Address deleted', 'success');
                fetchAddresses();
            } catch (err) {
                showNotification('Failed to delete address', 'error');
            }
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await userService.setDefaultAddress(id);
            showNotification('Default address updated', 'success');
            fetchAddresses();
        } catch (err) {
            showNotification('Failed to set default address', 'error');
        }
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
                                            <label className="form-label">Full Name</label>
                                            <input type="text" className="form-control" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                                        </div>
                                        <div className="col-md-12">
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
                                            <input type="text" className="form-control" required value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} />
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
                                                    <li><button className="dropdown-item" onClick={() => handleSetDefault(address._id)}>Set as Default</button></li>
                                                )}
                                                <li><button className="dropdown-item" onClick={() => handleEdit(address)}>Edit</button></li>
                                                <li><button className="dropdown-item text-danger" onClick={() => handleDelete(address._id)}>Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h6 className="fw-bold mb-1">{address.fullName}</h6>
                                    <p className="text-muted mb-0">{address.street}</p>
                                    <p className="text-muted mb-0">{address.city}, {address.state} {address.zipCode}</p>
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
