import React from 'react'
import FlightBooking from './FlightBooking';
import HolidaysBooking from './HolidaysBooking';
import VisaBooking from './VisaBooking';
import HotelBooking from './HotelBooking';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveOption } from '../../../slices/navbarSlice';
import { faUser, faPlaneUp, faUmbrellaBeach, faEarthEurope, faHotel} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Booking.css'

const Booking = () => {
  const dispatch = useDispatch();
  const activeOption = useSelector((state) => state.navbar.activeOption);

  const handleOptionClick = (option) => {
    dispatch(setActiveOption(option));
  };


  const content = [
    { option: 'flight', component: <FlightBooking /> },
    { option: 'holiday', component: <HolidaysBooking /> },
    { option: 'visa', component: <VisaBooking /> },
    { option: 'hotels', component: <HotelBooking /> },
  ];

  return (
    
      <div className="dashboardBookingContent">
            <ul className="menuItems custom-carousel ">
              <li
                className={`menuItem shadow-lg ${
                  activeOption === 'flight' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('flight')}
              >
               <FontAwesomeIcon className='menuItem-icons' icon={faPlaneUp} />
                FLIGHT
              </li>
              <li
                className={`menuItem borderItem ${
                  activeOption === 'holiday' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('holiday')}
              >
              <FontAwesomeIcon className='menuItem-icons' icon={faUmbrellaBeach} />
                HOLIDAYS
              </li>
              <li
                className={`menuItem borderItem ${
                  activeOption === 'visa' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('visa')}
              >
              <FontAwesomeIcon className='menuItem-icons' icon={faEarthEurope} />
                VISA
              </li>
              <li
                className={`menuItem borderItem ${
                  activeOption === 'hotels' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('hotels')}
              >
              <FontAwesomeIcon className='menuItem-icons' icon={faHotel} />
                HOTEL
              </li>
            </ul>

            <div className="carousel-container">
      <div className="carousel-content" style={{
                transform: `translateX(calc(-${content.findIndex(item => item.option === activeOption) * 100}%))`,
              }}>
              {content.map((item, index) => (
            <div key={index} className={`slide slide-${item.option}`}>
              {item.component}
            </div>
          ))}
            </div>
            </div>
          </div>
    
  )
}

export default Booking