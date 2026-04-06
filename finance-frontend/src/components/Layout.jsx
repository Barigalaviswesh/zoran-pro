import React from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Receipt, Users, LogOut, Wallet } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-title">
                    <Wallet size={24} />
                    Zoran Finance
                </div>

                <nav className="nav-links" style={{ flex: 1 }}>
                    <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/records" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Receipt size={20} />
                        Financial Records
                    </NavLink>

                    {user.role === 'ADMIN' && (
                        <NavLink to="/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Users size={20} />
                            User Management
                        </NavLink>
                    )}
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Logged in as:<br />
                        <strong style={{ color: 'var(--text-main)' }}>{user.name}</strong><br />
                        <span style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>{user?.role?.toLowerCase()}</span>
                    </div>
                    <button onClick={handleLogout} className="btn" style={{ width: '100%', backgroundColor: 'var(--surface-hover)', color: 'var(--accent)' }}>
                        <LogOut size={16} />
                        Log out
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
