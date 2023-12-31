import React from 'react';
import { Route, Routes, createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import PackageDetails from '../components/package/PackageDetails';
import FlightList from '../pages/flightSearchList/FlightSearchList';
import PackageMenu from '../components/package/PackageMenu';
import VisaDetails from '../pages/visaDetails/VisaDetails';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import ProtectedRoute from './protectedRoute';
import LoginSuccess from '../pages/login/LoginSuccess';
import PackageReverse from '../components/package/PackageReverse';
import VisaBookSchedule from '../pages/visaDetails/VisaBookSchedule';
import Profile from '../pages/dashboard/Profile';
import PasswordChange from '../pages/dashboard/PasswordChange';
import Booking from '../pages/dashboard/bookingList/Booking';
import FlightBooking from '../pages/dashboard/bookingList/FlightBooking';
import HolidaysBooking from '../pages/dashboard/bookingList/HolidaysBooking';
import VisaBooking from '../pages/dashboard/bookingList/VisaBooking';
import HotelBooking from '../pages/dashboard/bookingList/HotelBooking';
import Dashboard from '../layout/Dashboard';
import AddTraveler from '../pages/dashboard/travelerList/AddTraveler';
import RegularTravelers from '../pages/dashboard/travelerList/RegularTravelers';
import FlightReview from '../pages/flightSearchList/FlightReview';
import ForgotPassword from '../pages/login/ForgotPassword';
import ResetPassword from '../pages/login/ResetPassword';
import ForgotPasswordInstruction from '../pages/login/ForgotPasswordInstruction';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/packages/:id',
        element: <PackageDetails />,
      },
      {
        path: '/flight/search',
        element: <FlightList />,
      },
      {
        path: '/packageMenu',
        element: <PackageMenu />,
      },
      {
        path: '/visaDetails',
        element: <VisaDetails/>
      },
      {
        path: '/register',
        element: <Signup/>     
      },
      {
        path: '/login',
        element: <Login/>     
      },
      {
        path: '/login/success',
        element: <LoginSuccess/>     
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword/>     
      },
      {
        path: '/forgot-password-instruction',
        element: <ForgotPasswordInstruction/>     
      },
      {
        path: '/reset-password/:id/:token',
        element: <ResetPassword/>     
      },
      {
        path: '/packageReserve/:id',
        element: <ProtectedRoute><PackageReverse/></ProtectedRoute>
      },
      {
        path: '/visaBookSchedule/:index',
        element: <ProtectedRoute><VisaBookSchedule/></ProtectedRoute>
      },
      {
        path: '/flight/booking/',
        element: <ProtectedRoute><FlightReview/></ProtectedRoute>
      },
      
    ],
  },
  {
    path: '/app/account',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    children: [
      
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: 'regular-travelers',
        element: <ProtectedRoute><AddTraveler/></ProtectedRoute>,
      },
      {
        path: 'regular-travelers/:id',
        element: <ProtectedRoute><RegularTravelers/></ProtectedRoute>,
      },
      {
        path: 'change-password',
        element: <ProtectedRoute><PasswordChange /></ProtectedRoute>,
      },
      {
        path: 'bookings',
        element: <ProtectedRoute><Booking /></ProtectedRoute>,
        children: [
          {
            path: '',
            element: <FlightBooking />,
          },
          {
            path: 'flight',
            element: <FlightBooking/>,
          },
          {
            path: 'holidays',
            element: <HolidaysBooking/>,
          },
          {
            path: 'visa',
            element: <VisaBooking/>,
          },
          {
            path: 'hotels',
            element: <HotelBooking/>,
          },
        ]
      },
    ]
  },
]);
export default router;
