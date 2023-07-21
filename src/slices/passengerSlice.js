import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adultsCount: 1,
    childrenCount: 0,
    infantsCount: 0,
    selectedCabin: 'ECONOMY',
  };

const passengerSlice = createSlice({
  name: 'passenger',
  initialState,
  reducers: {
    setPassengerCount: (state, action) => {
        const { adults, children, infants } = action.payload;
        state.adultsCount = adults;
        state.childrenCount = children;
        state.infantsCount = infants;
      },
    setSelectedCabin: (state, action) => {
      state.selectedCabin = action.payload;
    },
  },
});

export const { setPassengerCount, setSelectedCabin } = passengerSlice.actions;

export default passengerSlice.reducer;
