import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsChart = ({ jobs }) => {
    const chartData = useMemo(() => {
        const statusCounts = {
            Applied: 0,
            Interview: 0,
            Offer: 0,
            Rejected: 0,
        };

        jobs.forEach((job) => {
            const status = job.status || 'Applied';
            if (statusCounts[status] !== undefined) {
                statusCounts[status]++;
            } else {
                // Handle unexpected statuses if any
                statusCounts[status] = (statusCounts[status] || 0) + 1;
            }
        });

        return {
            labels: Object.keys(statusCounts),
            datasets: [
                {
                    label: 'Number of Applications',
                    data: Object.values(statusCounts),
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)', // Applied (Blue)
                        'rgba(255, 206, 86, 0.6)', // Interview (Yellow)
                        'rgba(75, 192, 192, 0.6)', // Offer (Green)
                        'rgba(255, 99, 132, 0.6)', // Rejected (Red)
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [jobs]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Job Application Status',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1, // Ensure integers for counts
                },
            },
        },
    };

    return (
        <div className="analytics-container" style={{ marginTop: '30px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>Analytics Dashboard</h3>
            {jobs.length === 0 ? (
                <p>No data to display. Add some jobs!</p>
            ) : (
                <Bar data={chartData} options={options} />
            )}
        </div>
    );
};

export default AnalyticsChart;
