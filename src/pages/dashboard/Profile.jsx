import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css';
import axios from 'axios';
import { setUser } from '../../slices/authSlice';
// import jwt from 'jsonwebtoken';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const [updateUser, setUpdateUser] = useState({
    name: user?.name || '',
    gender: user?.gender || '',
    phone: user?.phone || ''
  });
  const token = localStorage.getItem('access_token');
  const dispatch = useDispatch()
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];
  const handleUserChange = (field, value) => {
    setUpdateUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an API request to update the user data
    axios
      .put(`http://localhost:8800/api/users/${userId}`, updateUser, {
        headers,
        withCredentials: true,
      })
      .then((response) => {
        console.log('User data updated:', response.data);
        const updatedUser = {
          ...user,
          ...updateUser,
        };
        dispatch(setUser(updatedUser))
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        // Handle errors here
      });
  };
 



  console.log(user);
  console.log(token);
  return (
    <div className="w-full shadow-lg bg-white ml-10 p-9">
      <div className="flex gap-4">
        <div className="profile-image-content">
          {user.picture ? (
            <img
              className="profile-image-content"
              src={user.picture}
              alt="User"
            />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>
        <div>
          <p className="text-2xl">{user?.name}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="py-5">
        <form onSubmit={handleSubmit}>
          <p>Full Name</p>
          <input
            className="profile-input-width"
            type="text"
            placeholder="Full Name"
            value={updateUser?.name || ''}
            onChange={(e) => handleUserChange('name', e.target.value)}
            required
          />
          <div className="py-5">
            <p>Gender</p>
            <select
              className="profile-input-width"
              value={updateUser?.gender || ''}
              onChange={(e) => handleUserChange('gender', e.target.value)}
              required
            >
              <option value="">Select Gender</option>{' '}
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <p>Mobile Number</p>
          <input
            className="profile-input-width"
            type="number"
            placeholder="Mobile Number"
            value={updateUser?.phone || ''}
            onChange={(e) => handleUserChange('phone', e.target.value)}
            required
          />
          <button className="w-full py-3 mt-5 profile-submit" type="submit">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;