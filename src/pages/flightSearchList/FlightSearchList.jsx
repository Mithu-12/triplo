
import React, {  useState } from 'react';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import './FlightSearchList.css';
import Button from '../../components/button/Button';
import { useDispatch } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useGetFlightsQuery } from '../../api/airportApi';
import { setFlights, setSearchUid, setSessionEndTime } from '../../slices/airportSlice';
import CountdownClock from './CountdownTimer';
import SessionModal from './SessionModal';
import SingleFlightDetails from './SingleFlightDetails';
import LoaderSpiner from '../../components/Loader/LoaderSpiner';



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
  const loadingImg = '/flight-loading.gif'
  const skItem = () => {
    return (
      <ContentWrapper className='pt-16'>
        <div className='flex '>
        {/* <div className='basis-3/12 mr-5 flightSkeletonItem'>
        <div className="countdown-container flightSkeleton "></div>
        </div> */}
        <div className=" flightSkeletonItem w-full">
        <div className="countdown-container flightSkeleton "></div>
        
      </div>
        </div>
      </ContentWrapper>
    );
  };
 
  // if (isLoading) {
  //   return (
      
  //       <div className="flightLoadingSkeleton w-full">
  //         {skItem()}
  //         {skItem()}
  //         {skItem()}
  //         {skItem()}
  //         {skItem()}
  //       </div>
      
  //   );
  // }
  
  if(isLoading){
    return <div className='FlightSearchLoading'>
     <LoaderSpiner/>
    </div>
  }
  

  console.log('new flight data', flights);
  dispatch(setFlights(flights));
  dispatch(setSearchUid(searchUid))
  dispatch(setSessionEndTime(sessionEndTime))

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
              <p>{`We're sorry. We were not able to find a match.`}</p>
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
            <div className="basis-3/12 pt-8">
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
                      <SingleFlightDetails key={index} flight={flight} index={index} searchUid={searchUid} sessionEndTime={sessionEndTime}/>
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





// import React, {  useEffect, useState } from 'react';
// import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
// import './FlightSearchList.css';
// import Button from '../../components/button/Button';
// import { useDispatch } from 'react-redux';
// import {  useLocation, useNavigate } from 'react-router-dom';
// import { useGetFlightsQuery } from '../../api/airportApi';
// import { setFlights, setSearchUid, setSessionEndTime } from '../../slices/airportSlice';
// import CountdownClock from './CountdownTimer';
// import SessionModal from './SessionModal';
// import SingleFlightDetails from './SingleFlightDetails';
// import Slider from 'rc-slider';



// const FlightList = () => {
//   const dispatch = useDispatch();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const originLocationCode = searchParams.get('originLocationCode');
//   const destinationLocationCode = searchParams.get('destinationLocationCode');
//   const departureDate = searchParams.get('departureDate');
//   const adults = searchParams.get('adults');
//   const travelClass = searchParams.get('travelClass');
//   const max = searchParams.get('max');
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [filteredFlights, setFilteredFlights] = useState([]);
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

//   const flightsData = data.flights;
//   const sessionStartTime = data?.sessionStartTime;
//   const sessionEndTime = data?.sessionEndTime;
//   const searchUid = data?.searchUid;
//   const flights = flightsData?.data


//   console.log('flights data1', flightsData)
//   console.log('flights data2', flights)

//   useEffect(() => {
//     if (flights && flights.length > 0) {
//       // Calculate min and max prices and update state
//       const prices = flights?.map((flight) => flight.price.total);
//       // const totalPrice = Math.floor(prices * 80)
//       const min = Math.min(...prices);
//       const max = Math.max(...prices);
//       setMinPrice(min);
//       setMaxPrice(max);
// console.log(prices)
//       // Perform initial filtering when the component mounts
//       filterFlight(flights, min, max);
//     }
//   }, [flights]);

//   const filterFlight = (data, min, max) => {
//     const filtered = data.filter((item) => item.price >= min && item.price <= max);
//     setFilteredFlights(filtered);
//   };
// console.log('filterdddd', filteredFlights)
//   const handlePriceChange = (values) => {
//     setMinPrice(values[0]);
//     setMaxPrice(values[1]);
//   };

//   const handlePriceAfterChange = (values) => {
//     // Trigger filtering based on the updated price range
//     filterFlight(flights, values[0], values[1]);
//   };


















//   const skItem = () => {
//     return (
//       <ContentWrapper className='pt-16'>
//         <div className='flex '>
//         {/* <div className='basis-3/12 mr-5 flightSkeletonItem'>
//         <div className="countdown-container flightSkeleton "></div>
//         </div> */}
//         <div className=" flightSkeletonItem w-full">
//         <div className="countdown-container flightSkeleton "></div>
        
//       </div>
//         </div>
//       </ContentWrapper>
//     );
//   };
 
//   if (isLoading) {
//     return (
      
//         <div className="flightLoadingSkeleton w-full">
//           {skItem()}
//           {skItem()}
//           {skItem()}
//           {skItem()}
//           {skItem()}
//         </div>
      
//     );
//   }
  
  

//   console.log('new flight data', flightsData);
//   dispatch(setFlights(flightsData));
//   dispatch(setSearchUid(searchUid))
//   dispatch(setSessionEndTime(sessionEndTime))

//   const isFlightListEmpty = !flightsData || flightsData.data.length === 0;

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   function onTimeUp() {
//     setIsModalVisible(true);
//   }


  
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
//               <p>{`We're sorry. We were not able to find a match.`}</p>
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
//           {isModalVisible && <SessionModal  show={isModalVisible}/>}
//           <div className="flex pt-16">
//             <div className="basis-3/12 pt-8">
//               <div className="shadow-sm border">
//                 <CountdownClock
//                   sessionStartTime={sessionStartTime}
//                   sessionEndTime={sessionEndTime}
//                   onTimeUp={onTimeUp}
//                 />
//               </div>
//               <Slider
//               range
//               min={Math.min(...flights.map((pack) => pack.price))}
//               max={Math.max(...flights.map((pack) => pack.price))}
//               defaultValue={[minPrice, maxPrice]}
//               value={[minPrice, maxPrice]}
//               onChange={handlePriceChange}
//               onAfterChange={handlePriceAfterChange}
//               allowCross={false}
//             />
//             </div>
//             <div className="basis-9/12">
//               {flightsData && (
//                 <div>
//                   {flights?.map((flight, index) => {
//                     return (
//                       <SingleFlightDetails key={index} flight={flight} index={index} searchUid={searchUid} sessionEndTime={sessionEndTime}/>
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
