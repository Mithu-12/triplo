import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import SessionModal from './SessionModal';
import CountdownClock from './CountdownTimer';

const FlightReview = () => {
  const location = useLocation();
  const { sessionStartTime, sessionEndTime, flightData } = location.state || {};
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log('sessionStartTime', sessionStartTime);
  console.log('flightData', flightData);

  function onTimeUp() {
    setIsModalVisible(true);
  }

  console.log('first', isModalVisible);
  return (
    <div className="p-8 shadow-sm">
      <CountdownClock
        sessionStartTime={sessionStartTime}
        sessionEndTime={sessionEndTime}
        onTimeUp={onTimeUp}
      />
      {/* {isModalVisible && <SessionModal show={isModalVisible} />} */}
    </div>
  );
};

export default FlightReview;
