import React, { useEffect, useState } from 'react';
import './FlightBooking.css';
import './Booking.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  faUser,
  faCalendarDays,
  faIdCard,
  faUmbrellaBeach,
  faChevronRight,
  faStar,
  faArrowRightArrowLeft,
  faArrowRightLong
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderSpiner from '../../../components/Loader/LoaderSpiner';
const FlightBooking = () => {
  const user = useSelector((state) => state.auth.user);
  const selectedFromAirport = useSelector((state) => state.toFrom.fromAirport);
  const selectedToAirport = useSelector((state) => state.toFrom.toAirport);
  const selectDepartureDate = useSelector(
    (state) => state.toFrom.departureDate
  );
  const selectReturnDate = useSelector((state) => state.toFrom.returnDate)
  const userId = user?._id;
  const serviceType = 'flight';
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true)

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
     {loading ? <LoaderSpiner/>: (
      orderList.length > 0 ? (
        <div>
          {orderList?.map((order, index) => {
            const travelersDate = order?.travelersData?.deliveryDate;
            const formattedDate = new Date(travelersDate)
              .toISOString()
              .split('T')[0];
            return (
              <div className="bg-white mb-5 " key={index}>
                <div className="holidaysOrder-title mb-2 text-white  text-lg">
                  <div className="flex gap-2 items-center">
                    <p>{selectedFromAirport.code}</p>
                    {selectReturnDate !== null ? (
                      <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowRightLong} />
                    )}
                    <p>{selectedToAirport.code}</p>
                  </div>
                  <p className='font-bold'>৳ {order.price}</p>
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
                      <p>Booking ID:</p>

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
                    <p className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: '#fd1808' }}
                      />
                      {order?.productData?.rating}
                    </p>
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
        <div className='flex items-center justify-center bg-white w-full h-48 font-semibold text-lg '>You have not any Flight order of List</div>
      )
     )}
    </div>
  );
};

export default FlightBooking;
