// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { Link, useLocation, useNavigate,  } from 'react-router-dom';
// import { setActiveOption } from '../../slices/navbarSlice';
// import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
// import logo from '../../assets/react.svg'

// import './Navbar.css'

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selectedOption, setSelectedOption] = useState('flight');
//   const handleOptionClick = (option) => {
//     if (location.pathname !== '/') {
//       navigate('/');
//     }
//     setSelectedOption(option);
//     dispatch(setActiveOption(option));
//   };

//   const [show, setShow] = useState('top');
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   },[location])

//   const controlNavbar = () => {
//     if (window.scrollY > 200) {
//       if (window.scrollY > lastScrollY) {
//         setShow('hide');
//       } else {
//         setShow('show');
//       }
//     } else {
//       setShow('top');
//     }
//     setLastScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', controlNavbar);
//     return () => {
//       window.removeEventListener('scroll', controlNavbar);
//     };
//   }, [lastScrollY]);
//   return (
//     <header>
//         <ContentWrapper>
//         <div className="logo" onClick={(()=>navigate('/'))}>
//           <img src={logo} alt="MovieNexus" />
//         </div>
//         <ul className="menuItems">
//           <li
//             className={selectedOption === 'flight' ? 'active' : ''}
//             onClick={() => handleOptionClick('flight')}
//           >
//             <Link to="/">Flight</Link>
//           </li>
//           <li
//             className={selectedOption === 'holiday' ? 'active' : ''}
//             onClick={() => handleOptionClick('holiday')}
//           >
//             <Link to="/">Holiday</Link>
//           </li>
//           <li
//             className={selectedOption === 'visa' ? 'active' : ''}
//             onClick={() => handleOptionClick('visa')}
//           >
//             <Link to="/">Visa</Link>
//           </li>
//           <li
//             className={selectedOption === 'hotels' ? 'active' : ''}
//             onClick={() => handleOptionClick('hotels')}
//           >
//             <Link to="/">Hotels</Link>
//           </li>
//         </ul>

//       <div>Right Logo | Sign-in</div>
//     </ContentWrapper>
//     </header>
//   )
// }

// export default Navbar
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setActiveOption } from '../../slices/navbarSlice';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import logo from '../../assets/react.svg';

import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('flight');
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

  return (
    <header className={`header ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="MovieNexus" />
        </div>
        <ul className="menuItems">
          <li
            className={`menuItem ${
              selectedOption === 'flight' ? 'active' : ''
            }`}
            onClick={() => handleOptionClick('flight')}
          >
            <Link to="/">Flight</Link>
          </li>
          <li
            className={`menuItem ${
              selectedOption === 'holiday' ? 'active' : ''
            }`}
            onClick={() => handleOptionClick('holiday')}
          >
            <Link to="/">Holiday</Link>
          </li>
          <li
            className={`menuItem ${selectedOption === 'visa' ? 'active' : ''}`}
            onClick={() => handleOptionClick('visa')}
          >
            <Link to="/">Visa</Link>
          </li>
          <li
            className={`menuItem ${
              selectedOption === 'hotels' ? 'active' : ''
            }`}
            onClick={() => handleOptionClick('hotels')}
          >
            <Link to="/">Hotels</Link>
          </li>
        </ul>

        <div>Right Logo | Sign-in</div>
      </ContentWrapper>
    </header>
  );
};

export default Navbar;
