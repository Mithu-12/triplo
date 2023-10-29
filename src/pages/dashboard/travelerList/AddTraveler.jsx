import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { faUser, faChevronRight, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setTraveler } from '../../../slices/travelerSlice';
import LoaderSpiner from '../../../components/Loader/LoaderSpiner';

const AddTraveler = () => {
  const dispatch = useDispatch();
  const getAllTravelers = useSelector((state) => state.traveler.traveler);
  const [getTravelers, setGetTravelers] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  console.log('userId', userId);

  const navigate = useNavigate();
  const generateRandomId = () => {
    const timestamp = Date.now().toString(36); 
    const randomString = Math.random().toString(36).substring(2, 10); 
    return timestamp + randomString; 
  };

  const handleNewTraveler = () => {
    const travelerNewId = generateRandomId();
    navigate(`/app/account/regular-travelers/${travelerNewId}`);
  };
 

  useEffect(() => {
    axios
      .get(`https://triplo-flight.onrender.com/api/traveler/${userId}`)
      .then((response) => {
        const allTravelers = response.data.travelers;
        console.log(allTravelers)
        setGetTravelers(allTravelers)
        dispatch(setTraveler(allTravelers));
      })
      .catch((error) => {
        console.error('Error:', error);
      }).finally(() => {
        setLoading(false); 
      });
  }, []);
  console.log('allTravelers=', getAllTravelers);

  return (
    <div className=" pb-5 w-full ml-10">
      <Link to="#" onClick={handleNewTraveler} className='flex justify-center p-3 text-white font-bold rounded-md mb-10 items-center gap-3' style={{backgroundColor: '#00276C'}}>
      <FontAwesomeIcon icon={faUserPlus} />
        Add Travelers
      </Link>

      {loading ? (
        <LoaderSpiner />
      ) : (
        // Render the traveler data when loading is false
        getTravelers?.map((traveler) => {
          const travelerId = traveler.travelerId;
          return (
            <div
              key={traveler.travelerId}
              className="bg-white p-4 my-5 rounded-md font-bold"
            >
              <Link
                to={`/app/account/regular-travelers/${travelerId}`}
                state={{ data: traveler }}
              >
                <div className='flex justify-between'>
                  <div className="flex gap-4 items-center">
                    <FontAwesomeIcon icon={faUser} />
                    <p>
                      {traveler.title} {traveler.firstName} {traveler.lastName}
                    </p>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AddTraveler;
