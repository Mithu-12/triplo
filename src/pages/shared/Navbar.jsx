import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setActiveOption } from '../../slices/navbarSlice';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import logo from '../../../public/logo.png';
import {
  faUser,
  faPlaneUp,
  faUmbrellaBeach,
  faEarthEurope,
  faHotel,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import LogoutButton from '../../components/Logout/Logout';
import useOutsideClick from '../../hooks/useOutsideClick';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const [selectedOption, setSelectedOption] = useState('flight');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleOptionClick = (option) => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    setSelectedOption(option);
    dispatch(setActiveOption(option));
  };

  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow('hide');
      } else {
        setShow('show');
      }
    } else {
      setShow('top');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);


  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });
  const isHomePage = location.pathname === '/';


  return (
    <header className={`header ${show} `}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="Triplo" />
        </div>
        <ul className={`menuItems ${isHomePage ? 'homeNavbar-color' : ''}`}>
          <li
            className={`menuItem ${
              selectedOption === 'flight' ? 'active' : ''
            } `}
            onClick={() => handleOptionClick('flight')}
          >
            <div className="flex flex-col">
              <FontAwesomeIcon icon={faPlaneUp} />
              <Link to="/">FLIGHT</Link>
            </div>
          </li>
          <li
            className={`menuItem ${
              selectedOption === 'holiday' ? 'active' : ''
            }`}
            onClick={() => handleOptionClick('holiday')}
          >
            <div className="flex flex-col">
              <FontAwesomeIcon icon={faUmbrellaBeach} />
              <Link to="/">HOLIDAYS</Link>
            </div>
          </li>
          <li
            className={`menuItem ${selectedOption === 'visa' ? 'active' : ''}`}
            onClick={() => handleOptionClick('visa')}
          >
            <div className="flex flex-col">
              <FontAwesomeIcon icon={faEarthEurope} />
              <Link to="/">VISA</Link>
            </div>
          </li>
          <li
            className={`menuItem ${
              selectedOption === 'hotels' ? 'active' : ''
            }`}
            onClick={() => handleOptionClick('hotels')}
          >
            <div className="flex flex-col">
              <FontAwesomeIcon icon={faHotel} />
              <Link to="/">HOTEL</Link>
            </div>
          </li>
        </ul>

        <div className={`${isHomePage ? 'homeNavbar-color' : ''}`}>
          {user ? (
            <div className="navbar-user-dropdown">
              <div
                className="navbar-image-container"
                ref={dropdownRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user.picture ? (
                  <img
                    className="navbar-image-content"
                    src={user.picture}
                    alt="User"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
              {isDropdownOpen && (
                <div className="navbar-dropdown-menu">
                  <Link to="/app/account/bookings" className="navbar-dropdown-item">
                    My Booking
                  </Link>
                  <Link to="/app/account/profile" className="navbar-dropdown-item">
                    Profile
                  </Link>
                 
                  <button className="navbar-dropdown-item">
                    <LogoutButton />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="navbar-login-link" to="/login">
              <FontAwesomeIcon icon={faUser} /> SIGN IN
            </Link>
          )}
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Navbar;
