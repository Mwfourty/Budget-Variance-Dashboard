import axios from 'axios';

// Base URL points at the Spring Boot API. Set VITE_API_BASE_URL in a .env
// file (see .env.example) to target a different environment.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach the stored JWT (if any) to every outgoing request.
axiosClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('ledger-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized handling for expired/invalid sessions.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('ledger-token');
      window.localStorage.removeItem('ledger-user');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
