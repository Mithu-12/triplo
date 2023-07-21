import React, { useEffect, useState } from 'react';
import { useSearchFlightsQuery } from '../../api/airportApi';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import './FlightSearchList.css';
import Button from '../../components/button/Button';
import arrow from '../../../public/arrow.png';
import { useSelector } from 'react-redux';
// import { setFlights } from '../../slices/airportSlice';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

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
  return (
    <div>
      {flights && (
        <div>
          {flights.data?.map((flight) => {
            const airlineCode = flight.validatingAirlineCodes[0];
            const airlineName = getCarrierName(
              flight.itineraries[0].segments[0].carrierCode
            );
            const departureAirportCode =
              flight.itineraries[0].segments[0].departure.iataCode;
            const arrivalAirportCode =
              flight.itineraries[0].segments[0].arrival.iataCode;

            const departureDateTime =
              flight.itineraries[0].segments[0].departure.at;
            const arrivalDateTime =
              flight.itineraries[0].segments[0].arrival.at;

            const departure = formatDateTime(departureDateTime);
            const arrival = formatDateTime(arrivalDateTime);

            const imageUrl = airlineImages[airlineCode];

            const duration = flight.itineraries[0].segments[0].duration;
            const numberOfStops =
              flight.itineraries[0].segments[0].numberOfStops;
            const durationRegex = /PT(\d+H)?(\d+M)/;
            const match = duration.match(durationRegex);
            let hours = 0;
            let minutes = 0;

            if (match) {
              if (match[1]) {
                hours = parseInt(match[1]); 
              }

              if (match[2]) {
                minutes = parseInt(match[2]); 
              }
            }

            // Calculate hours and minutes
            {
              /* const hours = Math.floor(minutes / 60);
            minutes = minutes % 60; */
            }
            const durationText = `${hours}h ${minutes}min`;
            // Check if it's a non-stop flight
            const stopType =
              numberOfStops === 0 ? 'Nonstop' : `${numberOfStops} stop(s)`;

            const price = getTotalPrice(flight.travelerPricings);
            const weight =
              flight.travelerPricings[0].fareDetailsBySegment[0]
                .includedCheckedBags.weight;

            return (
              <div>
                <ContentWrapper>
                  <div className="flex">
                    <div className="basis-3/12">
                      {' '}
                      <h2>hello</h2>
                    </div>
                    <div className="basis-9/12 my-4">
                      <div className="flex">
                        <div
                          key={flight.id}
                          className="basis-10/12 bg-white shadow-lg flex px-6 py-10 ml-6  justify-between align-middle items-center"
                        >
                          <div className="">
                            {imageUrl && (
                              <img
                                className="w-14 h-13 m-auto"
                                src={imageUrl}
                                alt={airlineCode}
                              />
                            )}
                            <p className="text-xs font-semibold">
                              {airlineName}
                            </p>
                          </div>
                          <div>
                            <div className="flex">
                              <p>{departureAirportCode}</p>
                              {'  '}
                              <p className="pl-2">{departure.time}</p>
                            </div>
                            <p>{selectedFromAirport.name.slice(0, 20)}...</p>
                            <p>{departure.newDate}</p>
                          </div>
                          <div className="text-center">
                            <p className="arrowText">{durationText}</p>
                            <img className="arrow w-20" src={arrow} />
                            <p className="arrowText">{stopType}</p>
                          </div>
                          <div>
                            <div className="flex">
                              <p>{arrivalAirportCode}</p>
                              <p className="pl-2">{arrival.time}</p>
                            </div>
                            <p>{selectedToAirport.name.slice(0, 20)}...</p>
                            <p>{arrival.newDate}</p>
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
