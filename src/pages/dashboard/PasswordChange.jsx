import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './PasswordChange.css';
import InputField from '../../components/inputField/inputField';

const PasswordChange = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const initState = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const validateForm = (values) => {
    const error = {};
    if (!values.currentPassword) {
      error.currentPassword = 'Current Password is require';
    }
    if (!values.newPassword) {
      error.newPassword = 'New password is require';
    } else if (values.newPassword.length < 5) {
      error.newPassword = 'New password must be 5 character or more';
    }
    if (!values.confirmPassword) {
      error.confirmPassword = 'Confirm Password is require';
    } else if (values.confirmPassword !== values.newPassword) {
      error.confirmPassword = 'Password do not match';
    }
  };

  const {
    formState,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    reset,
  } = useForm({
    init: initState,
    validate: validateForm,
  });

  const handlePasswordChange = async ({ hasError, errors, values }) => {
    try {
      if (!hasError) {
        const response = await axios.post(
          'http://localhost:8800/api/auth/change-password',
          {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            userId: userId,
          }
        );
      }
    } catch (error) {
      console.log('password-change', error);
    }
  };

  return (
    <div className="w-full bg-white shadow-sm ml-9 passwordChangeForm-group">
      <div className="passwordChangeForm-field">
        <form onSubmit={(e) => handleSubmit(e, handlePasswordChange)}>
          <InputField
            label="Current Password"
            type="password"
            name="currentPassword"
            placeholder="Enter Your Current Password"
            value={formState.currentPassword.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formState.currentPassword.error}
          />
          <InputField
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="Enter Your New Password"
            value={formState.newPassword.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formState.newPassword.error}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Enter Your Confirm Password"
            value={formState.confirmPassword.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formState.confirmPassword.error}
          />

          <button
            className="py-3 mt-5 passwordChange-submit w-96"
            type="submit"
          >
            UPDATE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
