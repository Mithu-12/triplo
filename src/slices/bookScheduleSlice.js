import { createSlice } from '@reduxjs/toolkit';
import { bookScheduleApi } from '../api/bookScheduleApi';


const bookScheduleSlice = createSlice({
  name: 'bookSchedule',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(bookScheduleApi.endpoints.getBookSchedules.matchFulfilled, (state, action) => {
        return action.payload;
      })
      .addMatcher(bookScheduleApi.endpoints.createBookSchedule.matchFulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addMatcher(bookScheduleApi.endpoints.updateBookSchedule.matchFulfilled, (state, action) => {
        const { id, data } = action.payload;
        const bookScheduleIndex = state.findIndex((schedule) => schedule._id === id);
        if (bookScheduleIndex !== -1) {
          state[bookScheduleIndex] = { ...state[bookScheduleIndex], ...data };
        }
      })
      .addMatcher(bookScheduleApi.endpoints.deleteBookSchedule.matchFulfilled, (state, action) => {
        const bookScheduleIndex = state.findIndex((schedule) => schedule._id === action.payload);
        if (bookScheduleIndex !== -1) {
          state.splice(bookScheduleIndex, 1);
        }
      });
  },
});

export default bookScheduleSlice.reducer;
