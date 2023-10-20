// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import './FlightAccordion.css'; // Import the CSS file for styling
// import FlightCarousel from '../FlightCarosel';

// const FlightAccordion = ({ flight, isOpen, toggleAccordion }) => {
//   return (
//     <div className={`flight-accordion ${isOpen ? 'open' : ''}`}>
//       {/* Flight summary to toggle the accordion */}
//       <div className="accordion-header" onClick={toggleAccordion}>
//         <h3>Refundable</h3>
//         <div className="flex items-center">
//           <h3 className="pr-3">{`${
//             isOpen ? 'Hide Details' : 'Show Details'
//           }`}</h3>
//           <FontAwesomeIcon
//             icon={faChevronDown}
//             className={`icon ${isOpen ? 'open' : ''}`}
//           />
//         </div>
//       </div>

//       {/* Show detailed flight information when the accordion is open */}
//      <div className='accordion-open-content'>
//      {isOpen && (
//         <div className="accordion-content">
//           <FlightCarousel flight={flight} />
//           {/* Add more flight details here */}
//         </div>
//       )}
//      </div>
//     </div>
//   );
// };

// export default FlightAccordion;



import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './FlightAccordion.css'; // Import the CSS file for styling
import FlightCarousel from '../FlightCarosel';

const FlightAccordion = ({ flight, isOpen, toggleAccordion }) => {
  return (
    <div className={`flight-accordion ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>Refundable</h3>
        <div className="flex items-center">
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

export default FlightAccordion;



