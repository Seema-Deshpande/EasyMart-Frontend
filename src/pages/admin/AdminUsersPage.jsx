import { useState, useEffect } from 'react';
import { adminGetUsers, adminUpdateUserRole, adminDeleteUser } from '../../service/adminService';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await adminGetUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            await adminUpdateUserRole(userId, newRole);
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (err) {
            alert('Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await adminDeleteUser(userId);
                setUsers(users.filter(u => u._id !== userId));
            } catch (err) {
                alert('Failed to delete user');
            }
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Users Management</h2>
                <div className="badge bg-primary rounded-pill px-3 py-2">Total Users: {users.length}</div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light text-muted small text-uppercase">
                                <tr>
                                    <th className="px-4 py-3">User Profile</th>
                                    <th>Email Address</th>
                                    <th>Role</th>
                                    <th>Joined Date</th>
                                    <th className="text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id || user.id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold text-white shadow-sm ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`} style={{ width: '38px', height: '38px', fontSize: '0.85rem' }}>
                                                    {user.name?.charAt(0) || 'U'}
                                                </div>
                                                <span className="fw-bold text-dark">{user.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-muted">{user.email}</span>
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${user.role === 'admin' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-primary bg-opacity-10 text-primary'}`} style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                                                {user.role?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-muted small">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border" type="button" data-bs-toggle="dropdown">
                                                    Manage
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                                    <li>
                                                        <button 
                                                            className="dropdown-item" 
                                                            onClick={() => handleRoleUpdate(user._id || user.id, user.role === 'admin' ? 'user' : 'admin')}
                                                        >
                                                            Switch to {user.role === 'admin' ? 'User' : 'Admin'}
                                                        </button>
                                                    </li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li>
                                                        <button 
                                                            className="dropdown-item text-danger" 
                                                            onClick={() => handleDeleteUser(user._id || user.id)}
                                                        >
                                                            Delete User
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;
