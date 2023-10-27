import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loader.css'

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    </div>
  );
};

export default Loader;
