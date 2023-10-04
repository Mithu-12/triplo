import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './inputField.css'
const InputField = ({ label, type, name, value, onChange, onBlur, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        <input
          type={showPassword ? 'text' : type}
          id={name}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className='input-box'
          
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-button"
          >
            <FontAwesomeIcon icon={showPassword ?  faEyeSlash : faEye} />
          </button>
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputField;
