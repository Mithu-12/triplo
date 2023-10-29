import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './PasswordChange.css';
import InputField from '../../components/inputField/inputField';
import LoaderSpiner from '../../components/Loader/LoaderSpiner';

const PasswordChange = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const [showResponse, setShowResponse] = useState('')
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const initState = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const validateForm = (values) => {
    const errors = {}; // Initialize an empty errors object
  
    if (!values.currentPassword) {
      errors.currentPassword = 'Current Password is required';
    }
    if (!values.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (values.newPassword.length < 5) {
      errors.newPassword = 'New password must be 5 characters or more';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors; 
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
    const token = localStorage.getItem('access_token');
    setLoading(true)
    try {
      if (!hasError) {
        const response = await axios.post(
          `https://triplo-flight.onrender.com/api/auth/change-password`,
          {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            userId: userId,
           
          },
          {
            headers:{
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          },
        );
        reset()
        setServerError('')
        setShowResponse(response.data)
      }
    } catch (error) {
      console.log(error)
      setServerError(error.response.data.message);
      setShowResponse('')
    } finally{
      setLoading(false)
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
            onFocus={handleFocus}
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
            onFocus={handleFocus}
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={formState.confirmPassword.error}
          />
            <p className='text-green-500'>{showResponse?? ''}</p>
            <p className='text-red-500'>{serverError?? ''}</p>
            {loading ? <LoaderSpiner/> : null}
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
