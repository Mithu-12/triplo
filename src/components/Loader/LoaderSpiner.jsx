import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './LoaderSpiner.css'

const LoaderSpiner = () => {
  // const loaderSvg = '/loader-svg.svg'
  return (
    <div className="loader-overlay">
      <div className="loaderSpiner">
        <FontAwesomeIcon icon={faSpinner} spin />
        {/* <img src={loaderSvg} alt="Loader SVG" /> */}
      </div>
    </div>
  );
};

export default LoaderSpiner;
