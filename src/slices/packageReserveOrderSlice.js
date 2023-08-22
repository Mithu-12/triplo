import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: null,
  travelers: {
    adults: 1,
    child: 0,
    child2: 0,
    infants: 0,
  },
  rooms: {
    singleRoom: 1,
    doubleRoom: 0,
    twinRoom: 0,
    tripleRoom: 0,
  },
  address: {
    title: '',
    gender: '',
    firstName: '',
    lastName: '',
    email: '',
    number: '',
  },
  payment: false,
  paymentType: null,
  price: 0,
};

const packageOrderSlice = createSlice({
  name: 'PackageReserveOrder',
  initialState,
  reducers: {
    setReserveDate: (state, action) => {
      state.date = action.payload;
    },
    setReserveTravelers: (state, action) => {
      const { adults, child, child2, infants } = action.payload;
      state.travelers = {
        ...state.travelers,
        adults,
        child,
        child2,
        infants,
      };
    },
    setReserveRooms: (state, action) => {
      const { singleRoom, doubleRoom, twinRoom, tripleRoom } = action.payload;
      state.rooms = {
        ...state.rooms,
        singleRoom,
        doubleRoom,
        twinRoom,
        tripleRoom,
      };
    },
    setReserveAddress: (state, action) => {
      const { title, gender, firstName, lastName, number, email } = action.payload;
      state.address = {
        ...state.address,
        title,
        gender,
        firstName,
        lastName,
        number,
        email,
      };
    },
    setReservePrice: (state, action) => {
      state.price = action.payload;
    },
    setReservePaymentType: (state, action) => {
      state.paymentType = action.payload;
    },
    setReservePayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const {
  setReserveDate,
  setReserveTravelers,
  setReserveRooms,
  setReserveAddress,
  setReservePayment,
  setReservePaymentType,
  setReservePrice,
} = packageOrderSlice.actions;

export default packageOrderSlice.reducer;
