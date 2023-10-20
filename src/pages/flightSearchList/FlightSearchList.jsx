import React, {  useState } from 'react';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import './FlightSearchList.css';
import Button from '../../components/button/Button';
import { useDispatch } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useGetFlightsQuery } from '../../api/airportApi';
import { setFlights } from '../../slices/airportSlice';
import CountdownClock from './CountdownTimer';
import SessionModal from './SessionModal';
import SingleFlightDetails from './SingleFlightDetails';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';


const FlightList = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const originLocationCode = searchParams.get('originLocationCode');
  const destinationLocationCode = searchParams.get('destinationLocationCode');
  const departureDate = searchParams.get('departureDate');
  const adults = searchParams.get('adults');
  const travelClass = searchParams.get('travelClass');
  const max = searchParams.get('max');

  const optionalParams = {};

  if (searchParams.has('returnDate')) {
    optionalParams.returnDate = searchParams.get('returnDate');
  }

  if (searchParams.has('children')) {
    optionalParams.children = searchParams.get('children');
  }

  if (searchParams.has('infants')) {
    optionalParams.infants = searchParams.get('infants');
  }

  const { data, isLoading, isError } = useGetFlightsQuery({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults,
    travelClass,
    max,
    ...optionalParams,
  });

  const flights = data?.flights;
  const sessionStartTime = data?.sessionStartTime;
  const sessionEndTime = data?.sessionEndTime;
  const searchUid = data?.searchUid;
  const loading = '../../../public/flight-loading.svg';
  
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock skeleton">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
 
  if (isLoading) {
    return (
      <div className="flightLoading-container w-full">
       <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
      </div>
    );
  }
  
  
  // if (isLoading) {
  //   return (
  //     <div className="flightLoading-container bg-red-500">
  //       <img className="bg-red-500" src={loading}></img>
  //       {/* <img className='' src={loadingGif}></img> */}
  //     </div>
  //   );
  // }

  console.log('new flight data', flights);
  dispatch(setFlights(flights));

  const isFlightListEmpty = !flights || flights.data.length === 0;

  const handleGoBack = () => {
    navigate(-1);
  };

  function onTimeUp() {
    setIsModalVisible(true);
  }

  return (
    <div
      className={`flightList-container ${
        isFlightListEmpty
          ? 'flightList-white-background'
          : 'flightList-grey-background'
      }`}
    >
      {isFlightListEmpty ? (
        // Render your white background content (e.g., image) here
        <div className="white-background-content">
          <div className="flightNoFound-container">
            <div className="flightNotFound-image">
              <h3 className="text-xl font-semibold">Not Result Found</h3>
              <p>We're sorry. We were not able to find a match.</p>
              <Button
                onClick={handleGoBack}
                className="px-6 py-3 text-sm rounded-sm text-white"
                title="Try Another Search?"
              />
            </div>
          </div>
        </div>
      ) : (
        // Render your flight list content here
        <ContentWrapper>
          {isModalVisible && <SessionModal  show={isModalVisible}/>}
          <div className="flex pt-16">
            <div className="basis-3/12">
              <div className="shadow-sm border">
                <CountdownClock
                  sessionStartTime={sessionStartTime}
                  sessionEndTime={sessionEndTime}
                  onTimeUp={onTimeUp}
                />
              </div>
            </div>
            <div className="basis-9/12">
              {flights && (
                <div>
                  {flights.data?.map((flight, index) => {
                    return (
                      <SingleFlightDetails flight={flight} index={index} searchUid={searchUid} sessionEndTime={sessionEndTime}/>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </ContentWrapper>
      )}
    </div>
  );
};

export default FlightList;





// import React, { useEffect, useState } from 'react';

// import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
// import './FlightSearchList.css';
// import Button from '../../components/button/Button';
// import arrow from '../../../public/arrow.png';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import FlightAccordion from './accordianFlight/AccordianFlight';
// import FlightInfo from './flightCard';
// import { useGetFlightsQuery } from '../../api/airportApi';
// import { setFlights } from '../../slices/airportSlice';
// import CountdownTimer from './CountdownTimer';
// import CountdownClock from './CountdownTimer';
// import SessionModal from './SessionModal';
// import useFlightPrice from '../../hooks/useFlightPrice';

// const FlightList = () => {
//   const dispatch = useDispatch();
//   const [isOpenArray, setIsOpenArray] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const navigate = useNavigate();
//   const selectedFromAirport = useSelector((state) => state.toFrom.fromAirport);
//   const selectedToAirport = useSelector((state) => state.toFrom.toAirport);

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const originLocationCode = searchParams.get('originLocationCode');
//   const destinationLocationCode = searchParams.get('destinationLocationCode');
//   const departureDate = searchParams.get('departureDate');
//   const adults = searchParams.get('adults');
//   const travelClass = searchParams.get('travelClass');
//   const max = searchParams.get('max');

//   const optionalParams = {};

//   if (searchParams.has('returnDate')) {
//     optionalParams.returnDate = searchParams.get('returnDate');
//   }

//   if (searchParams.has('children')) {
//     optionalParams.children = searchParams.get('children');
//   }

//   if (searchParams.has('infants')) {
//     optionalParams.infants = searchParams.get('infants');
//   }

//   const { data, isLoading, isError } = useGetFlightsQuery({
//     originLocationCode,
//     destinationLocationCode,
//     departureDate,
//     adults,
//     travelClass,
//     max,
//     ...optionalParams,
//   });

//   const flights = data?.flights;
//   const sessionStartTime = data?.sessionStartTime;
//   const sessionEndTime = data?.sessionEndTime;
//   const searchUid = data?.searchUid;
//   const loading = '../../../public/flight-loading.svg';

//   if (isLoading) {
//     return (
//       <div className="flightLoading-container bg-red-500">
//         <img className="bg-red-500" src={loading}></img>
//         {/* <img className='' src={loadingGif}></img> */}
//       </div>
//     );
//   }

//   console.log('new flight data', flights);
//   console.log('new StartTime data', sessionStartTime);
//   console.log('new endTime data', sessionEndTime);
//   console.log('new searchUid data', searchUid);
//   dispatch(setFlights(flights));

//   const isFlightListEmpty = !flights || flights.length === 0;

//   const toggleAccordion = (index) => {
//     setIsOpenArray((prevIsOpenArray) => {
//       const updatedIsOpenArray = [...prevIsOpenArray];
//       updatedIsOpenArray[index] = !updatedIsOpenArray[index];
//       return updatedIsOpenArray;
//     });
//   };

//   const airlineImages = {
//     BG: '../../../public/BG.png',
//     VQ: '../../../public/VQ.png',
//     BS: '../../../public/BS.png',
//   };

//   const formatDateTime = (dateTime) => {
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


 
//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   function onTimeUp() {
//     setIsModalVisible(true);
//   }

//   const handleFlightClick = () => {};
 
//   return (
//     <div
//       className={`flightList-container ${
//         isFlightListEmpty
//           ? 'flightList-white-background'
//           : 'flightList-grey-background'
//       }`}
//     >
//       {isFlightListEmpty ? (
//         // Render your white background content (e.g., image) here
//         <div className="white-background-content">
//           <div className="flightNoFound-container">
//             <div className="flightNotFound-image">
//               <h3 className="text-xl font-semibold">Not Result Found</h3>
//               <p>We're sorry. We were not able to find a match.</p>
//               <Button
//                 onClick={handleGoBack}
//                 className="px-6 py-3 text-sm rounded-sm text-white"
//                 title="Try Another Search?"
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         // Render your flight list content here
//         <ContentWrapper>
//           {/* {isModalVisible && <SessionModal  show={isModalVisible}/>} */}
//           <div className="flex pt-16">
//             <div className="basis-3/12">
//               <div className="shadow-sm border">
//                 <CountdownClock
//                   sessionStartTime={sessionStartTime}
//                   sessionEndTime={sessionEndTime}
//                   onTimeUp={onTimeUp}
//                 />
//               </div>
//             </div>
//             <div className="basis-9/12">
//               {flights && (
//                 <div>
//                   {flights.data?.map((flight, index) => {
                    
//                     const weight =
//                       flight.travelerPricings[0].fareDetailsBySegment[0]
//                         .includedCheckedBags.weight;
//                     const flightPrices = useFlightPrice(flight);
//                     const {
//                       totalBaseFare,
//                       totalDiscount,
//                       totalFare,
//                       adultsNum,
//                       childNum,
//                       infantsNum,
//                       adultPrice,
//                       childPrice,
//                       infantsPrice,
//                       adultSubTotal,
//                       childSubTotal,
//                       infantsSubTotal,
//                       adultTax,
//                       childTax,
//                       infantsTax,
//                     } = flightPrices;

//                     return (
//                       <div key={flight.id} className="my-8 ml-6">
//                         <div className="flex border">
//                           <div
//                             key={flight.id}
//                             className="basis-10/12 bg-white shadow-lg  px-6 py-12  cursor-pointer"
//                             onClick={() => toggleAccordion(index)}
//                           >
//                             <FlightInfo
//                               flight={flight}
//                               itineraryIndex={0}
//                               selectedFromAirport={selectedFromAirport}
//                               selectedToAirport={selectedToAirport}
//                               airlineImages={airlineImages}
//                               carriers={flights?.dictionaries?.carriers}
//                             />
//                             <div className="pt-8">
//                               {flight?.itineraries?.length > 1 && (
//                                 <FlightInfo
//                                   flight={flight}
//                                   itineraryIndex={1}
//                                   selectedFromAirport={selectedToAirport}
//                                   selectedToAirport={selectedFromAirport}
//                                   airlineImages={airlineImages}
//                                   carriers={flights?.dictionaries?.carriers}
//                                 />
//                               )}
//                             </div>
//                           </div>
//                           <div className="basis-2/12 flightPersonalContainer shadow-md ">
//                             <div className="flightPersonalInfo">
//                               <p className="py-3">{weight ?? 'NOT INCLUDE'} kg</p>
//                               <div className="flex items-center text-center justify-center ">
//                                 <p>
//                                   {adultsNum}
//                                   AD,{' '}
//                                 </p>
//                                 <p>
//                                   {childNum}
//                                   CH,{' '}
//                                 </p>
//                                 <p>
//                                   {infantsNum}
//                                   IN
//                                 </p>
//                               </div>

//                               <p className=" font-thin py-1 line-through">
//                                 ৳ {totalBaseFare}
//                               </p>

//                               <p className="text-lg font-bold py-1">
//                                 ৳ {totalFare}
//                               </p>
//                               <Link
//                                 to={`/flight/booking?searchId=${searchUid}&index=${flight.id}`}
//                                 state={{
//                                   sessionStartTime,
//                                   sessionEndTime,
//                                   flightData: flight,
//                                 }}
//                               >
//                                 Book Now
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                         <FlightAccordion
//                           key={flight.id}
//                           flight={flight}
//                           isOpen={isOpenArray[index]}
//                           toggleAccordion={() => toggleAccordion(index)}
//                         />
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         </ContentWrapper>
//       )}
//     </div>
//   );
// };

// export default FlightList;

// import React, { useEffect, useState } from 'react';

// import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
// import './FlightSearchList.css';
// import Button from '../../components/button/Button';
// import arrow from '../../../public/arrow.png'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import FlightAccordion from './AccordianFlight';
// import FlightInfo from './flightCard';
// import { useGetFlightsQuery } from '../../api/airportApi';
// import { setFlights } from '../../slices/airportSlice';

// const FlightList = () => {
//   const dispatch = useDispatch()
//   const [isOpenArray, setIsOpenArray] = useState([]);
//   const navigate = useNavigate();
//   const selectedFromAirport = useSelector((state) => state.toFrom.fromAirport);
//   const selectedToAirport = useSelector((state) => state.toFrom.toAirport);

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   const originLocationCode = searchParams.get('originLocationCode');
//   const destinationLocationCode = searchParams.get('destinationLocationCode');
//   const departureDate = searchParams.get('departureDate');
//   const adults = searchParams.get('adults');
//   const travelClass = searchParams.get('travelClass');
//   const max = searchParams.get('max');

//   const optionalParams = {};

//   if (searchParams.has('returnDate')) {
//     optionalParams.returnDate = searchParams.get('returnDate');
//   }

//   if (searchParams.has('children')) {
//     optionalParams.children = searchParams.get('children');
//   }

//   if (searchParams.has('infants')) {
//     optionalParams.infants = searchParams.get('infants');
//   }

//   const {
//     data: flights,
//     isLoading,
//     isError,
//   } = useGetFlightsQuery({
//     originLocationCode,
//     destinationLocationCode,
//     departureDate,
//     adults,
//     travelClass,
//     max,
//     ...optionalParams,
//   });

//   const loading = '../../../public/flight-loading.svg';

//   if (isLoading) {
//     return (
//       <div className="flightLoading-container bg-red-500">
//         <img className="bg-red-500" src={loading}></img>
//         {/* <img className='' src={loadingGif}></img> */}
//       </div>
//     );
//   }

//   console.log('new flight data', flights);
// dispatch(setFlights(flights))
//   const isFlightListEmpty = !flights || flights.length === 0;
//   // useEffect(() => {
//   //   // Update isOpenArray when flights data changes
//   //   if (flights) {
//   //     setIsOpenArray(new Array(flights.length).fill(false));
//   //   }
//   // }, [flights]);

//   const toggleAccordion = (index) => {
//     setIsOpenArray((prevIsOpenArray) => {
//       const updatedIsOpenArray = [...prevIsOpenArray];
//       updatedIsOpenArray[index] = !updatedIsOpenArray[index];
//       return updatedIsOpenArray;
//     });
//   };

//   const airlineImages = {
//     BG: '../../../public/BG.png',
//     VQ: '../../../public/VQ.png',
//     BS: '../../../public/BS.png',
//   };

//   // const getCarrierName = (carrierCode) => {
//   //   return flights?.dictionaries?.carriers[carrierCode] || '';
//   // };
//   // const carriers = flights?.dictionaries?.carriers;
//   const formatDateTime = (dateTime) => {
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

//   const getTotalPassengers = (travelerPricings) => {
//     let adultCount = 0;
//     let childCount = 0;
//     let infantCount = 0;

//     travelerPricings?.forEach((passenger) => {
//       if (passenger.travelerType === 'ADULT') {
//         adultCount += 1;
//       } else if (passenger.travelerType === 'CHILD') {
//         childCount += 1;
//       } else if (passenger.travelerType === 'HELD_INFANT') {
//         infantCount += 1;
//       }
//     });

//     return {
//       adults: adultCount,
//       children: childCount,
//       infants: infantCount,
//     };
//   };

//   const getTotalPrice = (travelerPricings) => {
//     let totalPrice = 0;

//     travelerPricings?.forEach((passenger) => {
//       totalPrice += parseFloat(passenger.price.total);
//     });
//     const discount = 0.05;
//     const discountPrice = totalPrice - totalPrice * discount;
//     return {
//       originalPrice: totalPrice.toFixed(0),
//       discountPrice: discountPrice.toFixed(0),
//     };
//   };
//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   const handleFlightClick = ()=>{

//   }

//   return (
//     <div
//       className={`flightList-container ${
//         isFlightListEmpty
//           ? 'flightList-white-background'
//           : 'flightList-grey-background'
//       }`}
//     >

//         {isFlightListEmpty ? (
//           // Render your white background content (e.g., image) here
//           <div className="white-background-content">
//             <div className="flightNoFound-container">
//               <div className="flightNotFound-image">
//                 <h3 className="text-xl font-semibold">Not Result Found</h3>
//                 <p>We're sorry. We were not able to find a match.</p>
//                 <Button
//                   onClick={handleGoBack}
//                   className="px-6 py-3 text-sm rounded-sm text-white"
//                   title="Try Another Search?"
//                 />
//               </div>
//             </div>
//           </div>
//         ) : (
//           // Render your flight list content here
//           <ContentWrapper>
//           <div className="flex pt-16">
//             <div className="basis-3/12">hello</div>
//             <div className="basis-9/12">
//               {flights &&
//                 <div>
//                   {flights.data?.map((flight, index) => {
//                     const price = getTotalPrice(flight.travelerPricings);
//                     const weight =
//                       flight.travelerPricings[0].fareDetailsBySegment[0]
//                         .includedCheckedBags.weight;

//                     return (
//                       <div key={flight.id} className="my-8">
//                         <div className="flex">
//                           <div
//                             key={flight.id}
//                             className="basis-10/12 bg-white shadow-lg  px-6 py-12 ml-6 cursor-pointer"
//                             onClick={() => toggleAccordion(index)}
//                           >
//                             <FlightInfo
//                               flight={flight}
//                               itineraryIndex={0}
//                               selectedFromAirport={selectedFromAirport}
//                               selectedToAirport={selectedToAirport}
//                               airlineImages={airlineImages}
//                               carriers={flights?.dictionaries?.carriers}
//                             />
//                             <div className="pt-8">
//                               {flight?.itineraries?.length > 1 && (
//                                 <FlightInfo
//                                   flight={flight}
//                                   itineraryIndex={1}
//                                   selectedFromAirport={selectedToAirport}
//                                   selectedToAirport={selectedFromAirport}
//                                   airlineImages={airlineImages}
//                                   carriers={flights?.dictionaries?.carriers}
//                                 />
//                               )}
//                             </div>
//                           </div>
//                           <div className="basis-2/12 flightPersonalContainer shadow-md ">
//                             <div className="flightPersonalInfo">
//                               <p className="py-3">{weight} kg</p>
//                               <div className="flex items-center text-center justify-center ">
//                                 <p>
//                                   {
//                                     getTotalPassengers(flight.travelerPricings)
//                                       .adults
//                                   }
//                                   AD,{' '}
//                                 </p>
//                                 <p>
//                                   {
//                                     getTotalPassengers(flight.travelerPricings)
//                                       .children
//                                   }
//                                   CH,{' '}
//                                 </p>
//                                 <p>
//                                   {
//                                     getTotalPassengers(flight.travelerPricings)
//                                       .infants
//                                   }
//                                   IN
//                                 </p>
//                               </div>

//                               <p className=" font-thin py-1 line-through">
//                                 {price.originalPrice}
//                               </p>
//                               <p className="text-lg font-bold py-1">
//                                 {price.discountPrice}
//                               </p>
//                               <Link to='#' onClick={handleFlightClick}>Book Now</Link>

//                             </div>
//                           </div>
//                         </div>
//                         <FlightAccordion
//                           key={flight.id}
//                           flight={flight}
//                           isOpen={isOpenArray[index]}
//                           toggleAccordion={() => toggleAccordion(index)}
//                         />
//                       </div>
//                     );
//                   })}
//                 </div>

//               }
//             </div>
//           </div>
//       </ContentWrapper>
//         )}
//     </div>
//   );
// };

// export default FlightList;
