import axios from 'axios';

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const axiosInstance = axios.create({
  baseURL: '',
});

axiosInstance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('code_token');

    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    // const { data } = error.response;

    // if (data === 'Unauthorized') {
    // } else {
    // }
    return Promise.reject(error);
  },
);

export default axiosInstance;
