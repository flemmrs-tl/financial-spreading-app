import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { RootState } from '../../store';
import { authApi } from '../../api/authApi';

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  role: {
    id: string;
    name: string;
  };
}

interface JwtPayload {
  userId: string;
  exp: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials.email, credentials.password);
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    userData: {
      username: string;
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.register(
        userData.username,
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName
      );
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return;
});

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      
      if (!auth.token) {
        return rejectWithValue('No token found');
      }
      
      const decoded = jwtDecode<JwtPayload>(auth.token);
      
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem('token');
        return rejectWithValue('Token expired');
      }
      
      const response = await authApi.getCurrentUser();
      return response;
    } catch (error: any) {
      localStorage.removeItem('token');
      return rejectWithValue(error.response?.data?.message || 'Failed to get current user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;