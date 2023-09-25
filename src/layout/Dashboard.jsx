import React from 'react';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';
import { Link, Outlet } from 'react-router-dom';
import ContentWrapper from '../components/wrapperComponent/ContentWrapper';
import {
  faCircleUser,
  faListCheck,
  faLock,
  faUserGroup,
  faGift,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <ContentWrapper>
        <div className="flex justify-between pt-20">
          <div className="basis-4/12 ">
            <ul className="flex flex-col gap-3 bg-white shadow p-8 dashboard-list-item">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faCircleUser} />
                <Link to="/app/account/profile" className="ml-8">
                  Profile
                </Link>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faUserGroup} />
                <Link to="/app/account/profile" className="ml-8">
                  Regular Traveler
                </Link>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faListCheck} />
                <Link to="/app/account/bookings" className="ml-8">
                  Bookings
                </Link>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faGift} />
                <Link to="/app/account/bookings" className="ml-8">
                  Refer & Earn
                </Link>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faLock} />
                <Link to="/app/account/change-password" className="ml-8">
                  Change Password
                </Link>
              </li>
            </ul>
          </div>

          <Outlet />
        </div>
      </ContentWrapper>
      <Footer />
    </div>
  );
};

export default Dashboard;
