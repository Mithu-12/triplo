import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const packageApi = createApi({
  reducerPath: 'packageApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/' }),
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => ({ url: '/package' }),  
    }),
    createPackage: builder.mutation({
      query: (pkg) => ({
        url: 'package',
        method: 'POST',
        body: pkg,
      }),
    }),
    updatePackage: builder.mutation({
      query: ({ id, ...pkg }) => ({
        url: `package/${id}`,
        method: 'PUT',
        body: pkg,
      }),
    }),
    getPackageById: builder.query({
      query: (id) => `package/${id}`,
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `package/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useGetPackageByIdQuery,
} = packageApi;
