import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Task API functions
export const taskAPI = {
    // Get all tasks with optional filters
    getAllTasks: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        
        const response = await api.get(`/tasks?${params.toString()}`);
        return response.data;
    },

    // Get single task by ID
    getTaskById: async (id) => {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    // Create new task
    createTask: async (taskData) => {
        const response = await api.post('/tasks/create-task', taskData);
        return response.data;
    },

    // Update task
    updateTask: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data;
    },

    // Delete task
    deleteTask: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },
};

export default api;
