import ENV from '@/config/env.variables';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: ENV.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
