import Axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import qs from 'qs';
import useAuthStore from '@/store/auth';

const axios = Axios.create({
  baseURL: 'http://hejdev1.goqual.com:8080/',
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params),
});

axios.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
);

// axios.interceptors.response.use(

// );

export type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
};

export default {
  get: async <TData>(
    url: string,
    config?: AxiosRequestConfig,
  ) => {
    const res = await axios.get<TData>(url, config);
    return res.data;
  },
  post: async <TVariables, TData>(
    url: string,
    variables?: TVariables,
    config?: AxiosRequestConfig,
  ) => {
    const res = await axios.post<TVariables, AxiosResponse<TData>>(url, variables, config);
    return res.data;
  },
};
