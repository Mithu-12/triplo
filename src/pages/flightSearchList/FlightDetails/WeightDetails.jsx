import React from 'react';

const WeightDetails = ({ flight }) => {
  // Extracting the number of adults, children, and infants from the flight data
  const numAdults = flight.travelerPricings.filter(
    (traveler) => traveler.travelerType === 'ADULT'
  ).length;
  const numChildren = flight.travelerPricings.filter(
    (traveler) => traveler.travelerType === 'CHILD'
  ).length;
  const numInfants = flight.travelerPricings.filter(
    (traveler) => traveler.travelerType === 'HELD_INFANT'
  ).length;

  // Calculate total weight for each category (assuming the weight is the same for all travelers)
  const adultsWeight = numAdults * (flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight ?? 0)
  const childrenWeight = numChildren
    ? numChildren * (flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight ?? 0)
    : 0;
  const infantsWeight = numInfants
    ? numInfants * (flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight ?? 0)
    : 0;

  // Calculate the total number of rows needed in the table
  const numRows = Math.max(numAdults, numChildren, numInfants);

  return (
    <table style={{ borderCollapse: 'collapse', width: '40%', backgroundColor: '#F9FAFF' }} className='table-container'>
      <thead>
        <tr style={{ border: '1px solid gray' }}>
          <th style={{ border: '1px solid gray' }}>Category</th>
          <th style={{ border: '1px solid gray' }}>Total Weight (KG)</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(numRows).keys()].map((index) => (
          <tr style={{ border: '1px solid gray' }} key={index}>
            <td style={{ border: '1px solid gray' }}>{index === 0 ? 'Adults' : ''}</td>
            <td style={{ border: '1px solid gray' }}>{index === 0  ? adultsWeight : ''}</td>
          </tr>
        ))}
        {numChildren > 0 && (
          <tr style={{ border: '1px solid gray' }}>
            <td style={{ border: '1px solid gray' }}>Children</td>
            <td style={{ border: '1px solid gray' }}>{childrenWeight}</td>
          </tr>
        )}
        {numInfants > 0 && (
          <tr style={{ border: '1px solid gray' }}>
            <td style={{ border: '1px solid gray' }}>Infants</td>
            <td style={{ border: '1px solid gray' }}>{infantsWeight}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default WeightDetails;
