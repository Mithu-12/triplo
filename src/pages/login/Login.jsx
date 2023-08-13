import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useLoginMutation,
} from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/authSlice';
import useLoginSuccess from '../../hooks/useLoginSuccess';

const Login = ({onSuccessfulLogin}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { isLoading, isError, error }] = useLoginMutation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const from = location.state?.from?.pathname || '/';


  // const handleSuccessfulLogin = async (data) => {
  //   try {
  //     localStorage.setItem('access_token', data.access_token);
  //     dispatch(setUser({...data.user, access_token: data.access_token}))
  //     console.log('Login Successful!', data);
  //     onSuccessfulLogin(data)
  //     navigate(from, { replace: true }); 
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        identifier: identifier,
        password: password,
      });
      localStorage.setItem('access_token', data.access_token);
      dispatch(setUser({...data.user, access_token: data.access_token}))
      console.log('Login Successful!', data);

      navigate(from, {replace: true}); 
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleGoogleLogin = () => {
    window.open( 'http://localhost:8800/api/auth/google', '_self');

  };




  const handleFacebookLogin = () => {
    window.open = 'http://localhost:8800/api/auth/facebook', '_self';
  };

  
  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="text-xl font-semibold py-5">
          Ready for your next trip?
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="custom-login-input-container">
            <label>UserName or Email</label>
            <input
              type="text"
              name="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="UserName Or Email"
              className="custom-input"
              required
            />
          </div>

          <div className="custom-login-input-container">
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
          {isError && (
            <span className="text-red-600 ">{error.data.message}</span>
          )}
          <div className="signup-button-container">
            <button className="signup-button" type="submit">
              Login
            </button>
          </div>
        </form>
        {/* {isError && <span>{error}</span>} */}
        <div
          className=" m-auto w-full google-login "
          onClick={handleGoogleLogin}
        >
          <img
            className="w-6 mr-4"
            src="https://i.ibb.co/qjPpT1m/images.png"
            alt=""
          />
          <button>Login with Google</button>
        </div>
        <div
          className="mt-4 w-full facebook-login "
          onClick={handleFacebookLogin}
        >
          <img
            className="w-6 mr-4"
            src="https://i.ibb.co/VQwXnCd/download.jpg"
            alt=""
          />
          <button>Login with Facebook</button>
        </div>
        <div className="login-or">
          <p>OR</p>
        </div>
        <Link to="/register" className="mt-4 w-full facebook-login ">
          <button>Sign Up </button>
          <FontAwesomeIcon
            className="w-6 ml-3"
            icon={faChevronRight}
            beatFade
          />
        </Link>
      </div>
    </div>
  );
};

export default Login;
