import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addUser } from '../slices/userSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';


const baseUrl = 'http://localhost:8800/api/auth';

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

      // Dispatch the addUser action to add the user to the allUser list
      dispatch(addUser(data));

      // Return the registered user data
      return data;
    } catch (error) {
        console.log(error)
      // Handle error
    }
  }
);

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
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
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export default authApi;
