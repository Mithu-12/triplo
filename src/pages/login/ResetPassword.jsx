import React, {  useState } from 'react';

import './Login.css';
import { useNavigate, useParams } from 'react-router-dom';

import InputField from '../../components/inputField/inputField';
import useForm from '../../hooks/useForm';
import LoaderSpiner from '../../components/Loader/LoaderSpiner';
import axios from 'axios'
const ResetPassword = () => {
const {id, token} = useParams();
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
  const navigate = useNavigate();


  const initialState = {
   password: ''
  }
  const validateForm = (values)=>{
    const errors = {}
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

    if(!values.password){
      errors.password = 'Password is required'
    }else if (values.password.length < 6) {
      errors.password = 'Password must have at least 6 characters';
    } else if(!passwordRegex.test(values.password)){
      errors.password = 'one lowercase & one uppercase, one digit and  special character'
    }
    return errors;
  }
  
    const {formState, handleBlur, handleChange, handleFocus, handleSubmit} = useForm({
      init: initialState,
      validate: validateForm
    })
  
 


  const handleLoginSubmit = async ({hasError, errors, values}) => {
    try {
      setLoading(true)
      if(!hasError){
        const password = values.password
        console.log('value', password)
        await axios.post(`https://triplo-flight.onrender.com/api/auth/reset-password/${id}/${token}`, {password: password})
        .then(res=>{
            if(res.data.status === "success"){
                navigate('/login')
            }
        })
      } 
    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
    } finally{
      setLoading(false)
    }
  };
  


  
  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="text-xl font-semibold py-5">
          Reset Password
        </h2>
        <form onSubmit={(e)=> handleSubmit(e, handleLoginSubmit)}>
          <div className="custom-login-input-container">
            
              <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formState.password.value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={formState.password.error}
            required
          />
          </div>
          {
            loading ? <LoaderSpiner/> : null
          }
          {error && (
            <span className="text-red-600 ">{error}</span>
          )}
          <div className="signup-button-container">
            <button className="signup-button" type="submit">
              Send
            </button>
          </div>
        </form>
        
        
       
        
      </div>
    </div>
  );
};

export default ResetPassword;