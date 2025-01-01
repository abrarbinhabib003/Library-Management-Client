import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token'); 
    console.log('Token from cookies:', token); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('No token found'); 
    }
    return config;
  },
  (error) => {
    console.error('Error in axios request interceptor:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
