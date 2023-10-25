import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://triplo.cyclic.app/api/users' }), 
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/${id}`,
    }),
    getAllUser: builder.query({
      query: () => '',
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetAllUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;
