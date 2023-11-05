import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers/rootReducers'; // Import the root reducer
import { packageApi } from '../api/packageApi';
import { bookScheduleApi } from '../api/bookScheduleApi';
import { userApi } from '../api/userApi';
import { visaApi } from '../api/visa';
import { airportApi } from '../api/airportApi';
import authApi from '../api/authApi';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // The key under which your Redux state will be saved in the storage
  storage, // The storage engine
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      packageApi.middleware,
      bookScheduleApi.middleware,
      userApi.middleware,
      authApi.middleware,
      visaApi.middleware,
      airportApi.middleware
      // Add other middleware here as needed
    ),
});

export const persistor = persistStore(store);

export default store;

