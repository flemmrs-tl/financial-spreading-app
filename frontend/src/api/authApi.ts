import api from './apiClient';
import { User } from '../features/auth/authSlice';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    return api.post('/auth/login', { email, password });
  },
  
  register: async (
    username: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ): Promise<RegisterResponse> => {
    return api.post('/auth/register', {
      username,
      email,
      password,
      firstName,
      lastName,
    });
  },
  
  getCurrentUser: async (): Promise<User> => {
    return api.get('/auth/me');
  },
};