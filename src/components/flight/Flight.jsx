import React, { useEffect, useRef, useState } from 'react';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import Modal from './Model';
import useOutsideClick from '../../hooks/useOutsideClick';

const Flight = () => {
  const [selectedOption, setSelectedOption] = useState('oneWay');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  console.log('selectDepartureDate', selectDepartureDate);
  console.log('selectReturnDate', selectReturnDate);

  const totalPassenger = adultCount + childCount + infantCount;
  const handleFromChange = (value) => {
    console.log('From:', value);
  };
  const handleToChange = (value) => {
    console.log('To:', value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    if (selectedOption === 'oneWay') {
      setReturnDate(null);
      dispatch(setReturnDateAction(null));
    } else if (selectedOption === 'roundTrip') {
      const nextDay = new Date(departureDate);
      nextDay.setDate(departureDate.getDate() + 1);
      setReturnDate(nextDay);
      dispatch(setReturnDateAction(getFormattedDate(nextDay)));
    } else if (selectedOption === 'multiCity') {
      setReturnDate(null);
      dispatch(setReturnDateAction(null));
    }
  }, [selectedOption, departureDate]);
  const getFormattedDate = (date) => {
    if (!date) return '';

    return format(date, 'yyyy-MM-dd');
  };
  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    const formattedDate = getFormattedDate(date);
    dispatch(setDepartureDateAction(formattedDate));
  };
  const getMinReturnDate = () => {
    return departureDate || new Date();
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    const formattedDate = getFormattedDate(date);
    dispatch(setReturnDateAction(formattedDate));
  };

  const handleReturnDateClick = () => {
    setSelectedOption('roundTrip');
    dispatch(setReturnDateAction(getFormattedDate(departureDate)));
  };
  const getDayName = (date) => {
    if (!date) return '';
    const dayName = format(date, 'EEEE');
    return `${dayName}`;
  };

  const handleAddCity = () => {
    if (cityCount < 4) {
      setCityCount((prevCount) => prevCount + 1);
    }
  };

  const handleDeleteCity = () => {
    setCityCount((prevCount) => prevCount - 1);
  };

  const handleSearchClick = async () => {
    try {
      const params = {
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

      const queryString = new URLSearchParams(params).toString();
      navigate(`/flight/search?${queryString}`);
    } catch (error) {
      console.error('Error occurred while searching flights:', error);
    }
  };

  useOutsideClick(modalRef, () => {
    setModalOpen(false);
  });

  return (
    <div className="flight-component bg-white">
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
          <div className="toForm">
            <ToFrom
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              selectedOption={selectedOption}
            />
          </div>
          <div className="flex date-container">
            <div className="datepicker-container">
              <p>Departure Date</p>
              <DatePicker
                selected={departureDate}
                onChange={handleDepartureDateChange}
                minDate={new Date()}
                placeholderText="Select Date"
                dateFormat="yyyy-MM-dd"
              />
              <p>
                {' '}
                <FontAwesomeIcon
                  style={{ color: '#FFC610' }}
                  icon={faCalendarCheck}
                />{' '}
                {getDayName(departureDate)}
              </p>
            </div>

            {selectedOption !== 'multiCity' && (
              <div className="return-container">
                {selectedOption === 'roundTrip' ? (
                  <div className="date-picker-container">
                    <p>Return Date</p>
                    <DatePicker
                      onChange={handleReturnDateChange}
                      selected={returnDate}
                      minDate={getMinReturnDate()}
                      placeholderText="Select Date"
                      dateFormat="yyyy-MM-dd"
                    />
                    <p>
                      {returnDate && (
                        <FontAwesomeIcon
                          style={{ color: '#FFC610' }}
                          icon={faCalendarCheck}
                        />
                      )}{' '}
                      {getDayName(returnDate)}
                    </p>
                  </div>
                ) : (
                  <div
                    className="returnDate-select"
                    onClick={handleReturnDateClick}
                  >
                    <p>SAVE MORE ON</p>
                    <p className="font-bold">Return Flight</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div ref={modalRef}>
            <button
              className="openModalBtn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <div className="passenger-info">
                <p>Passenger and Class</p>
                <p className="font-bold">{totalPassenger} Persons</p>
                <p>{selectedCabin}</p>
              </div>
            </button>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
          </div>
          {/* <PassangerModal/> */}
        </div>
        <div>
          {selectedOption === 'multiCity' && (
            <div className="p-0 city flex flex-col">
              {[...Array(cityCount)].map((_, index) => (
                <div key={index} className="city-container ">
                  <div className="toForm">
                    <ToFrom
                      handleFromChange={handleFromChange}
                      handleToChange={handleToChange}
                      selectedOption={selectedOption}
                    />
                  </div>
                  <div className="date-container py-5">
                    <div className="datepicker-container">
                      <p>Departure Date</p>
                      <DatePicker
                        selected={departureDate}
                        onChange={handleDepartureDateChange}
                        minDate={new Date()}
                        placeholderText="Select Date"
                        dateFormat="yyyy-MM-dd"
                      />
                      <p>
                        {' '}
                        <FontAwesomeIcon
                          style={{ color: '#FFC610' }}
                          icon={faCalendarCheck}
                        />{' '}
                        {getDayName(departureDate)}
                      </p>
                    </div>
                  </div>

                  <div className='block'>
                  {index === cityCount - 1 ? (
                    <button
                      className="add-button border py-2 px-12 font-semibold"
                      onClick={handleAddCity}
                    >
                      + Add Another City
                    </button>
                  ): <div></div>}
                  </div>
                  {index > 0 && (
                    <button
                      className="font-bold w-12 h-12 text-2xl border rounded-full ml-5"
                      onClick={handleDeleteCity}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="flightSearch-button" onClick={handleSearchClick}>
          {' '}
          <FontAwesomeIcon icon={faMagnifyingGlass} /> SEARCH FLIGHT
        </button>
      </div>
    </div>
  );
};

export default Flight;
