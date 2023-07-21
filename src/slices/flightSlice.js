import { createSlice } from '@reduxjs/toolkit';
import { flightApi } from '../api/flightApi';


const flightSlice = createSlice({
  name: 'flight',
  initialState: [],
  reducers: {
    setFlights: (state, action) => {
      return action.payload;
    },
    addFlight: (state, action) => {
      state.push(action.payload);
    },
    updateFlight: (state, action) => {
      const { id, data } = action.payload;
      const flightIndex = state.findIndex((flight) => flight._id === id);
      if (flightIndex !== -1) {
        state[flightIndex] = { ...state[flightIndex], ...data };
      }
    },
    deleteFlight: (state, action) => {
      const flightIndex = state.findIndex((flight) => flight._id === action.payload);
      if (flightIndex !== -1) {
        state.splice(flightIndex, 1);
      }
    },
  },
});

export const { setFlights, addFlight, updateFlight, deleteFlight } = flightSlice.actions;

export default flightSlice.reducer;

// Additional actions from flightApi
export const { useGetFlightsQuery, useCreateFlightMutation, useUpdateFlightMutation, useDeleteFlightMutation } = flightApi;
