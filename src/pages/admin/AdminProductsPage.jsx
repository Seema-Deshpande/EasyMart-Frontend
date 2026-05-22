import { useState } from 'react';
import { MOCK_PRODUCTS } from '../../data/products';
import Notification from '../../component/common/Notification';

const AdminProductsPage = () => {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [notification, setNotification] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', category: '', price: '', stock: '', description: ''
    });

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this product?')) {
            setProducts(products.filter(p => (p._id || p.id) !== id));
            showNotification('Product deleted', 'success');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            setProducts(products.map(p => 
                (p._id || p.id) === (editingProduct._id || editingProduct.id) 
                ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) } 
                : p
            ));
            showNotification('Product updated', 'success');
        } else {
            const newProduct = {
                ...formData,
                id: Date.now(),
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                rating: 0
            };
            setProducts([newProduct, ...products]);
            showNotification('Product added', 'success');
        }
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({ name: '', category: '', price: '', stock: '', description: '' });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Products Management</h2>
                <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
                    <i className="bi bi-plus-lg me-2"></i> Add Product
                </button>
            </div>

            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-4 py-3">Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th className="text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id || product.id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <img src={product.image || 'https://via.placeholder.com/40'} alt="" className="rounded me-3" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                                <span className="fw-bold">{product.name}</span>
                                            </div>
                                        </td>
                                        <td>{product.category}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${product.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                                                {product.stock} units
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(product)}>
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product._id || product.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Simple Modal Implementation using state */}
            {isModalOpen && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0">
                            <form onSubmit={handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="fw-bold">{editingProduct ? 'Edit Product' : 'Add Product'}</h5>
                                    <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Product Name</label>
                                        <input type="text" className="form-control" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Category</label>
                                            <input type="text" className="form-control" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Price</label>
                                            <input type="number" step="0.01" className="form-control" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Stock Quantity</label>
                                        <input type="number" className="form-control" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-light" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary px-4">Save Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;
