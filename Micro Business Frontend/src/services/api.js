import axios from 'axios';

// API Configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Disesuaikan dengan port backend Node.js
  timeout: 10000,
});

export default api;
