import { useMemo } from 'react';
import useBDTConvert from './useBDTConvert'; // Import your useBDTConvert function

const useFlightPrice = (flight) => {
  const adultsNum =
    flight?.travelerPricings?.filter(
      (traveler) => traveler.travelerType === 'ADULT'
    ).length || 0;

  const childNum =
    flight?.travelerPricings?.filter(
      (traveler) => traveler.travelerType === 'CHILD'
    ).length || 0;

  const infantsNum =
    flight?.travelerPricings?.filter(
      (traveler) => traveler.travelerType === 'HELD_INFANT'
    ).length || 0;

  const totalPassenger = adultsNum + childNum + infantsNum;

  const adultPrice = useBDTConvert(
    parseFloat(
      flight.travelerPricings.find(
        (pricing) => pricing.travelerType === 'ADULT'
      )?.price?.total || '0'
    )
  );

  const childPrice = useBDTConvert(
    parseFloat(
      flight.travelerPricings.find(
        (pricing) => pricing.travelerType === 'CHILD'
      )?.price?.total || '0'
    )
  );

  const infantsPrice = useBDTConvert(
    parseFloat(
      flight.travelerPricings.find(
        (pricing) => pricing.travelerType === 'HELD_INFANT'
      )?.price?.total || '0'
    )
  );

  const initialTotalPrice = Math.floor(adultPrice * adultsNum + childPrice * childNum + infantsPrice * infantsNum)

  const taxRate = 0.1; 
  const adultTax = Math.floor(adultPrice * taxRate);
  const childTax = Math.floor(childPrice * taxRate);
  const infantsTax = Math.floor(infantsPrice * taxRate);

  const totalTax= (adultTax * adultsNum + childTax * childNum + infantsTax * infantsNum)

  const adultSubTotal = Math.floor(adultPrice + adultTax);
  const childSubTotal = Math.floor(childPrice + childTax);
  const infantsSubTotal = Math.floor(infantsPrice + infantsTax);

  
  const totalBaseFare = Math.floor(
    adultSubTotal * adultsNum +
      childSubTotal * childNum +
      infantsSubTotal * infantsNum
  );
  const totalDiscount = Math.floor(totalBaseFare * 0.1);
  const totalFare = Math.floor(totalBaseFare - totalDiscount);

  return useMemo(
    () => ({
      initialTotalPrice,
      totalBaseFare,
      totalDiscount,
      totalPassenger,
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
      infantsTax,
      totalTax,
    }),
    [flight]
  );
};

export default useFlightPrice;
