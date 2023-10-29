import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './HolidaysBooking.css';
import {
  faUser,
  faCalendarDays,
  faIdCard,
  faUmbrellaBeach,
  faChevronRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderSpiner from '../../../components/Loader/LoaderSpiner';
const HolidaysBooking = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const serviceType = 'holidays';

  useEffect(() => {
    axios
      .get(`https://triplo-flight.onrender.com/api/payment/${userId}/${serviceType}`)
      .then((response) => {
        console.log('flight booking', response.data);
        setOrderList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      }).finally(() => {
        setLoading(false); 
      });
  }, [userId, serviceType]);
  return (
    <div className=" w-full">
     {loading ? <LoaderSpiner/> :(
      orderList.length > 0 ? (
        <div>
          {orderList?.map((order, index) => {
            const travelersDate = order?.travelersData.travelDate;
            const formattedDate = new Date(travelersDate)
              .toISOString()
              .split('T')[0];
            return (
              <div key={index} className="bg-white my-5">
                <div className="holidaysOrder-title mb-2 text-white font-bold text-lg">
                  <p>{order.productData.package}</p>
                  <p>৳ {order.price}</p>
                </div>
                <div className="flex justify-around p-5">
                  <div className="font-semibold">
                    <div>
                      <p className=" flex gap-3 items-center">
                        <FontAwesomeIcon icon={faUser} /> {order?.travelers}{' '}
                        Person
                      </p>
                    </div>
                    <div className="flex gap-3 py-5">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      {formattedDate}
                    </div>
                    <div className="flex gap-3 items-center">
                      <p>Payment Status: </p>
                      <p className="text-amber-500">
                        {order?.paymentStatus.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold">
                    <div className="flex gap-3 items-center">
                      <FontAwesomeIcon icon={faIdCard} />
                      <p>{order._id}</p>
                    </div>
                    <div className="flex gap-3 py-5">
                      <FontAwesomeIcon icon={faUmbrellaBeach} />
                      <p>Selected Plans: STANDARD</p>
                    </div>
                    <div className="flex gap-3">
                      <p>Booking Status: </p>
                      <p className="text-amber-500">
                        {order?.paymentStatus === 'success'
                          ? 'CONFIRM'
                          : 'CANCEL'}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <hr></hr>
                  <div className="flex justify-between p-4 text-md font-semibold">
                    <p className='flex items-center gap-2'><FontAwesomeIcon icon={faStar} style={{color: "#fd1808",}} />{order?.productData?.rating}</p>
                    <p>
                      Show MOre <FontAwesomeIcon icon={faChevronRight} />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='flex items-center justify-center bg-white w-full h-48 font-semibold text-lg '>You have not any holidays order of List</div>
      )
     )}
    </div>
  );
};

export default HolidaysBooking;
