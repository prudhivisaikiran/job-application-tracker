import React, { useState } from 'react';
import { loginUser, registerUser } from '../api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const AuthPage = () => {
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let data;
            if (activeTab === 'login') {
                data = await loginUser({ email: formData.email, password: formData.password });
            } else {
                data = await registerUser(formData);
            }

            authLogin(data);
            toast.success(`Welcome back, ${data.name}!`);
            navigate('/');
        } catch (err) {
            toast.error(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            {/* Left Side - Branding */}
            <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-hover) 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px',
                position: 'relative',
                overflow: 'hidden'
            }} className="hidden-mobile">
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ fontSize: 60, marginBottom: 20 }}>🚀</div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>JobTrack.</h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '400px', lineHeight: 1.6 }}>
                        Master your job search. Track applications, interviews, and offers in one beautiful dashboard.
                    </p>

                    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div className="flex items-center gap-2"><CheckCircle size={20} /> <span>Track unlimited applications</span></div>
                        <div className="flex items-center gap-2"><CheckCircle size={20} /> <span>Visualize progress with Kanban</span></div>
                        <div className="flex items-center gap-2"><CheckCircle size={20} /> <span>Gain insights with Analytics</span></div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-main)',
                padding: '40px'
            }}>
                <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-in">
                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: 8 }}>{activeTab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {activeTab === 'login' ? 'Enter your credentials to access your account' : 'Start your journey with us correctly'}
                        </p>
                    </div>

                    <div style={{ background: 'var(--bg-active)', padding: 4, borderRadius: 12, display: 'flex', marginBottom: 32 }}>
                        <button
                            style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: activeTab === 'login' ? 'var(--bg-card)' : 'transparent', color: activeTab === 'login' ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 600, boxShadow: activeTab === 'login' ? 'var(--shadow-sm)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                            onClick={() => setActiveTab('login')}
                        >
                            Log In
                        </button>
                        <button
                            style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: activeTab === 'register' ? 'var(--bg-card)' : 'transparent', color: activeTab === 'register' ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 600, boxShadow: activeTab === 'register' ? 'var(--shadow-sm)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                            onClick={() => setActiveTab('register')}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {activeTab === 'register' && (
                            <div className="input-group">
                                <label className="input-label">Full Name</label>
                                <input type="text" name="name" className="input-field" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                            </div>
                        )}
                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <input type="email" name="email" className="input-field" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input type="password" name="password" className="input-field" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="btn btn-primary w-full" style={{ padding: '14px', fontSize: '1rem' }} disabled={loading}>
                            {loading ? 'Processing...' : (
                                <>
                                    {activeTab === 'login' ? 'Sign In' : 'Get Started'} <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .hidden-mobile { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default AuthPage;
