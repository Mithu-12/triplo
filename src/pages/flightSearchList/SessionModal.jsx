import React, { useEffect } from 'react';
import './SessionModal.css';
import { useNavigate } from 'react-router-dom';

const SessionModal = ({ show }) => {
  const navigate = useNavigate()
  const failureImg = '../../../public/failure.gif'
  const handleClick = ()=>{
    navigate('/')
  }
  useEffect(() => {
    if (show) {
      // Disable scrolling when the modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when the modal is closed
      document.body.style.overflow = 'visible';
    }

    return () => {
      // Make sure to restore scrolling when the component unmounts
      document.body.style.overflow = 'visible';
    };
  }, [show]);

  return (
    <div>
      {show && (
        <div className="modal-background">
          <div className="modal-container">
          <div className='flex justify-center items-center'>
            <img src={failureImg} alt="" />
          </div>
            <h2 className='text-2xl font-bold'>Session Expired</h2>
            <p className='py-5 font-semibold'>Your session has expired. Please search again.</p>
            <button onClick={handleClick} className="modal-button">Search Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionModal;
