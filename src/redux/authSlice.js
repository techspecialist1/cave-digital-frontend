import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/config.js';

const apiCall = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Something went wrong');
  }

  return response.json();
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const data = await apiCall(`${BASE_URL}/auth/login`, 'POST', credentials);
  return data;
});

export const signup = createAsyncThunk('auth/signup', async (credentials) => {
  const data = await apiCall(`${BASE_URL}/auth/signup`, 'POST', credentials);
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
