import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      // Call the /logout route to log the user out of the authentication session
      const response = await fetch('https://triplo-flight.onrender.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        console.log('Logout successful');
        // Clear access_token from local storage
        localStorage.removeItem('access_token');
        sessionStorage.clear();

        dispatch(logout());

        window.location.reload();
        // navigate('/')
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
