import React, { useState, useEffect } from 'react';

function CountdownClock({ sessionStartTime, sessionEndTime, onTimeUp }) {
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(sessionEndTime)
  );
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      const updatedRemainingTime = calculateRemainingTime(sessionEndTime);
      setRemainingTime(updatedRemainingTime);

      if (updatedRemainingTime <= 0) {
        clearInterval(id);
        if (typeof onTimeUp === 'function') {
          onTimeUp();
        }
      }
    }, 1000);

    setIntervalId(id);

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clean up the interval on unmount
      }
    };
  }, [sessionEndTime, onTimeUp]);

  return (
    <div className="w-full bg-white p-5 countdown-container">
      {remainingTime <= 0 ? (
        <p className="font-semibold text-center">The Session has Expired</p>
      ) : (
        <div>
          <p className="font-semibold text-center">
            Hurry up! Book now before it's too late!
          </p>
          <p className="text-center py-5">{formatTime(remainingTime)}</p>
        </div>
      )}
    </div>
  );
}

function calculateRemainingTime(sessionEndTime) {
  const targetEndTime = new Date(sessionEndTime);
  const currentTime = new Date();
  return Math.max(targetEndTime - currentTime, 0);
}

function formatTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return (
    <div className="flex items-center justify-center">
      <div>
        <p
          style={{ border: '2px solid #FFC610', borderRadius: '3px' }}
          className="px-4 py-2 bg-red-300 mx-2 text-3xl font-semibold"
        >
          {`${minutes}`}
        </p>
        <p>Min</p>
      </div>
      :
      <div>
        <p
          style={{ border: '2px solid #FFC610', borderRadius: '3px' }}
          className="px-4 py-2 bg-red-300 mx-2 text-3xl font-semibold"
        >
          {`${seconds < 10 ? '0' : ''}${seconds}`}
        </p>
        <p>Sec</p>
      </div>
    </div>
  );
}

export default CountdownClock;


