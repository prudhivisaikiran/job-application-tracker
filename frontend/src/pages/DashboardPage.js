import React, { useState, useEffect } from 'react';
import { getJobs, createJob, updateJob, deleteJob } from '../api';
import { Plus, BarChart2, Briefcase, CheckCircle, XCircle, Clock, X } from 'lucide-react';
import toast from 'react-hot-toast';
import JobTable from '../components/JobTable';
import Modal from '../components/Modal';

const DashboardPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);


    // Form State
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({ company: '', role: '', status: 'Applied', location: '', jobUrl: '', notes: '' });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const data = await getJobs();
            setJobs(Array.isArray(data) ? data : data.jobs);
        } catch (err) {
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        const promise = editingJob
            ? updateJob(editingJob._id, formData)
            : createJob(formData);

        toast.promise(promise, {
            loading: editingJob ? 'Updating...' : 'Creating...',
            success: editingJob ? 'Job updated!' : 'Job created!',
            error: 'Operation failed',
        }).then(() => {
            fetchJobs();
            setShowForm(false);
            setEditingJob(null);
            resetForm();
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this job?')) return;
        try {
            await deleteJob(id);
            toast.success('Job deleted');
            fetchJobs();
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const openEdit = (job) => {
        setEditingJob(job);
        setFormData({ ...job });
        setShowForm(true);
    };

    const resetForm = () => setFormData({ company: '', role: '', status: 'Applied', location: '', jobUrl: '', notes: '' });

    // Stats Logic
    const stats = [
        {
            label: 'Total Applications',
            value: jobs.length,
            icon: Briefcase,
            color: 'var(--brand-primary)',
            bg: 'var(--brand-subtle)'
        },
        {
            label: 'Interviews',
            value: jobs.filter(j => j.status === 'Interviewing').length,
            icon: Clock,
            color: 'var(--status-interview-text)',
            bg: 'var(--status-interview-bg)'
        },
        {
            label: 'Offers Received',
            value: jobs.filter(j => j.status === 'Approved').length,
            icon: CheckCircle,
            color: 'var(--status-offer-text)',
            bg: 'var(--status-offer-bg)'
        },
        {
            label: 'Rejections',
            value: jobs.filter(j => j.status === 'Rejected').length,
            icon: XCircle,
            color: 'var(--status-rejected-text)',
            bg: 'var(--status-rejected-bg)'
        }
    ];

    return (
        <div className="main-content">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Overview</h1>
                        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Welcome back! Here is your job search progress.</p>
                    </div>
                    <button onClick={() => { setEditingJob(null); setFormData({ company: '', role: '', status: 'Applied', location: '', jobUrl: '', notes: '' }); setShowForm(true); }} className="btn btn-primary flex items-center gap-2" style={{ padding: '12px 24px', borderRadius: '30px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}>
                        <Plus size={20} />
                        <span>New Application</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card animate-fade-in" style={{ animationDelay: `${index * 100}ms`, padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div className="stat-icon" style={{ color: stat.color, background: stat.bg, width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 4 }}>
                                    {stat.value}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content (List Only) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <p>Loading your applications...</p>
                        </div>
                    ) : (
                        <JobTable
                            jobs={jobs}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                            onStatusChange={async (id, newStatus) => {
                                try {
                                    await updateJob(id, { status: newStatus });
                                    toast.success('Status updated');
                                    fetchJobs();
                                } catch (err) {
                                    toast.error('Failed to update status');
                                }
                            }}
                        />
                    )}
                </div>
            </div>
            {/* Premium Modal Form */}
            {/* Premium Modal Form via Portal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                {/* Header */}
                <div style={{ padding: '32px 32px 24px 32px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
                                {editingJob ? 'Edit Application ✨' : 'New Application ✨'}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Track your journey to your dream job.</p>
                        </div>
                        <button
                            onClick={() => setShowForm(false)}
                            className="btn-icon"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '50%', width: 32, height: 32 }}
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Form Body */}
                <div style={{ padding: '32px', background: 'var(--bg-card)' }}>
                    <form onSubmit={handleCreateOrUpdate}>
                        <div className="form-grid" style={{ gap: 24 }}>

                            {/* Company & Role Row */}
                            <div className="grid md:grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="input-group" style={{ margin: 0 }}>
                                    <label className="input-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)' }}>Company</label>
                                    <div className="relative flex items-center">
                                        <Briefcase size={18} style={{ position: 'absolute', left: 16, color: 'var(--text-tertiary)' }} />
                                        <input
                                            className="input-field"
                                            placeholder="e.g. Google"
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            required
                                            style={{ paddingLeft: 44, height: 48, fontSize: '0.95rem' }}
                                        />
                                    </div>
                                </div>
                                <div className="input-group" style={{ margin: 0 }}>
                                    <label className="input-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)' }}>Role</label>
                                    <div className="relative flex items-center">
                                        <div style={{ position: 'absolute', left: 16, color: 'var(--text-tertiary)', fontWeight: 600 }}>@</div>
                                        <input
                                            className="input-field"
                                            placeholder="e.g. Designer"
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            required
                                            style={{ paddingLeft: 44, height: 48, fontSize: '0.95rem' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Initial Status (Only for New) */}
                            {!editingJob && (
                                <div className="input-group" style={{ margin: 0 }}>
                                    <label className="input-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)' }}>Initial Status</label>
                                    <div className="relative flex items-center">
                                        <select
                                            className="input-field"
                                            value={formData.status}
                                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                                            style={{ height: 48, paddingLeft: 16 }}
                                        >
                                            <option value="Applied">Applied</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Interviewing">Interviewing</option>
                                            <option value="Approved">Offer Received</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                        <div style={{ position: 'absolute', right: 16, pointerEvents: 'none' }}>▼</div>
                                    </div>
                                </div>
                            )}

                            {/* URL */}
                            <div className="input-group" style={{ margin: 0 }}>
                                <label className="input-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)' }}>Job Listing URL</label>
                                <div className="relative flex items-center">
                                    <div style={{ position: 'absolute', left: 16, color: 'var(--text-tertiary)' }}>🔗</div>
                                    <input
                                        className="input-field"
                                        placeholder="https://linkedin.com/jobs/..."
                                        value={formData.jobUrl}
                                        onChange={e => setFormData({ ...formData, jobUrl: e.target.value })}
                                        style={{ paddingLeft: 44, height: 48 }}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="input-group" style={{ margin: 0 }}>
                                <label className="input-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)' }}>Location</label>
                                <input
                                    className="input-field"
                                    placeholder="Remote, San Francisco, etc."
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    style={{ height: 48 }}
                                />
                            </div>

                            {/* Notes */}
                            <div className="input-group" style={{ margin: 0 }}>
                                <label className="input-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)' }}>Notes</label>
                                <textarea
                                    className="input-field"
                                    rows="3"
                                    placeholder="Referral name, interview thoughts, etc."
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    style={{ resize: 'none', padding: 16 }}
                                />
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex gap-4 justify-end mt-8 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="btn"
                                style={{ background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600 }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    padding: '12px 32px',
                                    borderRadius: 30,
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
                                }}
                            >
                                {editingJob ? 'Update Application' : 'Create Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div >

    );
};
export default DashboardPage;

