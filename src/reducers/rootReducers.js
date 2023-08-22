import { combineReducers } from '@reduxjs/toolkit';
import airportReducer from '../slices/airportSlice';
import bookScheduleReducer from '../slices/bookScheduleSlice';
import navbarReducer from '../slices/navbarSlice';
import toFromReducer from '../slices/toFromSlice';
import passengerReducer from '../slices/passengerSlice';
import packageReducer from '../slices/packageSlice'
import visaReducer from '../slices/visaSlice'
import { packageApi } from '../api/packageApi'; 
import { visaApi } from '../api/visa';
import authApi from '../api/authApi';
import authReducer from '../slices/authSlice'
import packageReserveOrderReducer from '../slices/packageReserveOrderSlice';
const rootReducer = combineReducers({
  airport: airportReducer,
  bookSchedule: bookScheduleReducer,
  navbar: navbarReducer,
  toFrom: toFromReducer,
  passenger: passengerReducer,
  package: packageReducer,
  visa: visaReducer,
  auth: authReducer,
  packageReserveOrder: packageReserveOrderReducer,
  [packageApi.reducerPath]: packageApi.reducer,
  [visaApi.reducerPath]: visaApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;