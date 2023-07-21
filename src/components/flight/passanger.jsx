import React, { useState } from 'react';

import './style.css';
import Modal from './Model';

const Passanger = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div>
    {/* Other Flight component code */}
    <button onClick={handleOpenModal}>Open Modal</button>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
  </div>
  );
};

export default Passanger;
