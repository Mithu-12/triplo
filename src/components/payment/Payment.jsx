import React from 'react';
import './Payment.css';

const bkash = '/bkash.png';
const nogod = '/nogod.png';
const nexus = '/nexus.jpg';
const sslCommerz = '/ssl.png';

const paymentOptions = [
  {
    value: 'bkash',
    label: 'Bkash',
    image: bkash,
  },
  {
    value: 'nogod',
    label: 'Nogod',
    image: nogod,
  },
  {
    value: 'nexus',
    label: 'Nexus',
    image: nexus,
  },
  {
    value: 'sslCommerz',
    label: 'sslCommerz',
    image: sslCommerz,
  },
];

const PaymentOption = ({ option, isSelected, onSelect }) => {
  const handleSelect = () => {
    onSelect(option.value);
  };

  return (
    <div
      className={`payment-option ${isSelected ? 'selected' : ''}`}
      onClick={handleSelect}
    >
      <img className="w-24 h-20" src={option.image} alt={option.label} />
      {/* <p>{option.label}</p> */}
    </div>
  );
};

const PaymentOptions = ({ selectedOption, onOptionSelect }) => {
  return (
    <div className="my-8 bg-white shadow-md">
      <div className="payment-contact-header">
        <p>Choose Payment Option</p>
      </div>
      <div className="payment-options flex gap-4  p-9">
        {paymentOptions.map((option) => (
          <PaymentOption
            key={option.value}
            option={option}
            isSelected={selectedOption === option.value}
            onSelect={onOptionSelect}
            
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
