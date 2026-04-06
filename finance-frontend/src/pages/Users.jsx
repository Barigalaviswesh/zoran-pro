import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Check, X } from 'lucide-react';

const Users = () => {
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsersList(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (id, role) => {
        try {
            await api.post(`/users/${id}/role?role=${role}`);
            fetchUsers();
        } catch (err) {
            alert('Failed to update role.');
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await api.patch(`/users/${id}/status?status=${status}`);
            fetchUsers();
        } catch (err) {
            alert('Failed to update status.');
        }
    };

    if (user.role !== 'ADMIN') {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <ShieldAlert size={64} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                <h1>Access Denied</h1>
                <p style={{ color: 'var(--text-muted)' }}>You do not have administrative privileges to view this page.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>User Management</h1>

            <div className="table-container">
                {loading ? <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div> : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((u) => (
                                <tr key={u.id}>
                                    <td style={{ fontWeight: 500 }}>{u.name}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                                    <td>
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            style={{ background: 'var(--background)', color: 'var(--text-main)', border: '1px solid var(--border)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}
                                            disabled={u.email === user.email}
                                        >
                                            <option value="VIEWER">Viewer</option>
                                            <option value="ANALYST">Analyst</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span className={`tag ${u.status === 'ACTIVE' ? 'income' : 'expense'}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td>
                                        {u.email !== user.email && (
                                            <button
                                                onClick={() => handleStatusChange(u.id, u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                                                className="btn"
                                                style={{ padding: '0.25rem 0.5rem', background: 'var(--surface-hover)', fontSize: '0.75rem', color: 'white' }}
                                            >
                                                {u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Users;
