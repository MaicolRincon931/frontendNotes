
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  
  baseURL: API_URL, 
  
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
   
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response && error.response.status === 401) {
      
      console.error('No autorizado, redirige al login o muestra mensaje adecuado.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
