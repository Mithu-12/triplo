import React from 'react';
import HomeBanner from './HomeBanner';
import Package from '../../components/package/Package';
import BestDeal from '../../components/bestDeal/BestDeal';
import SeamlessTravel from '../../components/seamlessTravel/SeamlessTravel';

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <Package />
      <BestDeal/>
      <SeamlessTravel/>
    </div>
  );
};

export default Home;
