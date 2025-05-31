import axios from 'axios';
import authToken from '~/auth';

const axiosInstance = axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache'
  }
});

// server로 보내기 직전의 정보 intercept
axiosInstance.interceptors.request.use(
  config => {
    const token = authToken.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  ({ config, request, response, ...err }) => {
    return Promise.reject({ config, response, ...err });
  }
);

export default axiosInstance;
