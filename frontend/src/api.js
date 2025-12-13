// Use environment variable or fallback to local
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper to get token
const getToken = () => localStorage.getItem('token');

// Helper to save token
export const setToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

// Generic API Request
export const apiRequest = async (endpoint, method = 'GET', body = null, useAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (useAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const getJobs = () => apiRequest('/jobs', 'GET', null, true);
export const createJob = (data) => apiRequest('/jobs', 'POST', data, true);
export const updateJob = (id, data) => apiRequest(`/jobs/${id}`, 'PUT', data, true);
export const deleteJob = (id) => apiRequest(`/jobs/${id}`, 'DELETE', null, true);
