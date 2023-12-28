import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flightApi = createApi({
  reducerPath: "flightApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tame-leggings-goat.cyclic.app/api/flight",
  }), // Adjust the base URL based on your backend API endpoint
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: () => "flight", // Endpoint URL for fetching all flights
    }),
    createFlight: builder.mutation({
      query: (flight) => ({
        url: "flight",
        method: "POST",
        body: flight,
      }),
    }),
    updateFlight: builder.mutation({
      query: ({ id, ...flight }) => ({
        url: `flight/${id}`,
        method: "PUT",
        body: flight,
      }),
    }),
    deleteFlight: builder.mutation({
      query: (id) => ({
        url: `flight/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useCreateFlightMutation,
  useUpdateFlightMutation,
  useDeleteFlightMutation,
} = flightApi;
