import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser, logout } from '../slices/authSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://triplo.cyclic.app/api/auth';

// Async thunk for registering a new user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { dispatch }) => {
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      dispatch(setUser(data));

      // Return the registered user data
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { dispatch }) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data.user)); // Update user data in Redux store
      } else {
        // Handle error and redirect as needed
        console.error('Authentication failed:', data);
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      // Handle error and redirect as needed
    }
  }
);

export const loginSuccess = createAsyncThunk(
  'auth/loginSuccess',
  async (_, { dispatch }) => {
    try {
      const response = await fetch(`${baseUrl}/login/success`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data.user)); // Update user data in Redux store
      } else {
        // Handle error and redirect as needed
        console.error('Authentication failed:', data);
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      // Handle error and redirect as needed
    }
  }
);

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.user?.access_token;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    loginSuccess: builder.mutation({
      query: () => ({
        url: '/login/success',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLoginSuccessMutation,
} = authApi;

export default authApi;
