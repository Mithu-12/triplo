import React, { useEffect, useState } from 'react';
import './FlightBooking.css';
import './Booking.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
const FlightBooking = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const serviceType = 'flight';
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/payment/${userId}/${serviceType}`)
      .then((response) => {
        console.log('flight booking', response.data);
        setOrderList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, [userId, serviceType]);
  return (
    <div className="w-full  bg-white flightBooking">
      
    </div>
  );
};

export default FlightBooking;
