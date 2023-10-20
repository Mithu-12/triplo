import React, { useState } from 'react';
import FlightCarousel from '../FlightCarosel';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightArrowLeft,
  faChevronDown,
  faArrowRightLong,
  faCalendarCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import './AccordionBookingFlight.css';

const AccordionFlightBooking = ({ flight, isOpen, toggleAccordion }) => {
  const adultCount = useSelector((state) => state.passenger.adultsCount);
  const childCount = useSelector((state) => state.passenger.childrenCount);
  const infantCount = useSelector((state) => state.passenger.infantsCount);
  const selectedFromAirport = useSelector((state) => state.toFrom.fromAirport);
  const selectedToAirport = useSelector((state) => state.toFrom.toAirport);
  const selectDepartureDate = useSelector(
    (state) => state.toFrom.departureDate
  );
  const selectReturnDate = useSelector((state) => state.toFrom.returnDate);
  const totalPassenger = adultCount + childCount + infantCount;

  console.log('selectReturnDate', selectReturnDate);
  
  return (
    <div className={`flight-accordion ${isOpen ? 'open' : ''}`}>
      <div className="accordion-booking-header" onClick={toggleAccordion}>
        <div>
          <h3 className="text-lg">Flight Summery</h3>

          <div className="flex gap-2 items-center font-semibold">
            <p>{selectedFromAirport.code}</p>
            {selectReturnDate !== null ? (
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            ) : (
              <FontAwesomeIcon icon={faArrowRightLong} />
            )}
            <p>{selectedToAirport.code}</p>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarCheck} />
              <p>{selectDepartureDate}</p>
            </div>
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faUser} />
              {totalPassenger}
              <p>Passenger</p>{totalPassenger > 1 && '(s)'}
            </div>
          </div>
        </div>
        <div className="flex items-center ">
          <h3 className="pr-3">{`${
            isOpen ? 'Hide Details' : 'Show Details'
          }`}</h3>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`icon ${isOpen ? 'open' : ''}`}
          />
        </div>
      </div>

      
        <div className="accordion-content">
          <FlightCarousel flight={flight} />
        </div>
   
    </div>
  );
};

export default AccordionFlightBooking;
