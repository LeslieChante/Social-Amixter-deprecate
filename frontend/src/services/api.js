// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = token; // Sin 'Bearer', solo el token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
