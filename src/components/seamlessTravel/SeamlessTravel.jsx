import React from 'react';
import './SeamlessTravel.css';
import ContentWrapper from '../wrapperComponent/ContentWrapper';

const SeamlessTravel = () => {
  return (
    <div>
      <ContentWrapper>
        <h1 className="text-3xl font-semibold  explore-container">
          Explore unique <span> places to stay</span>
        </h1>
      </ContentWrapper>
      <div className="seamless-bgImg flex items-center justify-around">
        <div className='text-white '>
        <h3 className='text-4xl font-semibold pb-4'>Seamless travel made easy</h3>
        <p className='w-96'>
          Book and manage flights on the go. Jet off on app-exclusive fares.
          Enjoy unlimited access to digital content. Travel seamlessly with the
          flightexpert.
        </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SeamlessTravel;
