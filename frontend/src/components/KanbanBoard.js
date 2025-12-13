import React from 'react';
import { MoreHorizontal, MapPin } from 'lucide-react';

const STATUS_COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected'];

const KanbanBoard = ({ jobs, onEdit }) => {
    const getJobsByStatus = (status) => jobs.filter((j) => j.status === status);

    return (
        <div className="kanban-board">
            {STATUS_COLUMNS.map((status) => {
                const columnJobs = getJobsByStatus(status);
                return (
                    <div key={status} className="kanban-column">
                        <div className="kanban-header">
                            <span className={`badge badge-${status}`}>{status}</span>
                            <span className="text-secondary text-sm">{columnJobs.length}</span>
                        </div>

                        {columnJobs.map(job => (
                            <div key={job._id} className="kanban-card" onClick={() => onEdit(job)}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 style={{ fontWeight: 600 }}>{job.company}</h4>
                                    <MoreHorizontal size={16} className="text-secondary" />
                                </div>
                                <p className="text-sm text-secondary mb-2">{job.role}</p>
                                <div className="flex items-center gap-2 text-sm text-secondary">
                                    {job.location && <><MapPin size={14} /> {job.location}</>}
                                </div>
                                <div className="text-sm text-secondary mt-2" style={{ fontSize: '0.75rem' }}>
                                    {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}

                        {columnJobs.length === 0 && (
                            <div className="text-center text-secondary text-sm" style={{ padding: 20, border: '1px dashed var(--border-color)', borderRadius: 6 }}>
                                Empty
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export default KanbanBoard;
