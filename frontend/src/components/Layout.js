import React from 'react';
import { LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <div className="layout">
            <header className="navbar">
                <div className="navbar-container">
                    <div className="flex items-center gap-3">
                        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 36, height: 36, background: 'var(--brand-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚀</div>
                            <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: 0 }}>JobTrack</h2>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden-mobile flex items-center gap-3" style={{ paddingRight: 16, borderRight: '1px solid var(--border-color)' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.2 }}>{user?.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Free Plan</div>
                            </div>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-hover)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                                {user?.name?.[0] || 'U'}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <ThemeToggle />

                            <button onClick={logout} className="btn-icon" title="Logout" style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', width: 'auto', padding: '8px 12px', gap: 6 }}>
                                <LogOut size={16} />
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
