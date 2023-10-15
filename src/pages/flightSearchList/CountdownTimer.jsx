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
    <div className="w-full bg-white p-5">
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

// import React, { useState, useEffect } from 'react';

// function CountdownClock({ sessionStartTime, sessionEndTime, onTimeUp }) {
//   const [remainingTime, setRemainingTime] = useState(
//     calculateRemainingTime(sessionStartTime)
//   );
//   const [intervalId, setIntervalId] = useState(null);

//   useEffect(() => {
//     // Start the countdown timer
//     const id = setInterval(() => {
//       const updatedRemainingTime = calculateRemainingTime(sessionStartTime);
//       setRemainingTime(updatedRemainingTime);

//       if (updatedRemainingTime <= 0) {
//         clearInterval(id); // Clear the interval when the time's up
//         if (typeof onTimeUp === 'function') {
//           onTimeUp();
//         }
//       }
//     }, 1000);

//     setIntervalId(id);

//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId); // Clean up the interval on unmount
//       }
//     };
//   }, [sessionStartTime, onTimeUp]);

//   return (
//     <div className='w-full bg-white p-5'>
//       {remainingTime <= 0 ? (
//         <p className='font-semibold text-center'>The Session is Expire</p>
//       ) : (
//         <div>
//           <p className='font-semibold text-center'>Hurry up! Book now before its too late!</p>
//           <p className='text-3xl font-semibold text-center py-5'>{formatTime(remainingTime)}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// function calculateRemainingTime(sessionStartTime) {
//   const targetEndTime = new Date(sessionStartTime);
//   targetEndTime.setMinutes(targetEndTime.getMinutes() + 11); // 20 minutes in the future
//   const currentTime = new Date();
//   return Math.max(targetEndTime - currentTime, 0);
// }

// function formatTime(milliseconds) {
//   const minutes = Math.floor(milliseconds / 60000);
//   const seconds = Math.floor((milliseconds % 60000) / 1000);
//   return (
//     <div className='flex items-center justify-center'>
//     <div style={{border: '2px solid #FFC610', borderRadius: '3px' }} className='px-4 py-2 bg-red-300 mx-2'>{`${minutes}`}</div> :
//       <div style={{border: '2px solid #FFC610', borderRadius: '3px' }} className='px-4 py-2 bg-red-300 mx-2'>{`${seconds < 10 ? '0' : ''}${seconds}`}</div>
//     </div>
//     )

// }

// export default CountdownClock;
