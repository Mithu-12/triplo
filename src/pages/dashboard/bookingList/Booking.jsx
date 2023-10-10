

import React, { useState } from 'react';
import {  Outlet, useNavigate, useParams } from 'react-router-dom';
import { faPlaneUp, faUmbrellaBeach, faEarthEurope, faHotel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Booking.css';


const Booking = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [activeOption, setActiveOption] = useState('flight')

  // Check if section is undefined or an empty string and set a default value
  // const activeSection = section || 'flight';

  console.log('activeSection', activeOption);

  const handleOptionClick = (option) => {
    setActiveOption(option)
    navigate(`/app/account/bookings/${option}`);
  };

  const content = [
    { option: 'flight', icon: faPlaneUp },
    { option: 'holidays', icon: faUmbrellaBeach },
    { option: 'visa', icon: faEarthEurope },
    { option: 'hotels', icon: faHotel },
  ];

  return (
    <div className="dashboardBookingContent">
      <ul className="menuItems custom-carousel">
        {content.map((item) => (
          <li
            key={item.option}
            className={`menuItem shadow-lg ${
              activeOption === item.option ? 'active' : ''
            }`}
            onClick={() => handleOptionClick(item.option)}
          >
            <FontAwesomeIcon
              className="menuItem-icons"
              icon={item.icon}
            />
            {item.option.toUpperCase()}
          </li>
        ))}
      </ul>

      <div className="carousel-container">
        <div
          className="carousel-content"
          // style={{
          //   transform: `translateX(calc(-${
          //     content.findIndex((item) => item.option === activeOption) * 100
          //   }%))`,
          // }}
        >
          <Outlet></Outlet>
        </div>
      </div>
   

    </div>
  );
};

export default Booking;











// import React, { useState } from 'react'
// import FlightBooking from './FlightBooking';
// import HolidaysBooking from './HolidaysBooking';
// import VisaBooking from './VisaBooking';
// import HotelBooking from './HotelBooking';
// import { useDispatch, useSelector } from 'react-redux';
// import { faUser, faPlaneUp, faUmbrellaBeach, faEarthEurope, faHotel} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './Booking.css'
// import { useNavigate, useParams } from 'react-router-dom';

// const Booking = () => {
//   const navigate = useNavigate();
//   const { section } = useParams();
//   const [activeOption, setActiveOption] = useState('flight')

//   const handleOptionClick = (option) => {
//     setActiveOption(option)
//   };

//   const content = [
//     { option: 'flight', component: <FlightBooking /> },
//     { option: 'holiday', component: <HolidaysBooking /> },
//     { option: 'visa', component: <VisaBooking /> },
//     { option: 'hotels', component: <HotelBooking /> },
//   ];

//   return (

//       <div className="dashboardBookingContent">
//             <ul className="menuItems custom-carousel ">
//               <li
//                 className={`menuItem shadow-lg ${
//                   activeOption === 'flight' ? 'active' : ''
//                 }`}
//                 onClick={() => handleOptionClick('flight')}
//               >
//                <FontAwesomeIcon className='menuItem-icons' icon={faPlaneUp} />
//                 FLIGHT
//               </li>
//               <li
//                 className={`menuItem borderItem ${
//                   activeOption === 'holiday' ? 'active' : ''
//                 }`}
//                 onClick={() => handleOptionClick('holiday')}
//               >
//               <FontAwesomeIcon className='menuItem-icons' icon={faUmbrellaBeach} />
//                 HOLIDAYS
//               </li>
//               <li
//                 className={`menuItem borderItem ${
//                   activeOption === 'visa' ? 'active' : ''
//                 }`}
//                 onClick={() => handleOptionClick('visa')}
//               >
//               <FontAwesomeIcon className='menuItem-icons' icon={faEarthEurope} />
//                 VISA
//               </li>
//               <li
//                 className={`menuItem borderItem ${
//                   activeOption === 'hotels' ? 'active' : ''
//                 }`}
//                 onClick={() => handleOptionClick('hotels')}
//               >
//               <FontAwesomeIcon className='menuItem-icons' icon={faHotel} />
//                 HOTEL
//               </li>
//             </ul>

//             <div className="carousel-container">
//       <div className="carousel-content" style={{
//                 transform: `translateX(calc(-${content.findIndex(item => item.option === activeOption) * 100}%))`,
//               }}>
//               {content.map((item, index) => (
//             <div key={index} className={`slide slide-${item.option}`}>
//               {item.component}
//             </div>
//           ))}
//             </div>
//             </div>
//           </div>

//   )
// }

// export default Booking

// // Booking.js


// import React from 'react';
// import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
// import { faPlaneUp, faUmbrellaBeach, faEarthEurope, faHotel } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './Booking.css';

// const Booking = () => {
//   const navigate = useNavigate();
//   const { section = 'flight' } = useParams();

//   console.log('section', section)

//   const handleOptionClick = (option) => {
//     navigate(`/app/account/bookings/${option}`);
//   };

//   const content = [
//     { option: 'flight', icon: faPlaneUp },
//     { option: 'holidays', icon: faUmbrellaBeach },
//     { option: 'visa', icon: faEarthEurope },
//     { option: 'hotels', icon: faHotel },
//   ];

//   return (
//     <div className="dashboardBookingContent">
//       <ul className="menuItems custom-carousel">
//         {content.map((item) => (
//           <li
//             key={item.option}
//             className={`menuItem shadow-lg ${
//               section === item.option ? 'active' : ''
//             }`}
//             onClick={() => handleOptionClick(item.option)}
//           >
//             <FontAwesomeIcon
//               className="menuItem-icons"
//               icon={item.icon}
//             />
//             {item.option.toUpperCase()}
//           </li>
//         ))}
//       </ul>

//       <div className="carousel-container">
//         <div
//           className="carousel-content"
//           style={{
//             transform: `translateX(calc(-${
//               content.findIndex((item) => item.option === section) * 100
//             }%))`,
//           }}
//         >
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;