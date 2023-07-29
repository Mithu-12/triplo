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
  const adultsWeight = numAdults * flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight;
  const childrenWeight = numChildren
    ? numChildren * flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight
    : null;
  const infantsWeight = numInfants
    ? numInfants * flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight
    : null;

  // Calculate the total number of rows needed in the table
  const numRows = Math.max(numAdults, numChildren, numInfants);

  return (
    <table className='table-container'>
      <thead className='border'>
        <tr>
          <th>Category</th>
          <th>Total Weight (KG)</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(numRows).keys()].map((index) => (
          <tr key={index}>
            <td>{index === 0 ? 'Adults' : ''}</td>
            <td>{index === 0 ? adultsWeight : ''}</td>
          </tr>
        ))}
        {numChildren > 0 && (
          <tr>
            <td>Children</td>
            <td>{childrenWeight}</td>
          </tr>
        )}
        {numInfants > 0 && (
          <tr>
            <td>Infants</td>
            <td>{infantsWeight}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default WeightDetails;
