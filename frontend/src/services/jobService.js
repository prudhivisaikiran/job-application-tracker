import { apiRequest } from '../api';

export const jobService = {
    getAll: () => apiRequest('/jobs', 'GET', null, true),
    create: (data) => apiRequest('/jobs', 'POST', data, true),
    update: (id, data) => apiRequest(`/jobs/${id}`, 'PUT', data, true),
    delete: (id) => apiRequest(`/jobs/${id}`, 'DELETE', null, true),
};
