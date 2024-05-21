import axios from 'axios';
const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: import.meta.env.VITE_APP_API_URL
});
axiosInstance.interceptors.request.use(
    config => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
      return config;
    },
    error => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );
export default axiosInstance;
