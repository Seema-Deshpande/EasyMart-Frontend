import { useState } from 'react';

const AdminUsersPage = () => {
    // TODO: Fetch users from API (e.g., GET /api/users)
    const [users] = useState([
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'user', joined: '2024-01-15', avatar: 'AS' },
        { id: 2, name: 'Admin User', email: 'admin@easymart.com', role: 'admin', joined: '2023-12-01', avatar: 'AU' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', joined: '2024-02-10', avatar: 'BJ' },
        { id: 4, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', joined: '2024-03-05', avatar: 'CB' },
        { id: 5, name: 'Diana Prince', email: 'diana@example.com', role: 'user', joined: '2024-04-12', avatar: 'DP' }
    ]);

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
                                    <tr key={user.id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold text-white shadow-sm ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`} style={{ width: '38px', height: '38px', fontSize: '0.85rem' }}>
                                                    {user.avatar}
                                                </div>
                                                <span className="fw-bold text-dark">{user.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-muted">{user.email}</span>
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${user.role === 'admin' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-primary bg-opacity-10 text-primary'}`} style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                                                {user.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-secondary small">
                                                <i className="bi bi-calendar3 me-2"></i>
                                                {new Date(user.joined).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-outline-info me-2 shadow-sm" title="View Details">
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button 
                                                className={`btn btn-sm shadow-sm ${user.role === 'admin' ? 'btn-light disabled' : 'btn-outline-danger'}`} 
                                                title={user.role === 'admin' ? 'Cannot disable admin' : 'Disable User'}
                                            >
                                                <i className="bi bi-slash-circle"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 p-3 bg-light rounded-3 border">
                <p className="mb-0 small text-muted text-center">
                    <i className="bi bi-info-circle me-2"></i>
                    Admin users cannot be disabled via the dashboard for security purposes.
                </p>
            </div>
        </div>
    );
};

export default AdminUsersPage;
