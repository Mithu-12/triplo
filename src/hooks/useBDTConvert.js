import React from 'react'
const exchangeRate = 80;
const useBDTConvert = (euroAmount) => {
  const bdtAmount = Math.floor(euroAmount * exchangeRate);

  return bdtAmount;
}

export default useBDTConvert;
