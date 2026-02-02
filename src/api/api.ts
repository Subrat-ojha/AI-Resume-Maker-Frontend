import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Helper to get or create device fingerprint
const getDeviceFingerprint = () => {
    let fingerprint = localStorage.getItem('device_fingerprint');
    if (!fingerprint) {
        fingerprint = crypto.randomUUID();
        localStorage.setItem('device_fingerprint', fingerprint);
    }
    return fingerprint;
};

// Request interceptor to attach JWT token and Fingerprint
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const fingerprint = getDeviceFingerprint();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Always call with fingerprint for usage tracking (guest or logged in)
    config.headers['X-Device-Fingerprint'] = fingerprint;

    return config;
});

// Response interceptor for 401 handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
