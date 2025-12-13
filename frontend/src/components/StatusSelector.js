import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const STATUS_CONFIG = {
    'Applied': { bg: 'var(--status-applied-bg)', text: 'var(--status-applied-text)', label: 'Applied' },
    'Pending': { bg: 'var(--status-pending-bg)', text: 'var(--status-pending-text)', label: 'Pending' },
    'Interviewing': { bg: 'var(--status-interview-bg)', text: 'var(--status-interview-text)', label: 'Interviewing' },
    'Approved': { bg: 'var(--status-offer-bg)', text: 'var(--status-offer-text)', label: 'Offer Received' }, // Mapped to Offer
    'Rejected': { bg: 'var(--status-rejected-bg)', text: 'var(--status-rejected-text)', label: 'Rejected' },
};

const StatusSelector = ({ currentStatus, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Get config or default to Applied if status text doesn't match keys perfectly
    const activeConfig = STATUS_CONFIG[currentStatus] || STATUS_CONFIG['Applied'];

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (statusKey) => {
        onStatusChange(statusKey);
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef} style={{ position: 'relative', width: 'fit-content' }}>
            {/* Trigger Button (Pill) */}
            <button
                onClick={handleToggle}
                style={{
                    background: activeConfig.bg,
                    color: activeConfig.text,
                    border: '1px solid transparent',
                    padding: '6px 12px 6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    boxShadow: isOpen ? '0 0 0 2px var(--bg-card), 0 0 0 4px ' + activeConfig.text + '40' : 'none',
                    minWidth: '140px',
                    justifyContent: 'space-between'
                }}
                className="hover:opacity-90 active:scale-95"
            >
                <span>{activeConfig.label}</span>
                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="animate-fade-in"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        zIndex: 50,
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        boxShadow: 'var(--shadow-xl)',
                        padding: '6px',
                        width: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        animationDuration: '0.15s'
                    }}
                >
                    {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => handleSelect(key)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: '8px 12px',
                                background: currentStatus === key ? 'var(--bg-active)' : 'transparent',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                color: 'var(--text-primary)',
                                fontWeight: 500,
                                textAlign: 'left',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = currentStatus === key ? 'var(--bg-active)' : 'transparent'}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: config.text }}></span>
                                {config.label}
                            </span>
                            {currentStatus === key && <Check size={14} color="var(--brand-primary)" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatusSelector;
