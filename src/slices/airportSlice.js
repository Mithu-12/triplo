import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFlights = createAsyncThunk('airport/fetchFlights', async (params) => {
  try {
    const response = await axios.get('http://localhost:8800/api/airport/search', {
      params,
    });
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch flights');
  }
});

const flightSlice = createSlice({
  name: 'airport',
  initialState: {
    data: [], // Modify this to store the fetched flights data
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.data = action.payload; // Update the data with the fetched flights
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default flightSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';



// const airportSlice = createSlice({
//   name: 'airport',
//   initialState: {
//     flights: [], // Initial state for the flights data
//   },
//   reducers: {
//     setFlights: (state, action) => {
//       state.flights = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { setFlights, setLoading, setError } = airportSlice.actions;

// export default airportSlice.reducer;






















// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { airportApi } from '../api/airportApi';

// export const fetchFlights = createAsyncThunk('airport/fetchFlights', async (params) => {
//   try {
//     const response = await airportApi.search(params);
//     return response;
//   } catch (error) {
//     throw Error('Failed to fetch flights');
//   }
// });

// const airportSlice = createSlice({
//   name: 'airport',
//   initialState: {
//     flights: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFlights.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFlights.fulfilled, (state, action) => {
//         state.flights = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(fetchFlights.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error;
//       });
//   },
// });

// export const selectFlights = (state) => state.airport.flights;
// export const selectLoading = (state) => state.airport.loading;
// export const selectError = (state) => state.airport.error;

// export default airportSlice.reducer;




