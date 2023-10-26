import React, { useState } from 'react';
import useFlightPrice from '../../hooks/useFlightPrice';
import FlightInfo from './flightCard';
import FlightAccordion from './accordianFlight/AccordianFlight';

import {  useSelector } from 'react-redux';
import { Link} from 'react-router-dom';


const SingleFlightDetails = ({ flight, index, searchUid, sessionEndTime }) => {
  const [isOpenArray, setIsOpenArray] = useState([]);
  const selectedFromAirport = useSelector((state) => state.toFrom.fromAirport);
  const selectedToAirport = useSelector((state) => state.toFrom.toAirport);
  const flights = useSelector((state) => state.airport.flights);
  const {
    totalBaseFare,
    totalFare,
    adultsNum,
    childNum,
    infantsNum,
  } = useFlightPrice(flight);

  const weight =
    flight?.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags
      .weight;

  const toggleAccordion = (index) => {
    setIsOpenArray((prevIsOpenArray) => {
      const updatedIsOpenArray = [...prevIsOpenArray];
      updatedIsOpenArray[index] = !updatedIsOpenArray[index];
      return updatedIsOpenArray;
    });
  };

//  const arrow = '/arrow.png';

  const airlineImages = {
    BG: '/BG.png',
    VQ: '/VQ.png',
    BS: '/BS.png',
  };

  

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {flight ? (<div key={flight?.id} className="my-8 ml-6 singleFlight-container">
      <div className="flex border">
        <div
          key={flight?.id}
          className="basis-10/12 bg-white shadow-lg  px-6 py-12  cursor-pointer"
          onClick={() => toggleAccordion(index)}
        >
          <FlightInfo
            flight={flight}
            itineraryIndex={0}
            selectedFromAirport={selectedFromAirport}
            selectedToAirport={selectedToAirport}
            airlineImages={airlineImages}
            carriers={flights?.dictionaries?.carriers}
          />
          <div className="pt-8">
            {flight?.itineraries?.length > 1 && (
              <FlightInfo
                flight={flight}
                itineraryIndex={1}
                selectedFromAirport={selectedToAirport}
                selectedToAirport={selectedFromAirport}
                airlineImages={airlineImages}
                carriers={flights?.dictionaries?.carriers}
              />
            )}
          </div>
        </div>
        <div className="basis-2/12 flightPersonalContainer shadow-md ">
          <div className="flightPersonalInfo">
            <p className="py-3">{weight ?? 'NOT INCLUDE'} kg</p>
            <div className="flex items-center text-center justify-center ">
              <p>
                {adultsNum}
                AD,{' '}
              </p>
              <p>
                {childNum}
                CH,{' '}
              </p>
              <p>
                {infantsNum}
                IN
              </p>
            </div>

            <p className=" font-thin py-1 line-through">৳ {totalBaseFare}</p>

            <p className="text-lg font-bold py-1">৳ {totalFare}</p>
            <Link style={{backgroundColor: '#FFC610', padding: '8px 16px', borderRadius: '5px'}}
              to={`/flight/booking?searchId=${searchUid}&index=${flight?.id}`}
              state={{
                sessionEndTime,
                flightData: flight,
              }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
      <FlightAccordion
        key={flight?.id}
        flight={flight}
        isOpen={isOpenArray[index]}
        toggleAccordion={() => toggleAccordion(index)}
      />
    </div>) : <div>
      <p>There have  no flight list</p>
    </div> }

    </div>
  );
};

export default SingleFlightDetails;
