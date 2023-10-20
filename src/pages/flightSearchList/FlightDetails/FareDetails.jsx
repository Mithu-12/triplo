import React from 'react';
import useBDTConvert from '../../../hooks/useBDTConvert';
import useFlightPrice from '../../../hooks/useFlightPrice';


const FareDetails = ({ flight }) => {
  const {totalBaseFare,
    totalDiscount,
    totalFare,
    adultsNum,
    childNum,
    infantsNum,
    adultPrice,
    childPrice,
    infantsPrice,
    adultSubTotal,
    childSubTotal,
    infantsSubTotal,
    adultTax,
    childTax,
    infantsTax } = useFlightPrice(flight);

  console.log('carousel flight', flight)

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%', backgroundColor: '#F9FAFF' }}>
      <thead>
    <tr style={{ border: '1px solid gray', height: '40px' }}>
      <th style={{ border: '1px solid gray', width: '20%',  }}>Fare Summary</th>
      <th style={{ border: '1px solid gray', width: '20%' }}>Base Fare</th>
      <th style={{ border: '1px solid gray', width: '20%' }}>Tax</th>
      <th style={{ border: '1px solid gray', width: '20%' }}>Quantity</th>
      <th style={{ border: '1px solid gray', width: '20%' }}>Sub Total</th>
    </tr>
  </thead>
      <tbody>
        <tr style={{ border: '1px solid gray',  height: '25px' }}>
          <td style={{ border: '1px solid gray' }}>Adult</td>
          <td style={{ border: '1px solid gray'  }}>BDT {adultPrice}</td>
          <td style={{ border: '1px solid gray' }}>BDT {adultTax}</td>
          <td style={{ border: '1px solid gray' }}> {adultsNum}</td>
          <td style={{ border: '1px solid gray' }}>BDT {adultSubTotal}</td>
        </tr>
        <tr style={{ border: '1px solid gray', height: '25px' }}>
          <td style={{ border: '1px solid gray' }}>Child</td>
          <td style={{ border: '1px solid gray' }}>BDT {childPrice}</td>
          <td style={{ border: '1px solid gray' }}>BDT {childTax}</td>
          <td style={{ border: '1px solid gray' }}> {childNum}</td>
          <td style={{ border: '1px solid gray' }}>BDT {childSubTotal}</td>
        </tr>
        <tr style={{ border: '1px solid gray',  height: '25px' }}>
          <td style={{ border: '1px solid gray' }}>Infant</td>
          <td style={{ border: '1px solid gray' }}>BDT {infantsPrice}</td>
          <td style={{ border: '1px solid gray' }}>BDT {infantsTax}</td>
          <td style={{ border: '1px solid gray' }}> {infantsNum}</td>
          <td style={{ border: '1px solid gray' }}>BDT {infantsSubTotal}</td>
        </tr>
        <tr style={{ border: '1px solid gray',  height: '30px' }}>
          <td style={{ border: '1px solid gray' }} colSpan="4">Total Base Fare ( {adultsNum + childNum + infantsNum} Passengers )</td>
          <td style={{ border: '1px solid gray' }}>BDT {totalBaseFare}</td>
        </tr>
        <tr style={{ border: '1px solid gray',  height: '30px' }}>
          <td style={{ border: '1px solid gray' }} colSpan="4">Discount</td>
          <td style={{ border: '1px solid gray' }} >BDT {totalDiscount}</td>
        </tr>
        <tr style={{ border: '1px solid gray',  height: '30px' }}>
          <td style={{ border: '1px solid gray' }} colSpan="4">Total Fare</td>
          <td style={{ border: '1px solid gray' }}>BDT {totalFare}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default FareDetails;

