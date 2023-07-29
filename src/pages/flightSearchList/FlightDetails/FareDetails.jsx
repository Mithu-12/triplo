import React from 'react';
import useBDTConvert from '../../../hooks/useBDTConvert';

const FareDetails = ({ flight }) => {
  const adultsNum = flight?.travelerPricings?.filter((traveler) => traveler.travelerType === 'ADULT').length || 0;
  const childNum = flight?.travelerPricings?.filter((traveler) => traveler.travelerType === 'CHILD').length || 0;
  const infantsNum = flight?.travelerPricings?.filter((traveler) => traveler.travelerType === 'HELD_INFANT').length || 0;

  const adultPrice = parseFloat(
    flight.travelerPricings.find((pricing) => pricing.travelerType === 'ADULT')?.price?.total || '0'
  );
  const childPrice = parseFloat(
    flight.travelerPricings.find((pricing) => pricing.travelerType === 'CHILD')?.price?.total || '0'
  );
  const infantsPrice = parseFloat(
    flight.travelerPricings.find((pricing) => pricing.travelerType === 'HELD_INFANT')?.price?.total || '0'
  );

  const taxRate = 0.1; // Example tax rate (10%)
  const adultTax = adultPrice * taxRate;
  const childTax = childPrice * taxRate;
  const infantsTax = infantsPrice * taxRate;

  const adultSubTotal = adultPrice + adultTax;
  const childSubTotal = childPrice + childTax;
  const infantsSubTotal = infantsPrice + infantsTax;

  const totalBaseFare = adultSubTotal * adultsNum + childSubTotal * childNum + infantsSubTotal * infantsNum;

  const totalDiscount = 10400.85; // Example discount value
  const totalFare = totalBaseFare - totalDiscount;

  // Helper function to convert Euro to BDT
  // const useBDTConvert = useBDTConvert();

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ border: '1px solid gray' }}>
          <th style={{ border: '1px solid gray' }}>Fare Summary</th>
          <th style={{ border: '1px solid gray' }}>Base Fare</th>
          <th style={{ border: '1px solid gray' }}>Tax</th>
          <th style={{ border: '1px solid gray' }}>Quantity</th>
          <th style={{ border: '1px solid gray' }}>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ border: '1px solid gray' }}>
          <td style={{ border: '1px solid gray' }}>Adult</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(adultPrice)}</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(adultTax)}</td>
          <td style={{ border: '1px solid gray' }}>{adultsNum}</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(adultSubTotal)}</td>
        </tr>
        <tr style={{ border: '1px solid gray' }}>
          <td style={{ border: '1px solid gray' }}>Child</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(childPrice)}</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(childTax)}</td>
          <td style={{ border: '1px solid gray' }}>{childNum}</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(childSubTotal)}</td>
        </tr>
        <tr style={{ border: '1px solid gray' }}>
          <td style={{ border: '1px solid gray' }}>Infant</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(infantsPrice)}</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(infantsTax)}</td>
          <td style={{ border: '1px solid gray' }}>{infantsNum}</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(infantsSubTotal)}</td>
        </tr>
        <tr style={{ border: '1px solid gray' }}>
          <td style={{ border: '1px solid gray' }} colSpan="4">Total Base Fare ( {adultsNum + childNum + infantsNum} Passengers )</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(totalBaseFare)}</td>
        </tr>
        <tr style={{ border: '1px solid gray' }}>
          <td style={{ border: '1px solid gray' }}>Discount</td>
          <td style={{ border: '1px solid gray' }} colSpan="4">{useBDTConvert(totalDiscount)}</td>
        </tr>
        <tr style={{ border: '1px solid gray' }}>
          <td style={{ border: '1px solid gray' }} colSpan="4">Total Fare</td>
          <td style={{ border: '1px solid gray' }}>{useBDTConvert(totalFare)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default FareDetails;

