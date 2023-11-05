
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


  
  if(isLoading){
    return <div className='FlightSearchLoading'>
     <LoaderSpiner/>
    </div>
  }
  

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


