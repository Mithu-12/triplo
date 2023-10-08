import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers/rootReducers'; // Import the root reducer
import { flightApi } from '../api/flightApi';
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
      flightApi.middleware,
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

// import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';

// import { flightApi } from '../api/flightApi';
// import { packageApi } from '../api/packageApi';
// import { bookScheduleApi } from '../api/bookScheduleApi';
// import { userApi } from '../api/userApi';
// // import { airportApi } from '../api/airportApi';
// import bookScheduleReducer from '../slices/bookScheduleSlice';
// import authApi from '../api/authApi';
// import navbarReducer from '../slices/navbarSlice';
// import toFromReducer from '../slices/toFromSlice'
// import passengerReducer from '../slices/passengerSlice';
// import airportReducer from '../slices/airportSlice'

// const store = configureStore({
//   reducer: {
//     [flightApi.reducerPath]: flightApi.reducer,
//     [packageApi.reducerPath]: packageApi.reducer,
//     [bookScheduleApi.reducerPath]: bookScheduleApi.reducer,
//     [userApi.reducerPath]: userApi.reducer,
//     [authApi.reducerPath]: authApi.reducer,
//     // [airportApi.reducerPath]: airportApi.reducer,
//     bookSchedule: bookScheduleReducer,
//     navbar: navbarReducer,
//     passenger: passengerReducer,
//     toFrom: toFromReducer,
//     airport: airportReducer,

//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       flightApi.middleware,
//       packageApi.middleware,
//       bookScheduleApi.middleware,
//       userApi.middleware,
//       authApi.middleware,
//       // airportApi.middleware
//     ),
// });

// setupListeners(store.dispatch);

// export default store;
