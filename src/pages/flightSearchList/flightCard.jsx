import React from 'react';

const getCarrierName = (carrierCode, carriers) => {
    if (!carrierCode) {
      return ''; // Return an empty string if carrierCode is not available
    }
    return carriers[carrierCode] || '';
  };
  // Utility function to extract flight information
  const extractFlightData = (flight, itineraryIndex, airlineImages, carriers) => {
    const itineraries = flight.itineraries;
  if (!itineraries || itineraries.length === 0 || itineraryIndex >= itineraries.length) {
    return null; // Return null if no itineraries or invalid itineraryIndex
  }
    const itinerary = itineraries[itineraryIndex];
  
    const airlineCode = itinerary.segments[0]?.carrierCode;
    const airlineName = getCarrierName(airlineCode, carriers);
    const departureAirportCode = itinerary.segments[0]?.departure.iataCode;
    const arrivalAirportCode = itinerary.segments[0]?.arrival.iataCode;
    const departureDateTime = itinerary.segments[0]?.departure.at;
    const arrivalDateTime = itinerary.segments[0]?.arrival.at;
    const imageUrl = airlineImages[airlineCode];
    const duration = itinerary.segments[0]?.duration;
    const numberOfStops = itinerary.segments[0]?.numberOfStops;
    const durationRegex = /PT(\d+H)?(\d+M)/;
    const match = duration.match(durationRegex);
    let hours = 0;
    let minutes = 0;
  
    if (match) {
      if (match[1]) {
        hours = parseInt(match[1]);
      }
  
      if (match[2]) {
        minutes = parseInt(match[2]);
      }
    }
  
    const durationText = `${hours}h ${minutes}min`;
    const stopType = numberOfStops === 0 ? 'Nonstop' : `${numberOfStops} stop(s)`;
  
    return {
      airlineCode,
      airlineName,
      departureAirportCode,
      arrivalAirportCode,
      departureDateTime,
      arrivalDateTime,
      imageUrl,
      durationText,
      stopType,
    };
  };

const formatDateAndTime = (dateTime) => {
  const date = new Date(dateTime);

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const time = date.toLocaleString('en-US', timeOptions);

  const dateOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  const newDate = date.toLocaleString('en-US', dateOptions);

  return { time, newDate };
};

const FlightInfo = ({ flight, itineraryIndex, selectedFromAirport, selectedToAirport, airlineImages, carriers }) => {
  const flightData = extractFlightData(flight, itineraryIndex, airlineImages, carriers);


  if (!flightData) {
    
    return null;
  }
  const departure = formatDateAndTime(flightData.departureDateTime);
  const arrival = formatDateAndTime(flightData.arrivalDateTime);

  const arrow = '../../../public/arrow.png';

  return (
    <div>
      <div key={flightData.airlineCode} className="flex justify-between align-middle items-center">
        <div className="">
          {flightData.imageUrl && (
            <img className="w-14 h-13 m-auto" src={flightData.imageUrl} alt={flightData.airlineCode} />
          )}
          <p className="text-xs font-semibold">{flightData.airlineName}</p>
        </div>
        <div>
          <div className="flex">
            <p>{flightData.departureAirportCode}</p>
            {'  '}
            <p className="pl-2">{departure.time}</p>
          </div>
          <p>{selectedFromAirport.name.slice(0, 20)}...</p>
          <p>{departure.newDate}</p>
        </div>
        <div className="text-center">
          <p className="arrowText">{flightData.durationText}</p>
          <img className="arrow w-20" src={arrow} />
          <p className="arrowText">{flightData.stopType}</p>
        </div>
        <div>
          <div className="flex">
            <p>{flightData.arrivalAirportCode}</p>
            <p className="pl-2">{arrival.time}</p>
          </div>
          <p>{selectedToAirport.name.slice(0, 20)}...</p>
          <p>{arrival.newDate}</p>
        </div>
      </div>

     
    </div>
  );
};

export default FlightInfo;


























// const getCarrierName = (carrierCode, carriers) => {
//     return carriers[carrierCode] || '';
//   };

// const extractFlightData = (flight, airlineImages, carriers) => {
//     const airlineCode = flight.validatingAirlineCodes[0];
//     const airlineName = getCarrierName(flight.itineraries[0].segments[0].carrierCode, carriers);
//     const departureAirportCode = flight.itineraries[0].segments[0].departure.iataCode;
//     const arrivalAirportCode = flight.itineraries[0].segments[0].arrival.iataCode;
//     const departureDateTime = flight.itineraries[0].segments[0].departure.at;
//     const arrivalDateTime = flight.itineraries[0].segments[0].arrival.at;
//     const imageUrl = airlineImages[airlineCode];
//     const duration = flight.itineraries[0].segments[0].duration;
//     const numberOfStops = flight.itineraries[0].segments[0].numberOfStops;
//     const durationRegex = /PT(\d+H)?(\d+M)/;
//     const match = duration.match(durationRegex);
//     let hours = 0;
//     let minutes = 0;
  
//     if (match) {
//       if (match[1]) {
//         hours = parseInt(match[1]);
//       }
  
//       if (match[2]) {
//         minutes = parseInt(match[2]);
//       }
//     }
    
//     const durationText = `${hours}h ${minutes}min`;
//     const stopType = numberOfStops === 0 ? 'Nonstop' : `${numberOfStops} stop(s)`;
  
//     return {
//       airlineCode,
//       airlineName,
//       departureAirportCode,
//       arrivalAirportCode,
//       departureDateTime,
//       arrivalDateTime,
//       imageUrl,
//       durationText,
//       stopType,
//     };
//   };
  
//   const formatDateAndTime = (dateTime) => {
//     const date = new Date(dateTime);
  
//     const timeOptions = {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: false,
//     };
//     const time = date.toLocaleString('en-US', timeOptions);
  
//     const dateOptions = {
//       month: 'long',
//       day: 'numeric',
//       weekday: 'short',
//     };
//     const newDate = date.toLocaleString('en-US', dateOptions);
  
//     return { time, newDate };
//   };

//   const arrow = '../../../public/arrow.png'

//   const FlightInfo = ({ flight, selectedFromAirport, selectedToAirport, airlineImages, carriers }) => {
    
//     const {
//         airlineCode,
//         airlineName,
//         departureAirportCode,
//         arrivalAirportCode,
//         departureDateTime,
//         arrivalDateTime,
//         imageUrl,
//         durationText,
//         stopType,
//       } = extractFlightData(flight, airlineImages, carriers)

//       const departure = formatDateAndTime(departureDateTime);
//       const arrival = formatDateAndTime(arrivalDateTime);

//       return(
//         <div className="flex justify-between align-middle items-center">
//             <div className="">
//           {imageUrl && (
//             <img className="w-14 h-13 m-auto" src={imageUrl} alt={airlineCode} />
//           )}
//           <p className="text-xs font-semibold">{airlineName}</p>
//         </div>
//         <div>
//           <div className="flex">
//             <p>{departureAirportCode}</p>
//             {'  '}
//             <p className="pl-2">{departure.time}</p>
//           </div>
//           <p>{selectedFromAirport.name.slice(0, 20)}...</p>
//           <p>{departure.newDate}</p>
//         </div>
//         <div className="text-center">
//           <p className="arrowText">{durationText}</p>
//           <img className="arrow w-20" src={arrow} />
//           <p className="arrowText">{stopType}</p>
//         </div>
//         <div>
//           <div className="flex">
//             <p>{arrivalAirportCode}</p>
//             <p className="pl-2">{arrival.time}</p>
//           </div>
//           <p>{selectedToAirport.name.slice(0, 20)}...</p>
//           <p>{arrival.newDate}</p>
//         </div>
//         </div>
//       )
//   }

//   export default FlightInfo;