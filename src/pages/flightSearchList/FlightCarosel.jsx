import React, { useState } from 'react';
import './FlightCarosel.css';
import { useSelector } from 'react-redux';
import { faPlaneUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WeightDetails from './FlightDetails/WeightDetails';
import FareDetails from './FlightDetails/FareDetails';

const FlightCarousel = ({ flight }) => {
  const selectedFromAirport = useSelector((state) => state.toFrom.fromAirport);
  const selectedToAirport = useSelector((state) => state.toFrom.toAirport);
  const [activeButton, setActiveButton] = useState(1);
  const flights = useSelector((state) => state.airport.flights);
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  console.log('carosuel', flights)
const arrow = '../../../public/arrow.png'
  console.log('first flight carousel', flight)
    const getCarrierName = (carrierCode) => {
      return flights?.dictionaries?.carriers[carrierCode] || '';
    };
    const getAircraftName = (aircraftCode) => {
      return flights?.dictionaries?.aircraft[aircraftCode] || '';
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
    const airlineCode = flight.validatingAirlineCodes[0];
    const airlineName = getCarrierName(
      flight.itineraries[0].segments[0].carrierCode
    );
    const aircraftName = getAircraftName(
      flight.itineraries[0].segments[0].aircraft.code
    )
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
    const durationText = `${hours}h ${minutes}min`;
    // Check if it's a non-stop flight
    const stopType =
      numberOfStops === 0 ? 'Nonstop' : `${numberOfStops} stop(s)`;

  return (
    <div>
        <div className="custom-carousel">
            <div className="carousel-buttons">
              <button
                className={activeButton === 1 ? 'active' : ''}
                onClick={() => handleButtonClick(1)}
              >
                FLIGHT DETAILS
              </button>
              <button
                className={activeButton === 2 ? 'active' : ''}
                onClick={() => handleButtonClick(2)}
              >
                FLIGHT FARE
              </button>
              <button
                className={activeButton === 3 ? 'active' : ''}
                onClick={() => handleButtonClick(3)}
              >
                BAGGAGE
              </button>
              <button
                className={activeButton === 4 ? 'active' : ''}
                onClick={() => handleButtonClick(4)}
              >
                FARE RULES
              </button>
            </div>
            <div className="carousel-container">
              <div
                className="carousel-content"
                style={{
                  transform: `translateX(calc(-${(activeButton - 1) * 100}%))`,
                }}
              >
                <div className={`slide slide-${activeButton}`}>
                  <div
                    key={flight.id}
                    className=" bg-white shadow-lg flex py-10 px-6  justify-between align-middle items-center"
                  >
                    <div className="text-center">
                      <p className="text-xs font-semibold w-20 text-center">{airlineName}</p>
                    </div>
                    <div className="text-center">
                    <FontAwesomeIcon icon={faPlaneUp} />
                      <p className="text-xs font-semibold w-12 text-center">{aircraftName}</p>
                    </div>
                    
                    <div className='text-center'>
                      <div className="flex">
                        <p className='pl-8'>{departureAirportCode}</p>
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
                    <div className="text-center">
                      <div className="flex">
                        <p className="pl-10">{arrivalAirportCode}</p>
                        <p className="pl-2">{arrival.time}</p>
                      </div>
                      <p>{selectedToAirport.name.slice(0, 20)}...</p>
                      <p>{arrival.newDate}</p>
                    </div>
                  </div>
                </div>

                <div className={`slide slide-${activeButton}`}>
                  <FareDetails flight={flight}/>
                </div>

                <div className={`slide slide-${activeButton}`}>
                  <WeightDetails flight={flight}/>
                </div>

                <div className={`slide slide-${activeButton}`}>
                  <p>Content for Button 4 Add your content here </p>
                </div>
              </div>
            </div>
          </div>
          )
          </div>
  );
};

export default FlightCarousel;
