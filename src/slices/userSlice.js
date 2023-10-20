import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi'; // Import from userApi, not userSlice

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
        return action.payload;
      })
      .addMatcher(userApi.endpoints.getAllUser.matchFulfilled, (state, action) => {
        return action.payload;
      })
      .addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state, action) => {
        const { id, data } = action.payload;
        const userIndex = state.findIndex((user) => user._id === id);
        if (userIndex !== -1) {
          state[userIndex] = { ...state[userIndex], ...data };
        }
      })
      .addMatcher(userApi.endpoints.deleteUser.matchFulfilled, (state, action) => {
        const userIndex = state.findIndex(
          (user) => user._id === action.payload
        );
        if (userIndex !== -1) {
          state.splice(userIndex, 1);
        }
      });
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
