import axios from 'axios';

const ipDevice = '192.168.1.180'
const portProxy = '3001'

const axiosInstance = axios.create({
  baseURL: `http://${ipDevice}:${portProxy}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
