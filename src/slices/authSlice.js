import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, loginSuccess } from '../api/authApi';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
 extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.data.message;
    });
    
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null; // Reset error on successful login
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.data.message;
    });

    // Add cases for loginWithGoogle and loginWithFacebook
    builder.addCase(loginSuccess.fulfilled, (state, action) => {
      console.log('Fulfilled:', action.payload);
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });
    
    
    builder.addCase(loginSuccess.rejected, (state, action) => {
      console.log('Rejected:', action.error);
      state.error = action.error.data.message;
    });
  },
  
});


export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

