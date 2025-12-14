// Use environment variable or fallback to local
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper to get token
const getToken = () => localStorage.getItem('token');

export const setToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

/**
 * Universal API Fetch Wrapper
 * Handles Headers, Auth, JSON Parsing, and Errors.
 */
export const apiFetch = async (endpoint, options = {}) => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
        });

        // Parse JSON or Text (for robustness)
        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            // If response is not JSON (e.g. 404 HTML from Netlify or 500 error)
            throw new Error(text || `Request failed: ${response.status}`);
        }

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// --- API Methods ---

// Jobs
export const getJobs = () => apiFetch('/api/jobs', { method: 'GET' });
export const createJob = (data) => apiFetch('/api/jobs', { method: 'POST', body: JSON.stringify(data) });
export const updateJob = (id, data) => apiFetch(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteJob = (id) => apiFetch(`/api/jobs/${id}`, { method: 'DELETE' });

// Auth
export const registerUser = (data) => apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(data) });
export const loginUser = (data) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
export const getMe = () => apiFetch('/api/auth/me', { method: 'GET' });

// Compatibility export for legacy calls (if any)
export const apiRequest = (endpoint, method = 'GET', body = null, useAuth = false) => {
    // Adapter to map old "apiRequest" signature to new "apiFetch"
    // Note: Old apiRequest assumed BASE was .../api. New apiFetch assumes BASE is root.
    // OLD: endpoint='/jobs' -> NEW: endpoint='/api/jobs'
    // This helper is dangerous if paths mix. 
    // Ideally we update all callers. But looking at codebase, callers were:
    // AuthContext used apiRequest('/auth/me') -> needed '/api/auth/me'

    // Construct options
    const options = { method };
    if (body) options.body = JSON.stringify(body);

    // Fix endpoint path if missing /api
    const path = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    return apiFetch(path, options);
};
