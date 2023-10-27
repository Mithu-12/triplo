import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const visaApi = createApi({
  reducerPath: 'visaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://triplo-flight.onrender.com/api/' }),
  endpoints: (builder) => ({
    getVisa: builder.query({
      query: () => ({ url: '/visa' }),
    }),
    createVisa: builder.mutation({
      query: (pkg) => ({
        url: 'visa',
        method: 'POST',
        body: pkg,
      }),
    }),
    updateVisa: builder.mutation({
      query: ({ id, ...pkg }) => ({
        url: `visa/${id}`,
        method: 'PUT',
        body: pkg,
      }),
    }),
    getVisaById: builder.query({
      query: (id) => `visa/${id}`,
    }),

    deleteVisa: builder.mutation({
      query: (id) => ({
        url: `visa/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetVisaQuery,
  useCreateVisaMutation,
  useUpdateVisaMutation,
  useDeleteVisaMutation,
  useGetVisaByIdQuery,
} = visaApi;
