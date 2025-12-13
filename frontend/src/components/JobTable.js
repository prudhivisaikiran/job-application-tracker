import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import StatusSelector from './StatusSelector';

const JobTable = ({ jobs, onEdit, onDelete, onStatusChange }) => {
    if (!jobs || jobs.length === 0) {
        return (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>No applications found. Start by adding one!</p>
            </div>
        );
    }

    return (
        <div className="modern-table-container">
            <table className="modern-table">
                <thead>
                    <tr>
                        <th width="30%">Company & Role</th>
                        <th width="20%">Status</th>
                        <th width="20%">Location</th>
                        <th width="15%">Date Applied</th>
                        <th width="5%">Link</th>
                        <th width="10%" style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job._id}>
                            <td>
                                <div style={{ fontWeight: 600 }}>{job.company}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{job.role}</div>
                            </td>
                            <td>
                                <StatusSelector
                                    currentStatus={job.status}
                                    onStatusChange={(newStatus) => onStatusChange && onStatusChange(job._id, newStatus)}
                                />
                            </td>
                            <td style={{ color: 'var(--text-secondary)' }}>
                                {job.location || 'Remote'}
                            </td>
                            <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                {new Date(job.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                {job.jobUrl ? (
                                    <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ display: 'inline-flex', width: 'auto' }}>
                                        <ExternalLink size={16} />
                                    </a>
                                ) : <span style={{ color: 'var(--text-tertiary)' }}>-</span>}
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                    <button onClick={() => onEdit(job)} className="btn-icon" title="Edit">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => onDelete(job._id)} className="btn-icon" title="Delete" style={{ color: 'var(--text-tertiary)' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobTable;
