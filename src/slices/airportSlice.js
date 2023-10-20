import { createSlice } from '@reduxjs/toolkit';



const airportSlice = createSlice({
  name: 'airport',
  initialState: {
    flights: [], // Initial state for the flights data
    searchParams: [],
    totalPrice: 0,
    disCountedPrice: 0
  },
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTotalPrice: (state, action)=>{
      state.totalPrice = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDisCountPrice: (state, action)=>{
      state.disCountedPrice = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setFlights, setDisCountPrice, setTotalPrice, setLoading, setError} = airportSlice.actions;

export default airportSlice.reducer;

