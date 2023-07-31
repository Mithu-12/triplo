import { createSlice } from '@reduxjs/toolkit';
import { visaApi } from '../api/visa';

const VisaSlice = createSlice({
  name: 'visa',
  initialState: {
    visa: [],      
    travelers: 1,  
    country: '', 
    nationality: 'Bangladesh'
  },
  reducers: {
    setVisa: (state, action) => {
      return action.payload;
    },
    addVisa: (state, action) => {
      state.push(action.payload);
    },
    updateVisa: (state, action) => {
      const { id, data } = action.payload;
      const visaIndex = state.findIndex((pkg) => pkg._id === id);
      if (visaIndex !== -1) {
        state[visaIndex] = { ...state[visaIndex], ...data };
      }
    },
    deleteVisa: (state, action) => {
      const visaIndex = state.findIndex((pkg) => pkg._id === action.payload);
      if (visaIndex !== -1) {
        state.splice(visaIndex, 1);
      }
    },
    updateTravelers: (state, action) => {
        state.travelers = action.payload;
      },
      updateCountry: (state, action) => {
        state.country = action.payload;
      },
      updateNationality: (state, action) => {
        state.nationality = action.payload;
      },
  },
});

export const { setVisa, addVisa, updateVisa, deleteVisa, updateTravelers, updateCountry, updateNationality } = VisaSlice.actions;

export default VisaSlice.reducer;
export const {
    useGetVisaQuery,
    useCreateVisaMutation,
    useUpdateVisaMutation,
    useDeleteVisaMutation,
  } = visaApi;
