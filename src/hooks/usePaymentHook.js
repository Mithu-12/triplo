// usePaymentOption.js

import { useState } from 'react';

export const usePaymentOption = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentOptionChange = (option) => {
    setSelectedPayment(option);
  };

  return {
    selectedPayment,
    handlePaymentOptionChange,
  };
};
export default usePaymentOption