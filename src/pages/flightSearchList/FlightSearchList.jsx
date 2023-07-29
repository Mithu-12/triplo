import React, { useEffect, useState } from 'react';

import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import './FlightSearchList.css';
import Button from '../../components/button/Button';
import arrow from '../../../public/arrow.png';
import { useSelector } from 'react-redux';
// import { setFlights } from '../../slices/airportSlice';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import FlightAccordion from './AccordianFlight';
import FlightCarousel from './FlightCarosel';
import FlightInfo from './flightCard';

const FlightList = () => {
  const selectedFromAirport = useSelector((state) => state.toFrom.fromAirport);
  const selectedToAirport = useSelector((state) => state.toFrom.toAirport);

  const [searchParams] = useSearchParams();

  const flights = JSON.parse(searchParams.get('flights'));

  console.log(flights);

  const airlineImages = {
    BG: '../../../public/BG.png',
    VQ: '../../../public/VQ.png',
    BS: '../../../public/BS.png',
  };

  const getCarrierName = (carrierCode) => {
    return flights.dictionaries.carriers[carrierCode] || '';
  };
  const carriers = flights.dictionaries.carriers;
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const time = date.toLocaleString('en-US', timeOptions);

    const dateOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    };
    const newDate = date.toLocaleString('en-US', dateOptions);

    return { time, newDate };
  };

  const getTotalPassengers = (travelerPricings) => {
    let adultCount = 0;
    let childCount = 0;
    let infantCount = 0;

    travelerPricings.forEach((passenger) => {
      if (passenger.travelerType === 'ADULT') {
        adultCount += 1;
      } else if (passenger.travelerType === 'CHILD') {
        childCount += 1;
      } else if (passenger.travelerType === 'HELD_INFANT') {
        infantCount += 1;
      }
    });

    return {
      adults: adultCount,
      children: childCount,
      infants: infantCount,
    };
  };

  const getTotalPrice = (travelerPricings) => {
    let totalPrice = 0;

    travelerPricings.forEach((passenger) => {
      totalPrice += parseFloat(passenger.price.total);
    });
    const discount = 0.05;
    const discountPrice = totalPrice - totalPrice * discount;
    return {
      originalPrice: totalPrice.toFixed(0),
      discountPrice: discountPrice.toFixed(0),
    };
  };
  const [isOpenArray, setIsOpenArray] = useState(
    new Array(flights.length).fill(false)
  );

  const toggleAccordion = (index) => {
    setIsOpenArray((prevIsOpenArray) => {
      const updatedIsOpenArray = [...prevIsOpenArray];
      updatedIsOpenArray[index] = !updatedIsOpenArray[index];
      return updatedIsOpenArray;
    });
  };

  return (
    <div>
      {flights && (
        <div>
          {flights.data?.map((flight, index) => {
            const price = getTotalPrice(flight.travelerPricings);
            const weight =
              flight.travelerPricings[0].fareDetailsBySegment[0]
                .includedCheckedBags.weight;

            return (
              <div key={flight.id}>
                <ContentWrapper>
                  <div className="flex">
                    <div className="basis-3/12">
                      {' '}
                      <h2>hello</h2>
                    </div>
                    <div className="basis-9/12 my-4">
                      <div
                        className="flex"
                        onClick={() => toggleAccordion(index)}
                      >
                        <div
                          key={flight.id}
                          className="basis-10/12 bg-white shadow-lg  px-6 py-10 ml-6  "
                        >
                          <FlightInfo
                            flight={flight}
                            itineraryIndex={0}
                            selectedFromAirport={selectedFromAirport}
                            selectedToAirport={selectedToAirport}
                            airlineImages={airlineImages}
                            carriers={flights.dictionaries.carriers}
                          />
                          <div className='pt-8'>
                          {flight?.itineraries?.length > 1 && (
                            <FlightInfo
                              flight={flight}
                              itineraryIndex={1}
                              selectedFromAirport={selectedToAirport}
                              selectedToAirport={selectedFromAirport}
                              airlineImages={airlineImages}
                              carriers={flights.dictionaries.carriers}
                            />
                          )}
                          </div>
                        </div>
                        <div className="basis-2/12 personalContainer shadow-md ">
                          <div className="personalInfo">
                            <p className="py-3">{weight} kg</p>
                            <div className="flex items-center text-center justify-center ">
                              <p>
                                {
                                  getTotalPassengers(flight.travelerPricings)
                                    .adults
                                }
                                AD,{' '}
                              </p>
                              <p>
                                {
                                  getTotalPassengers(flight.travelerPricings)
                                    .children
                                }
                                CH,{' '}
                              </p>
                              <p>
                                {
                                  getTotalPassengers(flight.travelerPricings)
                                    .infants
                                }
                                IN
                              </p>
                            </div>

                            <p className=" font-thin py-1 line-through">
                              {price.originalPrice}
                            </p>
                            <p className="text-lg font-bold py-1">
                              {price.discountPrice}
                            </p>
                            <Button
                              className="px-4 py-2 text-sm rounded-sm"
                              title="Book Now"
                            />
                          </div>
                        </div>
                      </div>
                      <FlightAccordion
                        key={flight.id}
                        flight={flight}
                        isOpen={isOpenArray[index]}
                        toggleAccordion={() => toggleAccordion(index)}
                      />
                    </div>
                  </div>
                </ContentWrapper>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FlightList;
