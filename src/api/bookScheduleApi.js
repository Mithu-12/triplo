import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookScheduleApi = createApi({
  reducerPath: 'bookScheduleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/bookSchedule' }), // Adjust the base URL based on your backend API endpoint
  endpoints: (builder) => ({
    getBookSchedules: builder.query({
      query: () => 'bookSchedule', // Endpoint URL for fetching all book schedules
    }),
    createBookSchedule: builder.mutation({
      query: (bookSchedule) => ({
        url: 'bookSchedule',
        method: 'POST',
        body: bookSchedule,
      }),
    }),
    updateBookSchedule: builder.mutation({
      query: ({ id, ...bookSchedule }) => ({
        url: `bookSchedule/${id}`,
        method: 'PUT',
        body: bookSchedule,
      }),
    }),
    deleteBookSchedule: builder.mutation({
      query: (id) => ({
        url: `bookSchedule/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBookSchedulesQuery,
  useCreateBookScheduleMutation,
  useUpdateBookScheduleMutation,
  useDeleteBookScheduleMutation,
} = bookScheduleApi;
