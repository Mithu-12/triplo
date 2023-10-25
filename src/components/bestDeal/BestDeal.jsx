import React from 'react';
import ContentWrapper from '../wrapperComponent/ContentWrapper';
import './BestDeal.css';
const BestDeal = () => {
  const loveHand = '/hand-love.png';
  return (
    <ContentWrapper>
      <div className="bestDeal-container flex justify-around items-center">
        <div className='relative text-white'>
            <p className=' font-semibold text-md'>Offering</p>
            <h1 className='text-6xl font-bold py-5'>BEST DEALS</h1>
            <p className='absolute right-0  font-semibold'>On Flight Booking</p>
        </div>

        <img className='loveHandImg' src={loveHand} alt="Love Hand For best deal" />
      </div>
    </ContentWrapper>
  );
};

export default BestDeal;
