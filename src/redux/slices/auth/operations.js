import { api, setAuthHeader } from 'api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/register', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { email = '', password = '' } = credentials;

      const { data } = await api.post('/users/login', { email, password });
      if (data.token) {
        setAuthHeader(data.token);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async (credentials, thunkAPI) => {
    try {
      const { token } = credentials;
      const { data } = await api.get(`/users/verify/${token}`);
      if (data?.token) {
        setAuthHeader(data.token);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
