import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airportApi = createApi({
  reducerPath: "airportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tame-leggings-goat.cyclic.app/api/airport",
  }),
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: (params) => ({
        url: "/search",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetFlightsQuery } = airportApi;
