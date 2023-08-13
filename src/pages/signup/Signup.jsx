import React, { useState } from 'react';
import axios from 'axios';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/authSlice';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [error, setError] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       'http://localhost:8800/api/auth/register',
  //       {
  //         userName: userName,
  //         email: email,
  //         password: password,
  //       }
  //     );
  //     console.log('Registration Successful!', response.data);
  //     console.log('access_token', response?.data?.access_token);
      
  //   } catch (error) {
  //     setError(error.response?.data?.message || 'Something went wrong');
  //   }
  // };

  const [registerUser, { isLoading, isError, error }, ] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        userName: userName,
        email: email,
        password: password,
      });
      const token = data?.access_token;
      localStorage.setItem('access_token', token);
      dispatch(setUser({...data.user, access_token: token}))
      console.log('User1:', data);
      navigate('/');
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.log(error)
      // setError(error?.data?.message || 'Something went wrong');
    }
  };
  const handleGoogleSignup = () => {
    window.open( 'http://localhost:8800/api/auth/google', '_self')
    
  };
  const handleFacebookSignup =  () => {
    window.location.href = 'http://localhost:8800/api/auth/facebook';
   
  };
  return (
    <div className="signup-container">
      <div className="signup-content">
      <Link to='/login' className=' w-8 cursor-pointer text-center rounded-full'>
      <FontAwesomeIcon size='xl' icon={faArrowLeft} />
      </Link>
        <h2 className="text-xl font-semibold py-2">
          Sign up to unlock the best of Tryotel
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="custom-input-container">
          <label>Username</label>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="custom-input"
              placeholder="Username"
            />
          </div>
          <div className="custom-input-container py-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input"
              required
            />
          </div>
          <div className="custom-input-container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="custom-input"
              required
            />
          </div>
        {isError && <span className='text-red-600 '>{error.data.message}</span>}
          <div className="signup-button-container">
          <button className='signup-button' type="submit">Sign Up</button>
          </div>
        </form>
        <div className='signup-or'>
          <p>OR</p>
        </div>
        <div className=' m-auto w-full google-signup ' onClick={handleGoogleSignup}>
        <img className='w-6 mr-4' src="https://i.ibb.co/qjPpT1m/images.png" alt="" />
        <button>Signup with Google</button>
        </div>
        <div className='mt-4 w-full facebook-signup ' onClick={handleFacebookSignup}>
        <img className='w-6 mr-4' src="https://i.ibb.co/VQwXnCd/download.jpg" alt="" />
        <button>Signup with Facebook</button>
        </div>
        <div className='my-3'>
          <p>Already have an account? <Link className='text-blue-800 font-bold' to='/login'>Login!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
