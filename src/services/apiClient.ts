import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response time
    const endTime = new Date();
    const duration = endTime.getTime() - response.config.metadata?.startTime.getTime();
    console.log(`API ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
    
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    if (error.response?.status >= 500) {
      // Server error
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  dashboard: {
    data: '/dashboard',
    metrics: '/dashboard/metrics',
    alerts: '/dashboard/alerts',
    recommendations: '/dashboard/recommendations',
  },
  costAnalysis: {
    trends: '/cost-analysis/trends',
    breakdown: '/cost-analysis/breakdown',
    comparison: '/cost-analysis/comparison',
  },
  automation: {
    rules: '/automation/rules',
    executions: '/automation/executions',
    schedule: '/automation/schedule',
  },
  reports: {
    monthly: '/reports/monthly',
    custom: '/reports/custom',
    export: '/reports/export',
  },
} as const;
