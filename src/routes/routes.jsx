import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import PackageDetails from '../components/package/PackageDetails';
import FlightList from '../pages/flightSearchList/FlightSearchList';
import PackageMenu from '../components/package/PackageMenu';


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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/packages/:id',
        element: <PackageDetails />,
      },
      {
        path: '/flightList',
        element: <FlightList />,
      },
      {
        path: '/packageMenu',
        element: <PackageMenu />,
      },
    ],
  },
]);
export default router;
