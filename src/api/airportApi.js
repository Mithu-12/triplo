
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Create a base query using fetchBaseQuery
// const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/' });

// // Define the airport API endpoints
// export const airportApi = createApi({
//   baseQuery,
//   endpoints: (build) => ({
//     // Define the search endpoint
//     search: build.query({
//       // The `query` function should return an object of properties to be passed as URL parameters
//       query: (params) => ({
//         url: 'airport/search',
//         params,
//       }),
//     }),
//     // Add other endpoints if needed
//     // ...
//   }),
// });

// export const useSearchFlightsQuery = airportApi.endpoints.search.useQuery;










// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const airportApi = createApi({
//   reducerPath: 'airportApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api' }),
//   endpoints: (builder) => ({
        
//     searchFlights: builder.query({
//       query: (params) => ({
//         url: '/airport/search',
//         method: 'GET',
//         params
//       }),
//     }),
//   }),
// });

// export const { useSearchFlightsQuery } = airportApi;








