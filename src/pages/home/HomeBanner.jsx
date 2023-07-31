import React from 'react';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import Flight from '../../components/flight/Flight';
import Holidays from '../../components/holidays/Holidays';
import Visa from '../../components/visa/Visa';
import Hotels from '../../components/hotels/Hotels';
import { useDispatch, useSelector } from 'react-redux';
import background from '../../assets/home.jpg';
import './HeroBanner.css';
import { setActiveOption } from '../../slices/navbarSlice';


const HomeBanner = () => {
  const dispatch = useDispatch();
  const activeOption = useSelector((state) => state.navbar.activeOption);

  const handleOptionClick = (option) => {
    dispatch(setActiveOption(option));
  };

  const content = [
    { option: 'flight', component: <Flight /> },
    { option: 'holiday', component: <Holidays /> },
    { option: 'visa', component: <Visa /> },
    { option: 'hotels', component: <Hotels /> },
  ];

  return (
    <div>
      <div className="heroBanner">
        <div className="backdrop-img">
          <img src={background} alt="Background" />
        </div>
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <ul className="menuItems custom-carousel ">
              <li
                className={`menuItem shadow-lg ${
                  activeOption === 'flight' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('flight')}
              >
                Flight
              </li>
              <li
                className={`menuItem ${
                  activeOption === 'holiday' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('holiday')}
              >
                Holidays
              </li>
              <li
                className={`menuItem ${
                  activeOption === 'visa' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('visa')}
              >
                Visa
              </li>
              <li
                className={`menuItem ${
                  activeOption === 'hotels' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('hotels')}
              >
                Hotels
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
        </ContentWrapper>
      </div>
    </div>
  );
};

export default HomeBanner;

