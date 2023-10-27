import { createSlice } from '@reduxjs/toolkit';



const airportSlice = createSlice({
  name: 'airport',
  initialState: {
    flights: [], // Initial state for the flights data
    selectedFlight: null,
    totalPrice: 0,
    disCountedPrice: 0,
    sessionEndTime: null, 
    searchUid: null,
  },
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedFlight: (state, action)=>{
      state.selectedFlight = action.payload;
    },
    setTotalPrice: (state, action)=>{
      state.totalPrice = action.payload;
    },
    setDisCountPrice: (state, action)=>{
      state.disCountedPrice = action.payload;
    },
    setSessionEndTime: (state, action) => {
      state.sessionEndTime = action.payload;
    },
    setSearchUid: (state, action) => {
      state.searchUid = action.payload;
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

export const { setFlights, setSelectedFlight, setDisCountPrice, setTotalPrice, setLoading, setSearchUid, setSessionEndTime, setError} = airportSlice.actions;

export default airportSlice.reducer;

