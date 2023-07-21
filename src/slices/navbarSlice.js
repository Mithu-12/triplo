// src/slices/navbarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: { activeOption: 'flight' },
  reducers: {
    setActiveOption: (state, action) => {
      state.activeOption = action.payload;
    },
  },
});

export const { setActiveOption } = navbarSlice.actions;

export default navbarSlice.reducer;
