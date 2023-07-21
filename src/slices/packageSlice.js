import { createSlice } from '@reduxjs/toolkit';
import { packageApi } from '../api/packageApi';

const packageSlice = createSlice({
  name: 'package',
  initialState: [],
  reducers: {
    setPackages: (state, action) => {
      return action.payload;
    },
    addPackage: (state, action) => {
      state.push(action.payload);
    },
    updatePackage: (state, action) => {
      const { id, data } = action.payload;
      const packageIndex = state.findIndex((pkg) => pkg._id === id);
      if (packageIndex !== -1) {
        state[packageIndex] = { ...state[packageIndex], ...data };
      }
    },
    deletePackage: (state, action) => {
      const packageIndex = state.findIndex((pkg) => pkg._id === action.payload);
      if (packageIndex !== -1) {
        state.splice(packageIndex, 1);
      }
    },
  },
});

export const { setPackages, addPackage, updatePackage, deletePackage } = packageSlice.actions;

export default packageSlice.reducer;
export const {
    useGetPackagesQuery,
    useCreatePackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,
  } = packageApi;
