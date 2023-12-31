import React from 'react';
import './model.css';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPassengerCount,
  setSelectedCabin,
} from '../../slices/passengerSlice';

function Modal({ setOpenModal }) {
const adultCount = useSelector((state) => state.passenger.adultsCount);
    const childrenCount = useSelector((state) => state.passenger.childrenCount);
    const infantsCount = useSelector((state) => state.passenger.infantsCount);
    const selectedCabin = useSelector((state) => state.passenger.selectedCabin);
    const dispatch = useDispatch();
    
  
    const handlePassengerCountChange = (adults, children, infants) => {
      dispatch(setPassengerCount({ adults, children, infants}));
    };
  
    const handleCabinSelection = (selectedOption) => {
      dispatch(setSelectedCabin(selectedOption.value));
    };
  
    const handleIncrementAdultCount = () => {
      handlePassengerCountChange(adultCount + 1, childrenCount, infantsCount);
    };
  
    const handleDecrementAdultCount = () => {
      if (adultCount > 1) {
        handlePassengerCountChange(adultCount - 1, childrenCount, infantsCount);
      }
    };
  
    const handleIncrementChildrenCount = () => {
      handlePassengerCountChange(adultCount, childrenCount + 1, infantsCount);
    };
  
    const handleDecrementChildrenCount = () => {
      if (childrenCount > 0) {
        handlePassengerCountChange(adultCount, childrenCount - 1, infantsCount);
      }
    };
    const handleIncrementInfantsCount = () => {
        handlePassengerCountChange(adultCount, childrenCount, infantsCount + 1);
      };
      
      const handleDecrementInfantsCount = () => {
        if (infantsCount > 0) {
          handlePassengerCountChange(adultCount, childrenCount, infantsCount - 1);
        }
      };
  
    const cabinOptions = [
      { value: 'ECONOMY', label: 'Economy' },
      { value: 'BUSINESS', label: 'Business' },
      { value: 'FIRST', label: 'First Class' },
    ];
  
    const totalCount = adultCount + childrenCount + infantsCount;
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
       
        <h2 className='text-lg pb-3'>Passenger Selection</h2>
        <div className="passenger-container">
          <div className="passenger-option">
            <div className="passenger">
              <h3 className='text-md font-semibold'>Adults</h3>
              <p>12-12+ years</p>
            </div>
            <div className="passenger-input">
              <button className='flightPerson-count' onClick={handleDecrementAdultCount}>-</button>
              <p>{adultCount}</p>
              <button className='flightPerson-count' onClick={handleIncrementAdultCount}>+</button>
            </div>
          </div>
          <div className="passenger-option">
            <div>
              <h3 className='text-md font-semibold'>Children</h3>
              <p>2 - less than 12 years</p>
            </div>
            <div className="passenger-input">
              <button className='flightPerson-count' onClick={handleDecrementChildrenCount}>-</button>
              <p>{childrenCount}</p>
              <button className='flightPerson-count' onClick={handleIncrementChildrenCount}>+</button>
            </div>
          </div>
          <div className="passenger-option">
            <div>
              <h3 className='text-md font-semibold'>infants</h3>
              <p>0 - less than 2 years</p>
            </div>
            <div className="passenger-input">
              <button className='flightPerson-count' onClick={handleDecrementInfantsCount}>-</button>
              <p>{infantsCount}</p>
              <button className='flightPerson-count' onClick={handleIncrementInfantsCount}>+</button>
            </div>
          </div>
          <hr/>
          <div className="passenger-option">
            <h3 className='text-md font-semibold'>Cabin Class</h3>
            <Select
              value={{ value: selectedCabin, label: selectedCabin }}
              onChange={handleCabinSelection}
              options={cabinOptions}
            />
          </div>
        </div>
        <div className="total-count text-lg pt-3">
          <p>Total Passengers: {totalCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
