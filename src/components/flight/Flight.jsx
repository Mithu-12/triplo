import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import ToFrom from './toflight';
import {
  setDepartureDate as setDepartureDateAction,
  setReturnDate as setReturnDateAction,
} from '../../slices/toFromSlice';
import { useNavigate } from 'react-router-dom';

import PassangerModal from './PassangerModal';
// import { useSearchFlightsQuery } from '../../api/airportApi';
import axios from 'axios'; 
import { fetchFlights } from '../../slices/airportSlice';
// import { setFlights, setLoading, setError, fetchFlights } from '../../slices/airportSlice';

const Flight = () => {
 
  const [selectedOption, setSelectedOption] = useState('oneWay');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const selectedCabin = useSelector((state) => state.passenger.selectedCabin);
  const adultCount = useSelector((state) => state.passenger.adultsCount);
  const childCount = useSelector((state) => state.passenger.childrenCount);
  const infantCount = useSelector((state) => state.passenger.infantsCount);
  const [cityCount, setCityCount] = useState(1);
  const selectedFromAirport = useSelector((state) => state.toFrom.fromAirport);
  const selectedToAirport = useSelector((state) => state.toFrom.toAirport);
  const selectDepartureDate = useSelector(
    (state) => state.toFrom.departureDate
  );
  const selectReturnDate = useSelector((state) => state.toFrom.returnDate);
  // const searchFlightsQuery = useSearchFlightsQuery()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('departureDate', selectDepartureDate);
  console.log('passanger', adultCount);

  const handleFromChange = (value) => {
    console.log('From:', value);
  };
  const handleToChange = (value) => {
    console.log('To:', value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const getFormattedDate = (date) => {
    if (!date) return '';

    return format(date, 'yyyy-MM-dd');
  };
  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    const formattedDate = getFormattedDate(date); 
    dispatch(setDepartureDateAction(formattedDate)); // Dispatch the formatted date
  };

  const handleReturnDateChange = (date) => {
    if (selectedOption === 'oneWay') {
      setSelectedOption('roundTrip');
    }
    setReturnDate(date);
    const formattedDate = getFormattedDate(date); // Format the date using the function
    dispatch(setReturnDateAction(formattedDate)); // Dispatch the formatted date
  };

 
  const getDayName = (date) => {
    if (!date) return '';

    // const dayIndex = getDay(date);
    const dayName = format(date, 'EEEE');
    return `${dayName}`;
  };

  const handleAddCity = () => {
    setCityCount((prevCount) => prevCount + 1);
  };

  const handleDeleteCity = () => {
    setCityCount((prevCount) => prevCount - 1);
  };
  
  const handleSearchClick = async() => {
    try {
      // Prepare the parameters to pass to the API query
      const params = {
        // Required parameters
        adults: adultCount,
        originLocationCode: selectedFromAirport.code,
        destinationLocationCode: selectedToAirport.code,
        departureDate: getFormattedDate(departureDate),
  
        // Optional parameters (conditionally add them to the params object)
        ...(returnDate && { returnDate: getFormattedDate(returnDate) }),
        ...(childCount && { children: childCount }),
        ...(infantCount && { infants: infantCount }),
        ...(selectedCabin && { travelClass: selectedCabin }),
         max: 10,
      };


      const response = await axios.get('http://localhost:8800/api/airport/search', {
        params: params,
      });
      console.log('Flight data last:', response.data);

        const searchParams = new URLSearchParams({
          flights: JSON.stringify(response.data),
          origin: params.originLocationCode,
          destination: params.destinationLocationCode,
          departure: params.departureDate,
          returnDate: params.returnDate,
          children: params.children,
          infants: params.infants,
          travelClass: params.travelClass,
          max: params.max,
        });
      
      navigate(`/flightList?${searchParams.toString()}`);
      

    } catch (error) {
      console.error('Error occurred while searching flights:', error);
    } 
  };
  
  return (
    <div className="flight-component">
      <div className="p-3 rounded-md">
        <button
          className={`optionButton rounded-s-md ${
            selectedOption === 'oneWay' ? 'active' : ''
          }`}
          onClick={() => handleOptionSelect('oneWay')}
        >
          One-Way
        </button>
        <button
          className={`optionButton  ${
            selectedOption === 'roundTrip' ? 'active' : ''
          }`}
          onClick={() => handleOptionSelect('roundTrip')}
        >
          Round-Trip
        </button>
        <button
          className={`optionButton rounded-tr-lg rounded-br-lg ${
            selectedOption === 'multiCity' ? 'active' : ''
          }`}
          onClick={() => handleOptionSelect('multiCity')}
        >
          MultiCity
        </button>
      </div>

      <div className="flight-content">
        <div className="flight-wrapper">
          {/* <div className="from">
            <p>From</p>
            <input />
          </div> */}

          <div className="toForm">
            <p>To</p>

            <ToFrom
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
            />
          </div>

          <div className="datepicker-container">
            <p>Departure Date</p>
            <DatePicker
              selected={departureDate}
              onChange={handleDepartureDateChange}
              minDate={new Date()}
              placeholderText="Select Date"
              dateFormat="yyyy-MM-dd"
            />
            <p>{getDayName(departureDate)}</p>
          </div>

          <div className="datepicker-container">
            <p>Return Date</p>
            {selectedOption === 'roundTrip' ? (
              <div>
                <DatePicker
                  selected={returnDate}
                  onChange={handleReturnDateChange}
                  minDate={departureDate || new Date()}
                  placeholderText="Select Date"
                  dateFormat="yyyy-MM-dd"
                />
                <p>{getDayName(returnDate)}</p>
              </div>
            ) : (
              <input type="text" disabled />
            )}
          </div>
          <div>
            <button
              className="openModalBtn"
              onClick={() => {
                setModalOpen(true);
                handleSearchClick();
              }}
            >
              <div className="passenger-info">
                <p>Total Passengers: {adultCount}</p>
                <p>Cabin: {selectedCabin}</p>
              </div>
            </button>
            
          </div>
          <PassangerModal/>
        </div>
        <div>
          {selectedOption === 'multiCity' && (
            <div className="p-0 city">
              {[...Array(cityCount)].map((_, index) => (
                <div key={index} className="city-container">
                  <ToFrom
                    handleFromChange={handleFromChange}
                    handleToChange={handleToChange}
                  />
                  <div className="datepicker-container">
                    <p>Departure Date</p>
                    <DatePicker
                      selected={departureDate}
                      onChange={handleDepartureDateChange}
                      minDate={new Date()}
                      placeholderText="Select Date"
                      dateFormat="yyyy-MM-dd"
                    />
                    <p>{getDayName(departureDate)}</p>
                  </div>
                  {index > 1 && (
                    <button onClick={handleDeleteCity}>Delete</button>
                  )}
                </div>
              ))}

              <button className="add-button" onClick={handleAddCity}>
                Add
              </button>

            </div>
          )}
        </div>
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </div>
  );
};



export default Flight;
