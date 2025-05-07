import apiClient, {
  type AxiosError,
} from './apiClient';

export interface LoginVariables {
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
  refreshToken: string;
}

export interface LoginError extends AxiosError {}

export const login = (data: LoginVariables) => apiClient.post<LoginVariables, LoginData>('/api/auth/login', data);
