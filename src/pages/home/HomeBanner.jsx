
import React from 'react';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import Flight from '../../components/flight/Flight';
import Holidays from '../../components/holidays/Holidays';
import Visa from '../../components/visa/Visa';
import Hotels from '../../components/hotels/Hotels';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './HeroBanner.css';
import {
  faPlaneUp,
  faUmbrellaBeach,
  faEarthEurope,
  faHotel,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomeBanner = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedOption = searchParams.get('search');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    // Update the URL with the selected option
    navigate(`/?search=${option}`);
  };

  const content = [
    { option: 'flight', component: <Flight /> },
    { option: 'holiday', component: <Holidays /> },
    { option: 'visa', component: <Visa /> },
    { option: 'hotels', component: <Hotels /> },
  ];

  return (
    <div>
      <div className="heroBanner mb-6">
        <div>
          <img
            className="backdrop-img"
            src="/bg.jpg"
            alt="Background"
          />
        </div>
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <ul className="menuItems custom-carousel ">
              <li
                className={`menuItem shadow-lg ${
                  selectedOption === 'flight' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('flight')}
              >
                <FontAwesomeIcon className="menuItem-icons" icon={faPlaneUp} />
                FLIGHT
              </li>
              <li
                className={`menuItem borderItem ${
                  selectedOption === 'holiday' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('holiday')}
              >
                <FontAwesomeIcon
                  className="menuItem-icons"
                  icon={faUmbrellaBeach}
                />
                HOLIDAYS
              </li>
              <li
                className={`menuItem borderItem ${
                  selectedOption === 'visa' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('visa')}
              >
                <FontAwesomeIcon
                  className="menuItem-icons"
                  icon={faEarthEurope}
                />
                VISA
              </li>
              <li
                className={`menuItem borderItem ${
                  selectedOption === 'hotels' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('hotels')}
              >
                <FontAwesomeIcon className="menuItem-icons" icon={faHotel} />
                HOTEL
              </li>
            </ul>           
            <div className="carousel-container">
              <div
                className="carousel-content"
                style={{
                  transform: `translateX(calc(-${
                    content.findIndex((item) => item.option === selectedOption) *
                    100
                  }%))`,
                }}
              >
                {content.map((item, index) => (
                  <div key={index} className={`slide slide-${item.option}`}>
                    {item.component}
                  </div>
                ))}{' '}
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default HomeBanner;
