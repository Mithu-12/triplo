import { createSlice } from "@reduxjs/toolkit";

const initialState={
    fromAirport:{
        city: 'Dhaka',
        country: "Bangladesh",
        name: "Hazrat Shahjalal International Airport",
        code: "DAC"
    },
    toAirport:{
        city: "Cox's Bazar",
        country: "Bangladesh",
        name: "Cox's Bazar Airport",
        code: "CGP"

    },
    departureDate: new Date(),
    returnDate: null,
}
const toFromSlice = createSlice({
    name: 'toFrom',
    initialState,
    reducers: {
      setFromAirport: (state, action) => {
        state.fromAirport = action.payload;
      },
      setToAirport: (state, action) => {
        state.toAirport = action.payload;
      },
      setDepartureDate: (state, action) => {
        state.departureDate = action.payload;
      },
      setReturnDate: (state, action) => {
        state.returnDate = action.payload;
      },
    },
  });

  export const { setFromAirport, setToAirport, setDepartureDate, setReturnDate } = toFromSlice.actions;

  export default toFromSlice.reducer;